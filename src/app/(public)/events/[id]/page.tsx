import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import { bffApi } from "@/lib/services/bff-client";

type EventDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;

  let eventData;
  try {
    const response = await bffApi.events.getById(id);
    eventData = response.data;
  } catch (error) {
    notFound();
  }

  if (!eventData) {
    notFound();
  }

  const event = eventData;

  // Map highlights to focus areas and details
  const focusAreas = event.highlights || [];
  const dummyGallery = [
    event.coverImageUrl || "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
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
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-10">
            <div className="max-w-3xl text-white">
              <div className="flex items-center gap-3">
                <span className="bg-cyan-400 px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-black">
                  {event.seriesName || "Special Event"}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/70">
                  {event.id?.slice(0, 8)}
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 md:text-base">
                {event.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/events/${event.id}/register`}
                  className="relative inline-flex group font-medium"
                >
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-cyan-400 transition-all duration-100 ease-out" />
                  <span className="relative z-10 block px-5 py-2 border border-white/60 bg-white text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-black transform transition-all duration-100 ease-out -translate-y-0.5 group-active:translate-y-0 hover:bg-cyan-400 hover:border-cyan-400">
                    Register Now
                  </span>
                </Link>
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
      <section className="mx-auto grid w-full border-x border-b border-gray-300    bg-white px-6 py-12 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-16">
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
                {focusAreas.map((item) => (
                  <span
                    key={item}
                    className="border border-black/20 bg-neutral-50 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-800   -sm"
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
      <section className="mx-auto w-full    border-x border-b border-gray-300    bg-neutral-100 px-6 py-12 md:px-10 md:py-16">
        <h2 className="text-[clamp(28px,4.5vw,52px)] font-black uppercase tracking-[-0.03em]">
          Event Information
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="border    bg-gradient-to-br from-white to-neutral-50 p-6   -sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600">
              Location
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              {event.location || "To be announced"}
            </p>
          </article>
          <article className="border    bg-gradient-to-br from-white to-neutral-50 p-6   -sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600">
              Date & Time
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              {event.startTime ? new Date(event.startTime).toLocaleString() : "TBD"}
            </p>
          </article>
          <article className="border    bg-gradient-to-br from-white to-neutral-50 p-6   -sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600">
              Registration
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              Ends on {event.registrationEnd ? new Date(event.registrationEnd).toLocaleDateString() : "TBD"}
            </p>
          </article>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="mx-auto w-full    border-x border-b border-gray-300    bg-white px-6 py-12 md:px-10 md:py-16">
        <h2 className="text-[clamp(28px,4.5vw,52px)] font-black uppercase tracking-[-0.03em]">
          Gallery
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4">
          {dummyGallery.map((image, index) => (
            <div
              key={image + index}
              className={[
                "relative overflow-hidden border      -sm",
                index === 0
                  ? "col-span-2 row-span-2 min-h-48 md:min-h-80"
                  : "min-h-32 md:min-h-40",
              ].join(" ")}
            >
              <Image
                src={image}
                alt={`${event.title} gallery ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Related Events Section - Hidden for now or can show general events */}
      <section className="mx-auto w-full border-gray-300    border-x border-b    bg-neutral-100 px-6 py-12 md:px-10 md:py-16 text-center">
        <Link
          href="/events"
          className="inline-flex border border-black px-8 py-4 text-sm font-bold uppercase tracking-widest transition hover:bg-black hover:text-white"
        >
          View All Events
        </Link>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full  border-gray-300   border-x border-b    bg-gradient-to-r from-neutral-900 to-neutral-800 px-6 py-12 md:px-10 md:py-16">
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
              className="relative inline-flex group font-medium"
            >
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-cyan-400 transition-all duration-100 ease-out" />
              <span className="relative z-10 block px-6 py-3 border border-cyan-400 bg-cyan-400 text-sm font-extrabold uppercase tracking-[0.22em] text-black transform transition-all duration-100 ease-out -translate-y-0.5 group-active:translate-y-0 hover:bg-white hover:border-white">
                Register for Event
              </span>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

