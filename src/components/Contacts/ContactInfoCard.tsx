"use client";

import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type ContactInfoCardProps = {
  title: string;
  content: string;
  isBordered?: boolean;
  Icon?: LucideIcon;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ContactInfoCard({
  title,
  content,
  isBordered = true,
  Icon,
}: ContactInfoCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={itemVariants}
      className={`group relative p-6 cursor-pointer ${
        isBordered ? "border-b border-r border-neutral-300 md:border-b-0" : ""
      }`}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -4,
              transition: {
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1],
              },
            }
      }
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Animated background glow on hover */}
      <motion.div
        className="absolute inset-0 -z-10 bg-linear-to-br from-cyan-400/12 via-cyan-400/4 to-transparent opacity-0 pointer-events-none blur-xl"
        animate={reducedMotion ? { opacity: 0 } : undefined}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={
          reducedMotion
            ? undefined
            : {
                opacity: 1,
              }
        }
      />
      <motion.div className="absolute top-0 left-0 h-0.5 w-0 bg-linear-to-r from-cyan-400 via-cyan-300 to-transparent group-hover:w-full transition-all duration-700 ease-out pointer-events-none" />
      <motion.div className="relative z-10 aspect-square">
        {Icon ? (
          <motion.div
            className="mb-4 inline-flex h-10 w-10 items-center justify-center  border border-neutral-300 bg-white text-neutral-900 transition-colors duration-300 group-hover:border-cyan-300 group-hover:text-cyan-600"
            whileHover={
              reducedMotion
                ? undefined
                : {
                    rotate: -8,
                    scale: 1.04,
                  }
            }
            transition={{ duration: 0.25, ease: "easeOut" }}
            aria-hidden
          >
            <Icon size={18} strokeWidth={2.2} />
          </motion.div>
        ) : null}
        <motion.h3
          className="mb-3 text-xl font-black uppercase tracking-tight text-neutral-900 transition-colors duration-400 group-hover:text-primary"
          whileHover={
            reducedMotion
              ? undefined
              : {
                  letterSpacing: "0.08em",
                  x: 2,
                }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-xs uppercase tracking-[0.12em] text-neutral-500 transition-colors duration-400 group-hover:text-neutral-700"
          whileHover={
            reducedMotion
              ? undefined
              : {
                  letterSpacing: "0.16em",
                  x: 1,
                }
          }
          transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
        >
          {content}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
