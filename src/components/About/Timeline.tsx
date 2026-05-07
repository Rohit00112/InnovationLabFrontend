"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  images: string[];
};

type TimelineProps = {
  items: TimelineItem[];
};

type TimelineEntry = {
  title: string;
  content: React.ReactNode;
};

export default function Timeline({ items }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [stickyTop, setStickyTop] = useState(88);

  useEffect(() => {
    const navElement = document.querySelector("nav");
    if (!navElement) {
      return;
    }

    const updateStickyTop = () => {
      const navHeight = navElement.getBoundingClientRect().height;
      setStickyTop(Math.ceil(navHeight));
    };

    updateStickyTop();

    const resizeObserver = new ResizeObserver(() => {
      updateStickyTop();
    });
    resizeObserver.observe(navElement);

    window.addEventListener("resize", updateStickyTop);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateStickyTop);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current;
    const updateHeight = () => {
      const rect = element.getBoundingClientRect();
      setHeight(rect.height);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(element);

    const images = Array.from(element.querySelectorAll("img"));
    const onImageLoad = () => {
      updateHeight();
    };

    for (const image of images) {
      if (!image.complete) {
        image.addEventListener("load", onImageLoad);
      }
    }

    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);

      for (const image of images) {
        image.removeEventListener("load", onImageLoad);
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const data: TimelineEntry[] = items.map((item) => {
    const imageCount = item.images.length;

    return {
      title: item.year,
      content: (
        <div>
          <h4 className="mb-3 text-base font-semibold text-neutral-900 md:text-lg">
            {item.title}
          </h4>
          <p className="mb-6 text-sm font-normal text-neutral-800 md:text-base">
            {item.description}
          </p>

          {imageCount > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {item.images.map((imageUrl, index) => (
                <Image
                  key={`${item.year}-${item.title}-${index}`}
                  src={imageUrl}
                  alt={`${item.title} image ${index + 1}`}
                  width={500}
                  height={500}
                  unoptimized
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="h-20 w-full object-cover md:h-44 lg:h-60"
                />
              ))}
            </div>
          )}
        </div>
      ),
    };
  });

  return (
    <div
      ref={containerRef}
      className="relative mt-[10vh] w-full overflow-clip bg-white font-sans md:px-10"
    >
      {/* <div className="mx-auto max-w-7xl px-4 pt-6 pb-2 md:px-8 lg:px-10">
				<h2 className="max-w-4xl text-lg text-black md:text-4xl">Changelog from my journey</h2>
			</div> */}
      <h1
        style={{ top: `${stickyTop}px` }}
        className="sticky z-49 ml-4 pt-12 mb-6 w-fit bg-white/95 pr-4 text-2xl font-bold leading-none tracking-wide uppercase backdrop-blur-[1px] md:text-5xl"
      >
        <span className="text-primary">TIME</span>LINE
      </h1>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:gap-10 md:pt-40"
          >
            <div className="sticky top-40 z-40 flex max-w-xs self-start items-center md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 h-10 w-10 rounded-full bg-white md:left-3">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 p-2" />
                </div>
              </div>
              <h3 className="hidden text-xl font-bold text-neutral-500 md:block md:pl-20 md:text-5xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-neutral-500 md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{
            height: `${height}px`,
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
          className="absolute top-0 left-8 w-0.5 overflow-hidden bg-gradient-to-b from-transparent via-neutral-200 to-transparent md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-0.5 rounded-full bg-gradient-to-t from-black via-cyan-400/20 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
