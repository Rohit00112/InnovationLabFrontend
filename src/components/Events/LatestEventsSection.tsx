"use client";

import Image from "next/image";
import Link from "next/link";
import type { EventResponseDto } from "@/lib/services/generated/frontend/schemas";

type LatestEventsSectionProps = {
  events: EventResponseDto[];
};

export default function LatestEventsSection({ events }: LatestEventsSectionProps) {
  return (
    <section className="border-t border-gray-300 py-14 md:py-20">
      <div className="mx-auto px-4 md:px-8">
        <h2 className="mb-8 ml-1 text-2xl font-extrabold uppercase md:mb-10 md:ml-0 md:text-6xl">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col overflow-hidden border border-neutral-200 bg-white transition-all hover:border-neutral-400 hover:shadow-lg"
            >
              <Link
                href={`/events/${event.id}`}
                className="group relative h-52 w-full overflow-hidden bg-neutral-100 md:h-56"
              >
                <Image
                  src={event.coverImageUrl || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80"}
                  alt={event.title || "Untitled Event"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  {event.seriesName || "Special Event"}
                </span>

                <h3 className="text-lg font-bold leading-tight text-neutral-900">
                  {event.title}
                </h3>

                <p className="flex-1 text-sm text-neutral-600 line-clamp-2">
                  {event.description}
                </p>

                <div className="flex gap-3 pt-2">
                  <Link
                    href={`/events/${event.id}`}
                    className="relative inline-flex flex-1 group font-medium"
                  >
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-sky-400 transition-all duration-100 ease-out" />
                    <span className="relative z-10 block w-full px-3 py-2 border border-sky-400 text-center text-xs font-bold uppercase tracking-wider text-black transform transition-all duration-100 ease-out -translate-y-0.5 group-active:translate-y-0">
                      Learn More
                    </span>
                  </Link>

                  {event.isRegistrationOpen ? (
                    <Link
                      href={`/events/${event.id}/register`}
                      className="relative inline-flex flex-1 group font-medium"
                    >
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-sky-400 transition-all duration-100 ease-out" />
                      <span className="relative z-10 block w-full px-3 py-2 border border-transparent bg-black text-center text-xs font-bold uppercase tracking-wider text-white transform transition-all duration-100 ease-out -translate-y-0.5 group-active:translate-y-0 hover:bg-sky-400 hover:text-black">
                        Register
                      </span>
                    </Link>
                  ) : (
                    <Link
                      href="/contact"
                      className="relative inline-flex flex-1 group font-medium"
                    >
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-sky-400 transition-all duration-100 ease-out" />
                      <span className="relative z-10 block w-full px-3 py-2 border border-transparent bg-black text-center text-xs font-bold uppercase tracking-wider text-white transform transition-all duration-100 ease-out -translate-y-0.5 group-active:translate-y-0 hover:bg-sky-400 hover:text-black">
                        Contact Us
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

