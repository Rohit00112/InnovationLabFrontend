"use client";

import { useQuery } from "@tanstack/react-query";
import { listEvents } from "@/lib/services/domain/events";
import {
  separateEvents,
  formatEventDate,
  formatEventTime,
} from "@/lib/utils/events";

export default function UpcomingEventsSection() {
  const { data: allEvents = [], isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: listEvents,
  });

  const { upcomingEvents } = separateEvents(allEvents);

  // Gracefully handle API errors (404, network issues, etc.) - hide section
  if (error) {
    console.debug("Events API error:", error);
    return null;
  }

  // Don't render if no events available
  if (!isLoading && upcomingEvents.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="py-16 max-w-[73.75rem] w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl uppercase font-extrabold tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-sm text-ivGray-500 mt-2">
              Loading upcoming events...
            </p>
          </div>
        </div>
      </section>
    );
  }

  const events = upcomingEvents.map((event) => ({
    title: event.title || "Untitled Event",
    date: formatEventDate(event.startTime),
    time: formatEventTime(event.startTime),
    venue: event.location || "TBD",
    desc: event.description || "",
    type: "upcoming" as const,
  }));

  return (
    <section className="py-16 max-w-[73.75rem] w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl uppercase font-extrabold tracking-tight">
            Upcoming Events
          </h2>
          <p className="text-sm text-ivGray-500 mt-2">
            See what is happening next at IV Lab.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <article
            key={`${event.type}-${event.title}`}
            className="border border-gray-100 p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white"
          >
            <div className="md:w-2/3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivGray-500 mb-2">
                {event.date} • {event.time} • {event.venue}
              </p>
              <div>
                <h3 className="text-lg uppercase font-bold tracking-tight">
                  {event.title}
                </h3>
                <p className="text-ivGray-500 text-sm mt-1">{event.desc}</p>
              </div>
            </div>
            <button className="bg-white text-ivBlack uppercase tracking-widest font-bold text-[0.68rem] px-5 py-3 whitespace-nowrap border border-ivBlack hover:bg-black hover:text-white transition-colors duration-100">
              Join Now
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
