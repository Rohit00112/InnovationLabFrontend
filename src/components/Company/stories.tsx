"use client";

import React, { useState, useEffect, useRef } from "react";

export interface StoryItem {
  image: string;
  storyTeller: string;
  description: string;
}

interface StoriesProps {
  storiesData: StoryItem[];
}

export default function Stories({ storiesData }: StoriesProps) {
  const numOfStories = storiesData.length;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentStory, setCurrentStory] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(70);

  useEffect(() => {
    const handleResize = () => {
      // Use higher vh distance on mobile so it requires more scrolling (less sensitive)
      setScrollDistance(window.innerWidth < 768 ? 90 : 70);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const stepPx = (scrollDistance / 100) * vh;

      // How far the wrapper's top has scrolled past the viewport top
      const scrolledInto = -rect.top;

      if (scrolledInto <= 0) {
        setCurrentStory(0);
        return;
      }

      const maxScroll = (numOfStories - 1) * stepPx;

      if (scrolledInto >= maxScroll) {
        setCurrentStory(numOfStories - 1);
        return;
      }

      setCurrentStory(Math.floor(scrolledInto / stepPx));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial state on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [numOfStories, scrollDistance]);

  return (
    <div
      ref={wrapperRef}
      className="relative z-0"
      style={{ height: `${100 + numOfStories * scrollDistance}vh` }}
    >
      {/* Sticky container — pins while the wrapper scrolls behind it */}
      <div className="sticky top-0 h-screen overflow-hidden bg-white border-x border-b border-gray-300">
        {storiesData.map((story, i) => {
          const isActive = currentStory === i;
          const isPast = i < currentStory;
          const isImageOnLeft = i % 2 === 0;

          // Left half enters from below, exits upward
          const leftTrans = isActive
            ? "translateY(0)"
            : isPast
              ? "translateY(-100%)"
              : "translateY(100%)";

          // Right half enters from above, exits downward
          const rightTrans = isActive
            ? "translateY(0)"
            : isPast
              ? "translateY(100%)"
              : "translateY(-100%)";

          return (
            <div key={i} className="absolute inset-0">
              {/* Left Half */}
              <div
                className="absolute top-0 left-0 w-1/2 h-full transition-transform duration-[1000ms] bg-white flex flex-col justify-center"
                style={{ transform: leftTrans }}
              >
                {isImageOnLeft ? (
                  <div
                    className="w-full max-md:w-[95%] max-md:mx-auto max-md:rounded-xl h-[60vh] md:h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${story.image})` }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-black px-2 py-4 md:p-8">
                    <h2 className="mb-2 md:mb-4 text-center text-xl md:text-[34px] font-bold uppercase leading-tight break-words max-w-full">
                        {story.storyTeller}
                    </h2>
                    <p className="text-center text-[13px] md:text-[18px] leading-snug text-[#515151]">
                        {story.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Half */}
              <div
                className="absolute top-0 left-1/2 w-1/2 h-full transition-transform duration-1000 bg-white flex flex-col justify-center"
                style={{ transform: rightTrans }}
              >
                {!isImageOnLeft ? (
                  <div
                    className="w-full max-md:w-[95%] max-md:mx-auto max-md:rounded-xl h-[60vh] md:h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${story.image})` }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-black px-2 py-4 md:p-8">
                    <h2 className="mb-2 md:mb-4 text-center text-xl md:text-[34px] font-bold uppercase leading-tight break-words max-w-full">
                        {story.storyTeller}
                    </h2>
                      <p className="text-center text-[13px] md:text-[18px] leading-snug text-[#515151]">
                        {story.description}
                      </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
