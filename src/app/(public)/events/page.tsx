"use client";

import PageLayout from "@/components/primitives/PageLayout";
import { EmblaCarousel } from "@/components/Events/Carousel";
import PastEventsSection from "@/components/LearnMoreSection";
import LatestEventsSection from "@/components/Events/LatestEventsSection";
import { useQuery } from "@tanstack/react-query";
import { listEvents } from "@/lib/services/domain/events";
import { separateEvents } from "@/lib/utils/events";

export default function EventsPage() {
  const { data: allEvents = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: listEvents,
  });

  const { upcomingEvents } = separateEvents(allEvents);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-xl font-bold uppercase tracking-widest text-neutral-400 animate-pulse">
            Loading Events...
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* <PageHeader title={publicPageTitles.events} /> */}

      <section className="w-full px-0">
        <EmblaCarousel events={upcomingEvents} />
      </section>

      <div className="line-bg w-full md:h-16 h-6"></div>

      <div className="line-bg w-full md:h-16 h-6"></div>
      <LatestEventsSection events={upcomingEvents} />
      <PastEventsSection events={allEvents} />
    </PageLayout>
  );
}

