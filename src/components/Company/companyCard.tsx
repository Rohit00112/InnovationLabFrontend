// components/ui/animated-presence-card.tsx

"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils/util"; // Assuming shadcn/ui's utility function

// Define the props for the component
interface CompanyCardProps {
  topText: string;
  logoUrl: string;
  name: string;
  about: string;
  priority: number;
  isMouSigned: boolean;
  contactEmail: string;
  websiteUrl: string;
  numberOfInterns: number;
  className?: string;
  disableTilt?: boolean;
  compact?: boolean;
}

export default function CompanyCard({
  topText,
  logoUrl,
  name,
  about,
  priority,
  isMouSigned,
  contactEmail,
  websiteUrl,
  numberOfInterns,
  className,
  disableTilt = false,
  compact = false,
}: CompanyCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={disableTilt ? undefined : handleMouseMove}
      onMouseLeave={disableTilt ? undefined : handleMouseLeave}
      style={{
        rotateX: disableTilt ? 0 : springRotateX,
        rotateY: disableTilt ? 0 : springRotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className={cn(
        "group relative w-full overflow-hidden",
        "transition-all duration-300 ease-out",
        className,
      )}
    >
      <div style={{ transform: 'translateZ(20px)' }} className="relative h-full flex flex-col justify-between">
        {/* Image Section */}
        <div 
          className={`relative ${compact ? 'px-4 pt-4' : 'px-6 pt-6'} cursor-pointer`}
          onClick={() => window.open(websiteUrl, '_blank')}
        >
          <div className={`absolute ${compact ? 'top-6 left-6' : 'top-10 left-10'} z-10 flex flex-col gap-2`}>
            {topText && (
              <span className="text-xs font-semibold uppercase tracking-widest text-white/90 mix-blend-difference">
                {topText}
              </span>
            )}
          </div>
          <Image
            src={logoUrl}
            alt={name}
            width={1200}
            height={800}
            unoptimized
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-64 w-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className={`flex-1 flex flex-col justify-center ${compact ? 'p-4' : 'p-6'}`}>
          <h2 className={`${compact ? 'text-[18px]' : 'text-[24px]'} font-bold leading-tight uppercase`}>
            {name}
          </h2>
          <p className={`mt-2 ${compact ? 'text-[12px]' : 'text-[14px]'} leading-snug text-[#515151] line-clamp-3`}>
            {about}
          </p>
          {contactEmail && (
            <a href={`mailto:${contactEmail}`} className={`mt-2 ${compact ? 'text-[11px]' : 'text-[12px]'} text-accent font-medium hover:underline flex items-center gap-1`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {contactEmail}
            </a>
          )}
          <div className={`${compact ? 'mt-3' : 'mt-4'} border-t`}  />
        </div>

        {/* Footer Section */}
        <div className={`grid grid-cols-[1fr_auto] items-center gap-2 ${compact ? 'px-4 pb-4 pt-1' : 'px-6 pb-6 pt-1'}`}>
          <span className={`${compact ? 'text-[10px]' : 'text-[12px]'} font-black uppercase tracking-[2.5px] leading-tight text-black`}>
            <span className="lg:hidden">INTERNSHIP<br />QUOTA</span>
            <span className="hidden lg:inline">INTERNSHIP QUOTA</span>
          </span>
          <span
            className={`text-right ${compact ? 'text-[14px] sm:text-[16px] lg:text-[18px]' : 'text-[18px] sm:text-[20px] lg:text-[24px]'} font-black uppercase leading-none lg:whitespace-nowrap`}
          >
            {numberOfInterns} INTERNS
          </span>
        </div>
      </div>
    </motion.div>
  );
}
