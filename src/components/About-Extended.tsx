"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function OppositeScrollMotion() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const firstLeftY = useSpring(
    useTransform(scrollYProgress, [0, 1], [10, 55]),
    {
      stiffness: 110,
      damping: 26,
    },
  );
  const firstRightY = useSpring(
    useTransform(scrollYProgress, [0, 1], [95, -35]),
    {
      stiffness: 80,
      damping: 22,
    },
  );
  const secondLeftY = useSpring(
    useTransform(scrollYProgress, [0, 1], [70, -80]),
    {
      stiffness: 78,
      damping: 20,
    },
  );
  const secondRightY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 45]),
    {
      stiffness: 112,
      damping: 26,
    },
  );

  return (
    <section ref={sectionRef} className="w-full bg-neutral-100 py-20 md:py-28">
      <div className="mx-auto flex w-full flex-col gap-16 px-5 md:px-8 p-9 md:max-w-360">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex items-start gap-5 md:gap-8">
            <motion.img
              src="https://images.pexels.com/photos/34703257/pexels-photo-34703257.png"
              alt="Orange butterfly in grass"
              style={{ y: firstLeftY }}
              className="h-65 w-45 object-cover shadow-sm md:h-85 md:w-55"
            />
            <motion.img
              alt="Orange butterfly on green leaves"
              src="https://images.pexels.com/photos/31940527/pexels-photo-31940527.jpeg"
              style={{ y: firstRightY }}
              className="mt-14 h-65 w-45 object-cover shadow-sm md:h-85 md:w-55"
            />
          </div>

          <div className="max-w-md pt-2 text-xl leading-9 tracking-wide text-neutral-800 md:pt-6">
            We believe in the{" "}
            <span className="font-semibold text-primary">architectural</span>{" "}
            sovereignty of the grid. Our practice is dedicated to the reduction
            of noise,{" "}
            <span className="font-semibold text-primary">favoring</span>
            structural honesty over{" "}
            <span className="font-semibold text-primary">decorative</span>{" "}
            distraction. Each line is a
            <span className="font-semibold text-primary"> proof</span>, each
            volume a resolution.
          </div>
        </div>

        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-12">
          <div className="order-2 max-w-md text-xl leading-9 tracking-wide text-neutral-800 md:order-1">
            We believe in the{" "}
            <span className="font-semibold text-primary">architectural</span>{" "}
            sovereignty of the grid. Our practice is dedicated to the reduction
            of noise,{" "}
            <span className="font-semibold text-primary">favoring</span>
            structural honesty over{" "}
            <span className="font-semibold text-primary">decorative</span>{" "}
            distraction. Each line is a
            <span className="font-semibold text-primary"> proof</span>, each
            volume a resolution.
          </div>

          <div className="order-1 flex items-start justify-start gap-5 md:order-2 md:justify-end md:gap-8">
            <motion.img
              src="https://images.pexels.com/photos/16774853/pexels-photo-16774853.jpeg"
              alt="Blue butterfly on dark leaves"
              style={{ y: secondLeftY }}
              className="mt-8 h-65 w-45 object-cover shadow-sm md:mt-14 md:h-85 md:w-55"
            />
            <motion.img
              src="https://images.pexels.com/photos/36159308/pexels-photo-36159308.jpeg"
              alt="Blue butterfly close-up"
              style={{ y: secondRightY }}
              className="h-65 w-45 object-cover shadow-sm md:h-85 md:w-55"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
