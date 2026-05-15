"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const testimonialData = [
  {
    id: 1,
    quote:
      "At the Innovation Lab, we are committed to fostering a culture where creativity, critical thinking, and practical learning come together. Our objective is to create an environment that empowers students to explore ideas, develop innovative solutions, and gain hands-on experience that extends beyond traditional classroom learning. By bridging academic knowledge with real-world application, we aim to prepare students to become confident, future-ready innovators who can contribute meaningfully to society.",
    author: "Mr. Nishesh Bishwas",
    role: "Innovation Lab Lead",
    image: "/sir/nb.jpg",
    image2: "/sir/nb.jpg",
  },
  {
    id: 2,
    quote:
      "The Innovation Lab provides a dynamic platform for students to engage in experiential learning and collaborative problem-solving. We emphasize a student-centered approach where learners are encouraged to experiment, think independently, and apply their knowledge in practical contexts. Through continuous guidance and support, we strive to help students enhance their technical skills, creativity, and confidence, enabling them to transform their ideas into impactful outcomes.",
    author: "Mr. Sujan Subedi",
    role: "Tech Community Mentor",
    image: "/sir/ss.jpg",
    image2: "/sir/ss.jpg",
  },
];

export const TestimonialSection = () => {
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
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-gray-50 py-14 sm:py-16 md:py-24 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-400 flex-col gap-12 px-4 sm:px-6 md:gap-16 md:px-8 lg:px-10">
        <h2 className="max-w-[10ch] text-[clamp(36px,9vw,64px)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-neutral-900">
          TESTIM<span className="text-iblue">O</span>NIAL
        </h2>
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-8">
            <motion.img
              src={testimonialData[0].image}
              alt={testimonialData[0].image}
              style={{ y: firstLeftY }}
              transition={{ type: "spring", stiffness: 110, damping: 26 }}
              className="h-[42vw] w-[38vw] object-cover shadow-sm sm:h-[38vw] sm:w-[34vw] md:h-128 md:w-128"
            />
            {/* <motion.img
              alt={testimonialData[0].author}
              src={testimonialData[0].image2}
              style={{ y: firstRightY }}
              transition={{ type: "spring", stiffness: 80, damping: 22 }}
              className="mt-8 h-[42vw] w-[38vw] object-cover shadow-sm sm:mt-10 sm:h-[38vw] sm:w-[34vw] md:mt-14 md:h-85 md:w-55"
            /> */}
          </div>

          <div className="max-w-xl pt-1 text-[17px] leading-7 tracking-[0.01em] text-neutral-800 sm:text-[19px] sm:leading-8 md:pt-6 md:text-[22px] md:leading-9 md:tracking-[0.02em]">
            <p className="mb-6 text-[clamp(1rem,2vw,1.25rem)] font-semibold text-neutral-900">
              {testimonialData[0].author}
            </p>
            <p className="italic text-[clamp(1rem,2.5vw,1.35rem)] leading-relaxed">
              &quot;{testimonialData[0].quote}&quot;
            </p>
            <p className="mt-6 text-[clamp(0.85rem,1.5vw,1rem)] font-semibold text-neutral-600">
              {testimonialData[0].role}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-12">
          <div className="order-2 max-w-xl text-[17px] leading-7 tracking-[0.01em] text-neutral-800 sm:text-[19px] sm:leading-8 md:order-1 md:text-[22px] md:leading-9 md:tracking-[0.02em]">
            <p className="mb-6 text-[clamp(1rem,2vw,1.25rem)] font-semibold text-neutral-900">
              {testimonialData[1].author}
            </p>
            <p className="italic text-[clamp(1rem,2.5vw,1.35rem)] leading-relaxed">
              &quot;{testimonialData[1].quote}&quot;
            </p>
            <p className="mt-6 text-[clamp(0.85rem,1.5vw,1rem)] font-semibold text-neutral-600">
              {testimonialData[1].role}
            </p>
          </div>

          <div className="order-1 flex items-start justify-start gap-3 sm:gap-4 md:order-2 md:justify-end md:gap-8">
            <motion.img
              src={testimonialData[1].image}
              alt={testimonialData[1].author}
              style={{ y: secondLeftY }}
              transition={{ type: "spring", stiffness: 78, damping: 20 }}
              className="mt-6 h-[42vw] w-[100%] object-cover center shadow-sm sm:mt-8 sm:h-[38vw] sm:w-[34vw] md:mt-14 md:h-128 md:w-96"
            />
            {/* <motion.img
              src={testimonialData[1].image2}
              alt={testimonialData[1].author}
              style={{ y: secondRightY }}
              transition={{ type: "spring", stiffness: 112, damping: 26 }}
              className="h-[42vw] w-[38vw] object-cover shadow-sm sm:h-[38vw] sm:w-[34vw] md:h-85 md:w-55"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
