"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EventResponseDto } from "@/lib/services/generated/frontend/schemas";

type EmblaCarouselProps = {
  events: EventResponseDto[];
};

export function EmblaCarousel({ events }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Map API events to carousel slides
  const slides = events.map((event) => ({
    id: event.id,
    title: event.title || "Untitled Event",
    description: event.description || "",
    image: event.coverImageUrl || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    eyebrow: event.seriesName || "Featured Event",
    isRegistrationOpen: event.isRegistrationOpen || false,
  }));

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

  if (slides.length === 0) return null;

  return (
    <div className="relative min-h-screen w-full md:h-[82vh]">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <article
              key={slide.id}
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
                  <p className="mb-3 inline-flex bg-cyan-400 px-2 py-1 text-[0.56rem] font-extrabold uppercase tracking-[0.2em] text-black">
                    {slide.eyebrow}
                  </p>
                  <h3 className="text-[clamp(2rem,5vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.06em]">
                    {slide.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/82 md:text-base">
                    {slide.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/events/${slide.id}`}
                      className="inline-flex border border-white/60 bg-white px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-black transition hover:bg-cyan-400 hover:border-cyan-400"
                    >
                      Learn More
                    </Link>
                    {slide.isRegistrationOpen ? (
                      <Link
                        href={`/events/${slide.id}/register`}
                        className="inline-flex border border-white/60 bg-white px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-black transition hover:bg-cyan-400 hover:border-cyan-400"
                      >
                        Register
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="inline-flex border border-white/60 bg-white px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-black transition hover:bg-cyan-400 hover:border-cyan-400"
                      >
                        Contact Us
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-8">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
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

