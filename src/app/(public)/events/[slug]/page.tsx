import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import { publicEventDetailText } from "@/constants/ui/public";
import { publicEventCards } from "@/lib/data/public/eventDetails";

type EventDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return publicEventCards.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;

  const event = publicEventCards.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = publicEventCards.filter(
    (item) => item.slug !== event.slug && event.related.includes(item.slug),
  );

  return (
    <PageLayout>
      <PageHeader title={event.title} />

      {/* Hero Section */}
      <section className="mx-auto w-full border">
        <div className="relative h-[52vh] min-h-72 w-full md:h-[68vh] md:min-h-90">
          <Image
            src={event.heroImage}
            alt={event.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-10">
            <div className="max-w-3xl text-white">
              <div className="flex items-center gap-3">
                <span className="bg-cyan-400 px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-black">
                  {event.eyebrow}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/70">
                  {event.code}
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 md:text-base">
                {event.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/events/${event.slug}/register`}
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
            {event.about}
          </p>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-600">
              Focus Areas
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {event.focus.map((item) => (
                <span
                  key={item}
                  className="border border-black/20 bg-neutral-50 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-800   -sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="mx-auto w-full    border-x border-b border-gray-300    bg-neutral-100 px-6 py-12 md:px-10 md:py-16">
        <h2 className="text-[clamp(28px,4.5vw,52px)] font-black uppercase tracking-[-0.03em]">
          What to Expect
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {event.details.map((detail, index) => (
            <article
              key={detail}
              className="border    bg-gradient-to-br from-white to-neutral-50 p-6   -sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600">
                Point {index + 1}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                {detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="mx-auto w-full    border-x border-b border-gray-300    bg-white px-6 py-12 md:px-10 md:py-16">
        <h2 className="text-[clamp(28px,4.5vw,52px)] font-black uppercase tracking-[-0.03em]">
          Gallery
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4">
          {event.gallery.map((image, index) => (
            <div
              key={image}
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

      {/* Related Events Section */}
      <section className="mx-auto w-full border-gray-300    border-x border-b    bg-neutral-100 px-6 py-12 md:px-10 md:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-[clamp(28px,4.5vw,52px)] font-black uppercase tracking-[-0.03em]">
            Related Events
          </h2>
          <Link
            href="/events"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 transition hover:text-black"
          >
            View All Events
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {relatedEvents.length > 0 ? (
            relatedEvents.map((related) => (
              <Link
                key={related.slug}
                href={`/events/${related.slug}`}
                className="group border    bg-white px-5 py-6 transition   -sm hover:  -md hover:border-black/20"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-600">
                  {related.code}
                </p>
                <h3 className="mt-3 text-sm font-bold uppercase leading-tight text-neutral-900 group-hover:text-black">
                  {related.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-600 line-clamp-2">
                  {related.description}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-sm text-neutral-600">
              No related events available.
            </p>
          )}
        </div>
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
              href={`/events/${event.slug}/register`}
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
