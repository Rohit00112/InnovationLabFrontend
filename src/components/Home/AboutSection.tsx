import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const aboutImages = [
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80",
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY1 = useSpring(useTransform(scrollYProgress, [0, 1], [80, -70]), {
    stiffness: 90,
    damping: 22,
  });
  const imageY2 = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 55]), {
    stiffness: 90,
    damping: 22,
  });
  const imageY3 = useSpring(useTransform(scrollYProgress, [0, 1], [55, -55]), {
    stiffness: 90,
    damping: 22,
  });
  const imageY4 = useSpring(useTransform(scrollYProgress, [0, 1], [-70, 70]), {
    stiffness: 90,
    damping: 22,
  });

  return (
    <section
      ref={sectionRef}
      className="border-t border-gray-300 bg-white px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto grid w-full gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-6">
          <h2 className="max-w-[10ch] text-[clamp(42px,8vw,64px)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-neutral-900">
            AB<span className="text-iblue">O</span>UT US
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-black md:text-lg">
            Innovation Lab brings builders, thinkers, and creators into one
            working system. Teams prototype in public, test ideas quickly, and
            turn experiments into programs that people can actually join.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-5">
          <motion.img
            src={aboutImages[0]}
            alt="Community workshop"
            style={{ y: imageY1 }}
            className="h-56 w-full object-cover md:h-72"
          />
          <motion.img
            src={aboutImages[1]}
            alt="Creative team discussion"
            style={{ y: imageY2 }}
            className="mt-16 h-56 w-full object-cover md:h-72"
          />
          <motion.img
            src={aboutImages[2]}
            alt="Collaborative planning"
            style={{ y: imageY3 }}
            className="-mt-12 h-56 w-full object-cover md:h-72"
          />
          <motion.img
            src={aboutImages[3]}
            alt="Community research session"
            style={{ y: imageY4 }}
            className="mt-4 h-56 w-full object-cover md:h-72"
          />
        </div>
      </div>
    </section>
  );
}
