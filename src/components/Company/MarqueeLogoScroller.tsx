"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils/util"; // Assuming a `cn` utility for classnames
import CompanyCard from "@/components/Company/companyCard";
import { AnimatedModal } from "@/components/Animations/animated-modal";

// Define the type for individual logo props
interface Logo {
  src?: string;
  alt?: string;
  imageUrl?: string;
  companyName?: string;
  companyDetails?: string;
  internsCount?: number;
}

interface SelectedCompany {
  logoUrl: string;
  name: string;
  about: string;
  numberOfInterns: number;
  priority: number;
  isMouSigned: boolean;
  contactEmail: string;
  websiteUrl: string;
}

// Define the props for the main component
interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  logos: Logo[];
  speed?: "normal" | "slow" | "fast";
}

/**
 * A responsive, self-contained, and infinitely scrolling marquee component.
 * It pauses on hover and uses shadcn/ui theme variables for styling.
 * This component includes its own CSS animation and does not require tailwind.config.js modifications.
 */
const MarqueeLogoScroller = React.forwardRef<
  HTMLDivElement,
  MarqueeLogoScrollerProps
>(
  (
    { title, description, logos, speed = "normal", className, ...props },
    ref,
  ) => {
    const [isPaused, setIsPaused] = React.useState(false);

    // Map speed prop to animation duration
    const durationMap = {
      normal: "40s",
      slow: "80s",
      fast: "5s",
    };
    const animationDuration = durationMap[speed];

    return (
      <>
        {/* The @keyframes for the marquee animation are defined directly here for robustness. */}
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

        <section
          ref={ref}
          aria-label={title}
          className={cn(
            "m-0 w-full bg-background text-foreground border border-[#DFDFDF] overflow-hidden",
            className,
          )}
          {...props}
        >
          {/* Header Section */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 lg:gap-8 pb-6 md:pb-8 border-b border-[#006875]">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-balance">
                {title}
              </h2>
              <p className="text-muted-foreground self-start lg:justify-self-end text-balance">
                {description}
              </p>
            </div>
          </div>

          {/* Marquee Section */}
          <div
            className="w-full overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div
              className="flex w-max items-center gap-4 py-4 pr-4 transition-all duration-300 ease-in-out"
              style={{
                animation: `marquee ${animationDuration} linear infinite`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {/* Render logos twice to create a seamless loop */}
              {[...logos, ...logos].map((logo, index) => {
                const imageSrc = logo.src ?? logo.imageUrl;
                const imageAlt = logo.alt ?? logo.companyName ?? "Company logo";

                if (!imageSrc) return null;

                const companyPayload: SelectedCompany = {
                  logoUrl: logo.imageUrl ?? imageSrc,
                  name: logo.companyName ?? imageAlt,
                  about: logo.companyDetails ?? "Details coming soon.",
                  numberOfInterns: logo.internsCount ?? 0,
                  priority: 0,
                  isMouSigned: false,
                  contactEmail: "",
                  websiteUrl: "#",
                };

                return (
                  <AnimatedModal
                    key={index}
                    title={companyPayload.name}
                    triggerClassName="group relative h-24 w-40 shrink-0"
                    overlayClassName="bg-black/35 backdrop-blur-sm"
                    viewportClassName="p-4"
                    contentClassName="relative mx-auto mt-10 w-full max-w-xl"
                    trigger={
                      <div
                        className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden border border-[#DFDFDF] bg-white"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                      >
                        {/* Single hover color overlay for all logos */}
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 var(--color-primary)/15" />
                        {/* Logo Image */}
                        <img
                          src={imageSrc}
                          alt={imageAlt}
                          className="relative h-3/4 w-auto object-contain"
                        />
                      </div>
                    }
                  >
                    <div className="relative">
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#DFDFDF] bg-white text-sm font-semibold text-black shadow-sm hover:bg-[#F3F3F3]"
                          aria-label="Close company details"
                        >
                          X
                        </button>
                      </Dialog.Close>
                      <CompanyCard
                        topText="Partner"
                        logoUrl={companyPayload.logoUrl}
                        name={companyPayload.name}
                        about={companyPayload.about}
                        priority={companyPayload.priority}
                        isMouSigned={companyPayload.isMouSigned}
                        contactEmail={companyPayload.contactEmail}
                        websiteUrl={companyPayload.websiteUrl}
                        numberOfInterns={companyPayload.numberOfInterns}
                        disableTilt={true}
                        className="bg-white"
                      />
                    </div>
                  </AnimatedModal>
                );
              })}
            </div>
          </div>
        </section>
      </>
    );
  },
);

MarqueeLogoScroller.displayName = "MarqueeLogoScroller";

export { MarqueeLogoScroller };
