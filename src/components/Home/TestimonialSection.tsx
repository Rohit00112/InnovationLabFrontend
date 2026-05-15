"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
};

const testimonialData: Testimonial[] = [
  {
    id: 1,
    quote:
      "At the Innovation Lab, we are committed to fostering a culture where creativity, critical thinking, and practical learning come together. Our objective is to create an environment that empowers students to explore ideas, develop innovative solutions, and gain hands-on experience that extends beyond traditional classroom learning. By bridging academic knowledge with real-world application, we aim to prepare students to become confident, future-ready innovators who can contribute meaningfully to society.",
    author: "Mr. Nishesh Bishwas",
    role: "Innovation Lab Lead",
    image: "/sir/nb.jpg",
  },
  {
    id: 2,
    quote:
      "The Innovation Lab provides a dynamic platform for students to engage in experiential learning and collaborative problem-solving. We emphasize a student-centered approach where learners are encouraged to experiment, think independently, and apply their knowledge in practical contexts. Through continuous guidance and support, we strive to help students enhance their technical skills, creativity, and confidence, enabling them to transform their ideas into impactful outcomes.",
    author: "Mr. Sujan Subedi",
    role: "Tech Community Mentor",
    image: "/sir/ss.jpg",
  },
];

function PortraitCard({
  testimonial,
  parallaxY,
}: {
  testimonial: Testimonial;
  parallaxY: ReturnType<typeof useTransform>;
}) {
  return (
    <motion.div
      style={{ y: parallaxY, willChange: "transform", translateZ: 0 }}
      className="relative w-full"
    >
      <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-iblue/10 via-iblue/5 to-transparent blur-2xl" />
      <div className="absolute -bottom-4 -right-4 -z-10 h-2/3 w-2/3 rounded-[2rem] bg-iblue/90" />
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-neutral-100 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.25)] ring-1 ring-black/5">
        <img
          src={testimonial.image}
          alt={testimonial.author}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/80">
            {testimonial.role}
          </p>
          <p className="mt-1 text-xl font-black tracking-tight md:text-2xl">
            {testimonial.author}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function QuoteBlock({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <span className="h-px w-12 bg-iblue" />
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-iblue">
          {testimonial.role}
        </span>
      </div>
      <h3 className="mt-4 text-3xl font-black uppercase tracking-tight text-neutral-900 md:text-4xl">
        {testimonial.author}
      </h3>

      <div className="relative mt-8">
        <span
          aria-hidden
          className="absolute -left-2 -top-10 select-none font-serif text-[8rem] leading-none text-iblue/15 md:-left-4 md:-top-14 md:text-[10rem]"
        >
          &ldquo;
        </span>
        <p className="relative text-lg leading-[1.75] text-neutral-700 md:text-xl md:leading-[1.8]">
          {testimonial.quote}
        </p>
      </div>
    </div>
  );
}

export const TestimonialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const firstImageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const secondImageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-iblue">
            Voices of Innovation
          </h2>
          <p className="mt-2 text-4xl font-black uppercase tracking-tight text-neutral-900 md:text-6xl">
            Testim<span className="text-iblue">o</span>nials
          </p>
        </div>

        <div className="space-y-28 md:space-y-40">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 lg:gap-20">
            <div className="md:col-span-5">
              <PortraitCard
                testimonial={testimonialData[0]}
                parallaxY={firstImageY}
              />
            </div>
            <div className="md:col-span-7">
              <QuoteBlock testimonial={testimonialData[0]} />
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 lg:gap-20">
            <div className="order-2 md:order-1 md:col-span-7">
              <QuoteBlock testimonial={testimonialData[1]} />
            </div>
            <div className="order-1 md:order-2 md:col-span-5">
              <PortraitCard
                testimonial={testimonialData[1]}
                parallaxY={secondImageY}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
