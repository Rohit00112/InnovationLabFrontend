"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.06,
    },
  },
};

const headingChar: Variants = {
  hidden: { opacity: 0, y: 42, filter: "blur(7px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ContactHeading() {
  const letters = ["C", "O", "N", "T", "A", "C", "T"];

  return (
    <motion.h1
      className="mb-8 text-[clamp(48px,7vw,98px)] font-black uppercase leading-none tracking-tighter"
      variants={headingContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.65 }}
      aria-label="CONTACT"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={headingChar}
          className={
            letter === "O" ? "text-primary inline-block" : "inline-block"
          }
          animate={
            letter === "O"
              ? {
                  textShadow: [
                    "0 0 0px rgba(34,211,238,0)",
                    "0 0 10px rgba(34,211,238,0.45)",
                    "0 0 0px rgba(34,211,238,0)",
                  ],
                }
              : undefined
          }
          transition={
            letter === "O"
              ? {
                  textShadow: {
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.85,
                  },
                }
              : undefined
          }
        >
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function ContactHeroBox() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mb-10 h-32.5 w-full overflow-hidden border border-neutral-300 bg-gradient-to-r from-pink-300 via-violet-200 to-rose-200 md:h-47.5"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute -left-10 top-4 h-28 w-28 rounded-full bg-white/20 blur-sm"
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, 16, 0],
                y: [0, -8, 0],
                scale: [1, 1.04, 1],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      <motion.div
        className="absolute right-16 top-8 h-24 w-52 rounded-full bg-white/15 blur-sm"
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, -20, 0],
                y: [0, 10, 0],
                scale: [1, 0.96, 1],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }
        }
      />

      <motion.div
        className="absolute left-1/3 top-0 h-full w-40 rotate-12 bg-white/10 blur-2xl"
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, 30, 0],
                opacity: [0.35, 0.6, 0.35],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        animate={
          reducedMotion
            ? { opacity: 0.22 }
            : {
                opacity: [0.22, 0.38, 0.22],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      <motion.div
        className="absolute inset-y-0 -left-1/4 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl"
        animate={reducedMotion ? undefined : { x: ["0%", "410%"] }}
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 3.6,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }
        }
      />
    </motion.div>
  );
}
