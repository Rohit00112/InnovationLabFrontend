import { notFound } from "next/navigation";
import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import EventRegistrationForm from "@/components/Events/EventRegistrationForm";
import { publicEventCards } from "@/lib/data/public/eventDetails";
import Image from "next/image";

type EventRegisterPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return publicEventCards.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventRegisterPageProps) {
  const { slug } = await params;
  const event = publicEventCards.find((item) => item.slug === slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `Register for ${event.title}`,
    description: `Register to attend ${event.title} at Innovation Lab`,
  };
}

export default async function EventRegisterPage({
  params,
}: EventRegisterPageProps) {
  const { slug } = await params;
  const event = publicEventCards.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <PageLayout>
      <PageHeader title={`Register for ${event.title}`} />

      <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <EventRegistrationForm
              eventId={event.id}
              eventTitle={event.title}
            />
          </div>

          {/* Event Details Sidebar */}
          <aside className="flex flex-col gap-6">
            <div className=" -lg border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                Event Details
              </h3>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-neutral-600">Date</p>
                  <p className="font-medium text-neutral-900">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-600">Time</p>
                  <p className="font-medium text-neutral-900">{event.time}</p>
                </div>

                <div>
                  <p className="text-neutral-600">Location</p>
                  <p className="font-medium text-neutral-900">
                    {event.location}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-600">Type</p>
                  <p className="font-medium text-neutral-900">{event.type}</p>
                </div>

                {event.capacity && (
                  <div>
                    <p className="text-neutral-600">Capacity</p>
                    <p className="font-medium text-neutral-900">
                      {event.capacity} attendees
                    </p>
                  </div>
                )}
              </div>
            </div>

            {event.description && (
              <div className=" -lg border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="mb-3 font-semibold text-neutral-900">
                  Event Payment
                </h3>
                <Image
                  width={400}
                  height={400}
                  alt="ad"
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                  }
                ></Image>
              </div>
            )}

            {event.requirements && event.requirements.length > 0 && (
              <div className=" -lg border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="mb-3 font-semibold text-neutral-900">
                  Requirements
                </h3>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {event.requirements.map((req, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 flex-shrink-0">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
