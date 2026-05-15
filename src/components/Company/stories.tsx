"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface StoryItem {
  image: string;
  storyTeller: string;
  description: string;
  companyName: string;
}

interface StoriesProps {
  storiesData: StoryItem[];
}

export default function Stories({ storiesData }: StoriesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[600vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        {storiesData.map((story, i) => (
          <StorySlide
            key={i}
            story={story}
            index={i}
            total={storiesData.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

function StorySlide({
  story,
  index,
  total,
  progress,
}: {
  story: StoryItem;
  index: number;
  total: number;
  progress: any;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  // Opacity and scale for the whole slide
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0.98, 1, 1, 0.98]);

  // Opposite directions for left/right halves
  const leftY = useTransform(
    progress,
    [start - 0.05, start, end, end + 0.05],
    ["100%", "0%", "0%", "-100%"]
  );
  const rightY = useTransform(
    progress,
    [start - 0.05, start, end, end + 0.05],
    ["-100%", "0%", "0%", "100%"]
  );

  const isImageOnLeft = index % 2 === 0;

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 grid grid-cols-1 md:grid-cols-2"
    >
      {/* Left Column / Top Half */}
      <motion.div
        style={{ y: leftY }}
        className="relative h-1/2 w-full overflow-hidden bg-white md:h-full"
      >
        {isImageOnLeft ? (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${story.image})` }}
          />
        ) : (
          <StoryContent story={story} />
        )}
      </motion.div>

      {/* Right Column / Bottom Half */}
      <motion.div
        style={{ y: rightY }}
        className="relative h-1/2 w-full overflow-hidden bg-white md:h-full"
      >
        {!isImageOnLeft ? (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${story.image})` }}
          />
        ) : (
          <StoryContent story={story} />
        )}
      </motion.div>
    </motion.div>
  );
}

function StoryContent({ story }: { story: StoryItem }) {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-8 p-8 text-center md:p-16">
      <div className="space-y-4">
        <span className="inline-block h-1 w-12 bg-iblue" />
        <div className="space-y-1">
          <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-neutral-900 md:text-4xl">
            {story.storyTeller}
          </h2>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-iblue">
            {story.companyName}
          </p>
        </div>
      </div>
      <p className="max-w-md text-sm font-medium italic leading-[1.6] text-neutral-800 md:text-xl lg:text-2xl">
        &quot;{story.description}&quot;
      </p>
    </div>
  );
}
