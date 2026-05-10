"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

const topRowImages: GalleryImage[] = [
  {
    src: "/hero/1.JPG",
    alt: "Dynamic architectural structure in Malmö",
  },
  {
    src: "/hero/2.JPG",
    alt: "Modern architectural ceiling with geometric design",
  },
  {
    src: "/hero/3.JPG",
    alt: "Black and white glass architecture",
  },
  {
    src: "/hero/4.JPG",
    alt: "Neoclassical columns at sunset",
  },
  {
    src: "/hero/5.JPG",
    alt: "Ornate neo-classical architectural corner",
  },
  {
    src: "/hero/6.JPG",
    alt: "Modern futuristic building in Valencia",
  },
];

const bottomRowImages: GalleryImage[] = [
  {
    src: "/hero/7.JPG",
    alt: "Bright modern interior with large windows",
  },
  {
    src: "/hero/8.jpeg",
    alt: "Modern interior with minimalist design",
  },
  {
    src: "/hero/9.JPG",
    alt: "House interior with a green door",
  },
  {
    src: "/hero/10.JPG",
    alt: "Rustic interior with wooden walls and lights",
  },
  {
    src: "/hero/11.JPG",
    alt: "Modern stylish interior with unique design",
  },
  {
    src: "/hero/12.JPG",
    alt: "Modern luxury interior with marble accents",
  },
];

function ImageRow({ images }: { images: GalleryImage[] }) {
  return (
    <div className="flex w-max overflow-visible">
      {images.map((image) => (
        <div
          key={image.src}
          className="relative h-[55vw] w-[46vw] shrink-0 overflow-hidden bg-neutral-100 sm:h-[42vw] sm:w-[36vw] md:h-[32vw] md:w-[28vw] md:min-h-64 md:max-h-120 md:min-w-[18rem] md:max-w-[24rem]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 70vw, 24rem"
            className="object-cover border aspect-square border-gray-300"
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

  const topX = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const bottomX = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div
      ref={sectionRef}
      className="relative left-1/2 w-[120vw] -translate-x-1/2 overflow-hidden max-w-none"
    >
      <div className="flex flex-col">
        <motion.div style={{ x: topX }}>
          <ImageRow images={topRowImages} />
        </motion.div>
        <motion.div style={{ x: bottomX }}>
          <ImageRow images={bottomRowImages} />
        </motion.div>
      </div>
    </div>
  );
}
