import PageHeader from "@/components/primitives/PageHeader";
import PageLayout from "@/components/primitives/PageLayout";
import { getEventById } from "@/lib/services/domain/events";
import JobFairCompanies from "../../../../components/Events/JobFairCompanies";
import EventAgendaSection from "../../../../components/Events/EventAgendaSection";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type EventDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;

  let event = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //let agendsaItems: any = [];

  try {
    event = await getEventById(id);
  } catch (error) {
    console.error(error);
    notFound();
  }

  if (!event) {
    notFound();
  }

  // Map highlights to focus areas and details
  const focusAreas = event.highlights || [];
  const isJobFairEvent =
    (event.title ?? "").replace(/\s+/g, "").toLowerCase() === "jobfair";

  const dummyGallery = [
    event.coverImageUrl ||
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  ];

  return (
    <PageLayout>
      <PageHeader title={event.title || "Event Details"} />

      {/* Hero Section */}
      <section className="mx-auto w-full border">
        <div className="relative h-[52vh] min-h-72 w-full md:h-[68vh] md:min-h-90">
          <Image
            src={event.coverImageUrl || dummyGallery[0]}
            alt={event.title || "Event Image"}
            fill
            priority
            className="aspect-square object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/20" />

          <div className="absolute inset-x-0 bottom-0 p-4 md:p-10">
            <div className="max-w-3xl text-white">
              <div className="flex items-center gap-3">
                <span className="bg-cyan-400 px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-black">
                  {event.seriesName || "Special Event"}
                </span>

              </div>


              <div className="mt-6 flex flex-wrap gap-3">
                {event.isRegistrationOpen ? (
                  <Link
                    href={`/events/${event.id}/register`}
                    className="group relative inline-flex font-medium"
                  >
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-cyan-400 transition-all duration-100 ease-out" />

                    <span className="relative z-10 block -translate-y-0.5 transform border border-white/60 bg-white px-5 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-black transition-all duration-100 ease-out group-active:translate-y-0 hover:border-cyan-400 hover:bg-cyan-400">
                      Register Now
                    </span>
                  </Link>
                ) : (
                  <Link
                    href="/contact"
                    className="group relative inline-flex font-medium"
                  >
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-cyan-400 transition-all duration-100 ease-out" />

                    <span className="relative z-10 block -translate-y-0.5 transform border border-white/60 bg-white px-5 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-black transition-all duration-100 ease-out group-active:translate-y-0 hover:border-cyan-400 hover:bg-cyan-400">
                      Contact Us
                    </span>
                  </Link>
                )}

                <Link
                  href="/events"
                  className="inline-flex border border-white/40 bg-transparent px-5 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-white transition hover:bg-white/10"
                >
                  Back to Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="mx-auto grid w-full border-x border-b border-gray-300 bg-white px-6 py-12 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-16">
        <div>
          <h2 className="text-[clamp(28px,4.5vw,52px)] font-black uppercase tracking-[-0.03em]">
            Overview
          </h2>

          <div className="mt-3 h-1 w-24 bg-black" />
        </div>

        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
            {event.description}
          </p>

          {focusAreas.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-600">
                Highlights
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {focusAreas.map((item: string) => (
                  <span
                    key={item}
                    className="border border-black/20 bg-neutral-50 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Details Section */}
      <section className="mx-auto w-full border-x border-b border-gray-300 bg-neutral-100 px-6 py-12 md:px-10 md:py-16">
        <h2 className="text-[clamp(28px,4.5vw,52px)] font-black uppercase tracking-[-0.03em]">
          Event Information
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="border bg-linear-to-br from-white to-neutral-50 p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600">
              Location
            </p>

            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              {event.location || "To be announced"}
            </p>
          </article>

          <article className="border bg-linear-to-br from-white to-neutral-50 p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600">
              Event Time
            </p>

            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              {event.startTime
                ? new Date(event.startTime).toLocaleString("en-US", {
                    timeZone: "Asia/Kathmandu",
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "TBD"}
              {event.endTime && (
                <>
                  {" - "}
                  {new Date(event.endTime).toLocaleTimeString("en-US", {
                    timeZone: "Asia/Kathmandu",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </>
              )}
            </p>
          </article>

          {event.registrationEnd && (
            <article className="border bg-linear-to-br from-white to-neutral-50 p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600">
                Registration
              </p>

              <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                Ends on{" "}
                {new Date(event.registrationEnd).toLocaleDateString("en-US", {
                  timeZone: "Asia/Kathmandu",
                })}
              </p>
            </article>
          )}
        </div>
      </section>

      {/* Gallery Section */}
     
      {/* Event Agenda Section */}
      {event.id && <EventAgendaSection eventId={event.id} />}

      {/* Companies Attending the Event */}
      {isJobFairEvent && (
        <JobFairCompanies />
      )}
      {/* Related Events Section */}
      <section className="mx-auto w-full border-x border-b border-gray-300 bg-neutral-100 px-6 py-12 text-center md:px-10 md:py-16">
        <Link
          href="/events"
          className="inline-flex border border-black px-8 py-4 text-sm font-bold uppercase tracking-widest transition hover:bg-black hover:text-white"
        >
          View All Events
        </Link>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full border-x border-b border-gray-300 bg-linear-to-r from-neutral-900 to-neutral-800 px-6 py-12 md:px-10 md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(28px,4.5vw,52px)] font-black uppercase tracking-[-0.03em] text-white">
            Ready to Participate?
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
            Secure your spot at {event.title} and join fellow innovators,
            builders, and thinkers shaping the future.
          </p>

          <div className="mt-6">
            <Link
              href={`/events/${event.id}/register`}
              className="group relative inline-flex font-medium"
            >
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-cyan-400 transition-all duration-100 ease-out" />

              <span className="relative z-10 block -translate-y-0.5 transform border border-cyan-400 bg-cyan-400 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.22em] text-black transition-all duration-100 ease-out group-active:translate-y-0 hover:border-white hover:bg-white">
                Register for Event
              </span>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
