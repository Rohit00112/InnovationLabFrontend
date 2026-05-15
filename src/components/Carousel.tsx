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

function ImageRow({ images }: { images: GalleryImage[] }) {
  return (
    <div className="flex w-max overflow-visible">
      {images.map((image) => (
        <div
          key={image.src}
          className="relative h-[55vw] w-[46vw] shrink-0 overflow-hidden bg-neutral-100 sm:h-[42vw] sm:w-[36vw] md:h-[32vw] md:w-[28vw] md:min-h-64 md:max-h-120 md:min-w-[18rem] md:max-w-[24rem]"
        >
          <img
            src={image.src}
            alt={image.alt}
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
