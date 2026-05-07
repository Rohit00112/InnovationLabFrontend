"use client";

import Image from "next/image";
import { useGetEvents } from "@/lib/services/generated/frontend";
import { separateEvents, formatEventDate } from "@/lib/utils/events";

export default function LatestEventsSection() {
  const { data, isLoading, error } = useGetEvents();

  // Get all events from the response - handle both array and object response formats
  const allEvents = Array.isArray(data) ? data : (data?.data as any[]) || [];
  const { upcomingEvents } = separateEvents(allEvents);

  // Use only the first 3 upcoming events
  const latestEventsItems = upcomingEvents.slice(0, 3).map((event, index) => ({
    title: event.title || "Untitled Event",
    date: formatEventDate(event.startTime),
    desc: event.description || "",
    img: String(100 - index), // Generate unique seed numbers
    coverImageUrl: event.coverImageUrl,
  }));

  if (isLoading || error) {
    return null; // Or return a loading skeleton
  }

  return (
    <section className="border-t border-gray-300 py-14 md:py-20">
      <div className="mx-auto px-4 md:px-8">
        <h2 className="mb-8 ml-1 text-2xl font-extrabold uppercase md:mb-10 md:ml-0 md:text-6xl">
          Latest Events
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
          {latestEventsItems.map((item) => {
            // Use coverImageUrl if available, otherwise generate a placeholder
            const imageUrl =
              item.coverImageUrl ||
              `https://picsum.photos/seed/${item.img}/600/400`;

            return (
              <div
                key={item.title}
                className="bg-white border border-gray-100 group aspect-square"
              >
                <Image
                  src={imageUrl}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="h-52 w-full object-cover md:h-56"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/seed/${item.img}/600/400`;
                  }}
                />
                <div className="p-5 md:p-6">
                  <span className="text-blue-500 text-[10px] font-bold uppercase tracking-wider">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {item.desc}
                  </p>
                  <span className="text-primary text-2xl cursor-pointer group-hover:translate-x-2 transition-transform inline-block">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
