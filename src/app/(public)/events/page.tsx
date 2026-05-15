// ...existing code...
import PageLayout from "@/components/primitives/PageLayout";
import { EmblaCarousel } from "@/components/Events/Carousel";
import PastEventsSection from "@/components/LearnMoreSection";
import LatestEventsSection from "@/components/Events/LatestEventsSection";
import { listEvents } from "@/lib/services/domain/events";
import { separateEvents } from "@/lib/utils/events";

export default async function EventsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let allEvents: any = [];
  try {
    allEvents = await listEvents();
  } catch (err) {
    console.error("Failed to load events", err);
  }

  const { upcomingEvents } = separateEvents(allEvents);

  return (
    <PageLayout>
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
