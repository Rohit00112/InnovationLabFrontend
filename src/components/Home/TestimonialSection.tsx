"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const testimonialData = [
  {
    id: 1,
    quote: "Innovation Lab transformed our approach to product development.",
    author: "Sarah Chen",
    role: "Product Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    quote: "The collaborative environment here is unmatched in the industry.",
    author: "Michael Rodriguez",
    role: "Design Lead",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    quote: "Rapid prototyping became our competitive advantage.",
    author: "Emma Williams",
    role: "CEO",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    quote: "Building with the lab's framework accelerated our timeline.",
    author: "James Park",
    role: "Engineering Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    quote: "The community feedback loop is invaluable.",
    author: "Lisa Thompson",
    role: "UX Researcher",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    quote: "Ideas turn into products faster than ever.",
    author: "David Kumar",
    role: "Startup Founder",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    quote: "The mentorship here changed our entire strategy.",
    author: "Amanda Brooks",
    role: "Brand Strategist",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    quote: "Real-world testing with actual users defines success.",
    author: "Christopher Lee",
    role: "Growth Lead",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 9,
    quote: "Collaboration across disciplines sparked innovation.",
    author: "Rachel Martinez",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 10,
    quote: "The network alone is worth the investment.",
    author: "Thomas Anderson",
    role: "Investor",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
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
          TESTIM<span className="text-primary">O</span>NIAL
        </h2>
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex items-start gap-3 sm:gap-4 md:gap-8">
            <motion.img
              src={testimonialData[0].image}
              alt={testimonialData[0].author}
              style={{ y: firstLeftY }}
              transition={{ type: "spring", stiffness: 110, damping: 26 }}
              className="h-[42vw] w-[38vw] object-cover shadow-sm sm:h-[38vw] sm:w-[34vw] md:h-85 md:w-55"

            />
            <motion.img
              alt={testimonialData[1].author}
              src={testimonialData[1].image}
              style={{ y: firstRightY }}
              transition={{ type: "spring", stiffness: 80, damping: 22 }}
              className="mt-8 h-[42vw] w-[38vw] object-cover shadow-sm sm:mt-10 sm:h-[38vw] sm:w-[34vw] md:mt-14 md:h-85 md:w-55"
            />
          </div>

          <div className="max-w-xl pt-1 text-[17px] leading-7 tracking-[0.01em] text-neutral-800 sm:text-[19px] sm:leading-8 md:pt-6 md:text-[22px] md:leading-9 md:tracking-[0.02em]">
            <p className="mb-6 text-[clamp(1rem,2vw,1.25rem)] font-semibold text-neutral-900">
              {testimonialData[0].author}
            </p>
            <p className="italic text-[clamp(1rem,2.5vw,1.35rem)] leading-relaxed">&quot;{testimonialData[0].quote}&quot;</p>
            <p className="mt-6 text-[clamp(0.85rem,1.5vw,1rem)] font-semibold text-neutral-600">
              {testimonialData[0].role}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-12">
          <div className="order-2 max-w-xl text-[17px] leading-7 tracking-[0.01em] text-neutral-800 sm:text-[19px] sm:leading-8 md:order-1 md:text-[22px] md:leading-9 md:tracking-[0.02em]">
            <p className="mb-6 text-[clamp(1rem,2vw,1.25rem)] font-semibold text-neutral-900">
              {testimonialData[5].author}
            </p>
            <p className="italic text-[clamp(1rem,2.5vw,1.35rem)] leading-relaxed">&quot;{testimonialData[5].quote}&quot;</p>
            <p className="mt-6 text-[clamp(0.85rem,1.5vw,1rem)] font-semibold text-neutral-600">
              {testimonialData[5].role}
            </p>
          </div>

          <div className="order-1 flex items-start justify-start gap-3 sm:gap-4 md:order-2 md:justify-end md:gap-8">
            <motion.img
              src={testimonialData[6].image}
              alt={testimonialData[6].author}
              style={{ y: secondLeftY }}
              transition={{ type: "spring", stiffness: 78, damping: 20 }}
              className="mt-6 h-[42vw] w-[38vw] object-cover shadow-sm sm:mt-8 sm:h-[38vw] sm:w-[34vw] md:mt-14 md:h-85 md:w-55"
            />
            <motion.img
              src={testimonialData[7].image}
              alt={testimonialData[7].author}
              style={{ y: secondRightY }}
              transition={{ type: "spring", stiffness: 112, damping: 26 }}
              className="h-[42vw] w-[38vw] object-cover shadow-sm sm:h-[38vw] sm:w-[34vw] md:h-85 md:w-55"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
