"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { useRef } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

const topRowImages: GalleryImage[] = [
  {
    src: "/hero/1.jpg",
    alt: "Dynamic architectural structure in Malmö",
  },
  {
    src: "/hero/2.jpg",
    alt: "Modern architectural ceiling with geometric design",
  },
  {
    src: "/hero/3.jpg",
    alt: "Black and white glass architecture",
  },
  {
    src: "/hero/4.jpg",
    alt: "Neoclassical columns at sunset",
  },
  {
    src: "/hero/5.jpg",
    alt: "Ornate neo-classical architectural corner",
  },
  {
    src: "/hero/6.jpg",
    alt: "Modern futuristic building in Valencia",
  },
];

const bottomRowImages: GalleryImage[] = [
  {
    src: "/hero/7.jpg",
    alt: "Bright modern interior with large windows",
  },
  {
    src: "/hero/8.jpeg",
    alt: "Modern interior with minimalist design",
  },
  {
    src: "/hero/9.jpg",
    alt: "House interior with a green door",
  },
  {
    src: "/hero/10.jpg",
    alt: "Rustic interior with wooden walls and lights",
  },
  {
    src: "/hero/11.jpg",
    alt: "Modern stylish interior with unique design",
  },
  {
    src: "/hero/12.jpg",
    alt: "Modern luxury interior with marble accents",
  },
];

function ImageRow({ images, eager = false }: { images: GalleryImage[]; eager?: boolean }) {
  return (
    <div className="flex w-max overflow-visible">
      {images.map((image, index) => (
        <div
          key={image.src}
          className="relative h-[32vw] w-[42vw] shrink-0 overflow-hidden border border-gray-300 bg-neutral-100 sm:h-[26vw] sm:w-[32vw] md:h-[20vw] md:w-[24vw] md:min-h-56 md:max-h-96 md:min-w-[18rem] md:max-w-[24rem]"
        >
          <img
            src={image.src}
            alt={image.alt}
            decoding="async"
            loading={eager && index < 2 ? "eager" : "lazy"}
            className="pointer-events-none h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default function Carousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const topX = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const bottomX = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <div
      ref={sectionRef}
      className="relative left-1/2 w-[120vw] -translate-x-1/2 overflow-hidden max-w-none"
    >
      <div className="flex flex-col">
        <motion.div
          style={{ x: topX, willChange: "transform", translateZ: 0 }}
        >
          <ImageRow images={topRowImages} eager />
        </motion.div>
        <motion.div
          style={{ x: bottomX, willChange: "transform", translateZ: 0 }}
        >
          <ImageRow images={bottomRowImages} />
        </motion.div>
      </div>
    </div>
  );
}
