"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import type { EventResponseDto } from "@/lib/services/generated/frontend/schemas";
import Button from "../primitives/Button";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_SLIDES_COUNT = 4;

function EventDetailsButton({ eventId }: { eventId?: string | null }) {
  const router = useRouter();
  if (!eventId) return null;
  return <Button href={`/events/${eventId}`}>View Event</Button>;
}

function EventSlide({
  slide,
  scrollYProgress,
  index,
}: {
  slide: EventResponseDto;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}) {
  const imageY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      index % 2 === 0 ? [90, -90] : [-70, 70],
    ),
    { stiffness: 80, damping: 20 },
  );

  return (
    <article className="event-slide flex h-screen w-screen shrink-0 items-stretch border-l border-neutral-200 bg-white text-neutral-900 first:border-l-0">
      <div className="grid w-full grid-cols-1 md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-between gap-10 px-6 py-8 md:px-12 md:py-12">
          <div className="space-y-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-iblue">
              {slide.seriesName || "Event"}
            </p>
            <h3 className="max-w-[10ch] text-[clamp(42px,7vw,88px)] font-black uppercase leading-[0.9] tracking-[-0.08em]">
              {slide.title}
            </h3>
            <p className="max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
              {slide.description}
            </p>
            <div className="">
              <EventDetailsButton eventId={slide.id} />
            </div>
          </div>

          <div className="grid gap-5 border-t border-neutral-200 pt-5 md:grid-cols-2 md:items-end">
            <p className="max-w-md text-sm leading-relaxed text-neutral-500">
              {slide.highlights?.join(" · ") || slide.location}
            </p>
            <div className="flex items-center gap-3 justify-start md:justify-end">
              <span className="inline-flex h-11 w-11 items-center justify-center border border-neutral-300 bg-neutral-50 text-sm font-extrabold text-neutral-900">
                0{index + 1}
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-iblue">
                Horizontal scroll
              </span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[40vh] overflow-hidden border-t border-neutral-200 sm:min-h-[45vh] md:min-h-0 md:border-l md:border-t-0">
          <motion.img
            src={slide.coverImageUrl || "/placeholder.jpg"}
            alt={slide.title || "Event image"}
            style={{ y: imageY }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-white/35 via-white/8 to-transparent" />
        </div>
      </div>
    </article>
  );
}

export function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [events, setEvents] = useState<EventResponseDto[]>([]);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/events`);
        if (!res.ok) return;
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.data ?? []);
        if (mounted) setEvents(list.slice(0, DEFAULT_SLIDES_COUNT));
      } catch (e) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;
    if (isMobile) return;
    if (events.length === 0) return;

    const getScrollDistance = () => track.scrollWidth - window.innerWidth;

    const context = gsap.context(() => {
      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, [isMobile, events]);

  return (
    <>
      <section className="border-t border-neutral-300 bg-neutral-100 px-4 py-10 md:hidden">
        <div className="mb-6">
          <h2 className="text-[clamp(2rem,10vw,3rem)] font-black uppercase tracking-[-0.06em] text-neutral-900">
            Latest Events
          </h2>
        </div>
        <div className="space-y-5">
          {(events.length
            ? events
            : Array.from({ length: DEFAULT_SLIDES_COUNT })
          )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((slide: any, index) => (
              <article
                key={slide?.id ?? index}
                className="overflow-hidden border border-neutral-300 bg-white"
              >
                <div className="relative h-56 overflow-hidden border-b border-neutral-200">
                  <img
                    src={slide?.coverImageUrl || "/placeholder.jpg"}
                    alt={slide?.title || ""}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3 p-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-iblue">
                    {slide?.seriesName || "Event"}
                  </p>
                  <h3 className="text-3xl font-black uppercase tracking-[-0.06em] text-neutral-900">
                    {slide?.title || "Coming soon"}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {slide?.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-neutral-200 pt-3">
                    <p className="max-w-[75%] text-xs text-neutral-500">
                      {slide?.highlights?.join(" · ")}
                    </p>
                    <span className="inline-flex h-11 w-11 items-center justify-center border border-neutral-300 bg-neutral-50 text-sm font-extrabold text-neutral-900">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="mt-3">
                    <EventDetailsButton eventId={slide?.id} />
                  </div>
                </div>
              </article>
            ))}
        </div>
      </section>

      <section
        ref={sectionRef}
        className="relative hidden overflow-hidden bg-neutral-100 md:block"
      >
        <motion.div
          ref={trackRef}
          className="flex h-screen w-max will-change-transform"
        >
          {events.length
            ? events.map((slide, index) => (
                <EventSlide
                  key={slide.id}
                  slide={slide}
                  scrollYProgress={scrollYProgress}
                  index={index}
                />
              ))
            : Array.from({ length: DEFAULT_SLIDES_COUNT }).map((_, index) => (
                <div
                  key={index}
                  className="w-screen h-screen flex items-center justify-center"
                >
                  <div className="text-neutral-500">Loading...</div>
                </div>
              ))}
        </motion.div>
      </section>
    </>
  );
}
