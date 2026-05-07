"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const sampleSlides = [
  {
    title: "Spring Carnival",
    description:
      "A multi-sensory immersion into generative environments, creative systems, and live prototypes.",
    buttonLabel: "Join Now",
    buttonHref: "/contact",
    image:
      "https://images.pexels.com/photos/36390048/pexels-photo-36390048.jpeg",
  },
  {
    title: "XR Habitat Demo",
    description:
      "An interactive showcase of spatial ideas with rapid feedback from builders and researchers.",
    buttonLabel: "Explore Session",
    buttonHref: "/events",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Urban Data Lab",
    description:
      "Collaborative mapping of city signals to create practical prototypes for communities.",
    buttonLabel: "View Program",
    buttonHref: "/events",
    image:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80",
  },
];

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const id = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);

    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <div className="relative min-h-screen w-full md:h-[82vh]">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {sampleSlides.map((slide) => (
            <article
              key={slide.title}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/78 via-neutral-900/35 to-neutral-900/20" />

              <div className="absolute inset-0 flex items-end p-5 md:p-10">
                <div className="max-w-3xl text-white">
                  <p className="mb-3 inline-flex var(--color-primary) px-2 py-1 text-[0.56rem] font-extrabold uppercase tracking-[0.2em] text-black">
                    Featured Event
                  </p>
                  <h3 className="text-[clamp(2rem,5vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.06em]">
                    {slide.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/82 md:text-base">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.buttonHref}
                    className="mt-6 inline-flex border border-white/60 bg-white px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-black transition hover:var(--color-primary) hover:border-cyan-500"
                  >
                    {slide.buttonLabel}
                  </Link>
                  <Link
                    href="/events"
                    className="mt-3 inline-flex border border-white/35 bg-white/10 px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black"
                  >
                    View Events
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-8">
        {sampleSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={[
              "h-2 rounded-full transition-all",
              selectedIndex === index ? "w-10 bg-white" : "w-6 bg-white/35",
            ].join(" ")}
          />
        ))}
      </div>

      <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 gap-2 md:right-6">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="h-10 w-10 border border-white/50 bg-black/30 text-xl text-white transition hover:bg-black/55"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next slide"
          className="h-10 w-10 border border-white/50 bg-black/30 text-xl text-white transition hover:bg-black/55"
        >
          ›
        </button>
      </div>
    </div>
  );
}
