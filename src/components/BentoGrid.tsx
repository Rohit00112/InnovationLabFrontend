"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { cn } from "@/lib/utils/util";
import { X } from "lucide-react";

type ImageItem = {
  id: number | string;
  title: string;
  desc: string;
  url: string;
  span: string;
};

interface BentoGridProps {
  imageItems: ImageItem[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const ImageModal = ({
  item,
  onClose,
}: {
  item: ImageItem;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.url}
          alt={item.title}
          width={1600}
          height={1000}
          unoptimized
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="h-auto max-h-[90vh] w-full rounded-lg object-contain"
        />
      </motion.div>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
        aria-label="Close image view"
      >
        <X size={24} />
      </button>
    </motion.div>
  );
};

const BentoGrid: React.FC<BentoGridProps> = ({ imageItems }) => {
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0]);

  return (
    <section
      ref={targetRef}
      className="relative w-full overflow-hidden bg-background"
    >
      <div className="relative w-full">
        <motion.div className="w-full" style={{ opacity, y }}>
          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[minmax(18rem,1fr)]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {imageItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={cn(
                  "group relative flex h-full min-h-72 w-full cursor-pointer items-end overflow-hidden bg-card p-4 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  item.span,
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedItem(item)}
                tabIndex={0}
                aria-label={`View ${item.title}`}
              >
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ImageModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default BentoGrid;
