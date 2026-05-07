import { notFound } from "next/navigation";
import PageLayout from "@/components/primitives/PageLayout";
import PageHeader from "@/components/primitives/PageHeader";
import EventRegistrationForm from "@/components/Events/EventRegistrationForm";
import Image from "next/image";
import { bffApi } from "@/lib/services/bff-client";

type EventRegisterPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: EventRegisterPageProps) {
  const { id } = await params;
  
  let event;
  try {
    const response = await bffApi.events.getById(id);
    event = response.data;
  } catch (error) {
    return { title: "Event Not Found" };
  }

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
  const { id } = await params;
  
  let event;
  try {
    const response = await bffApi.events.getById(id);
    event = response.data;
  } catch (error) {
    notFound();
  }

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
              eventId={event.id || ""}
              eventTitle={event.title || ""}
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
                    {event.startTime ? new Date(event.startTime).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) : "TBD"}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-600">Time</p>
                  <p className="font-medium text-neutral-900">
                    {event.startTime ? new Date(event.startTime).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    }) : "TBD"}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-600">Location</p>
                  <p className="font-medium text-neutral-900">
                    {event.location || "TBA"}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-600">Type</p>
                  <p className="font-medium text-neutral-900">
                    {event.seriesName || "Special Event"}
                  </p>
                </div>
              </div>
            </div>

            <div className=" -lg border border-neutral-200 bg-neutral-50 p-6 text-center">
              <h3 className="mb-3 font-semibold text-neutral-900">
                Event Payment
              </h3>
              <div className="flex justify-center">
                <Image
                  width={200}
                  height={200}
                  alt="QR Code"
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                  className="bg-white p-2"
                />
              </div>
              <p className="mt-2 text-xs text-neutral-500">Scan to pay registration fee (if applicable)</p>
            </div>

            {event.highlights && event.highlights.length > 0 && (
              <div className=" -lg border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="mb-3 font-semibold text-neutral-900">
                  Highlights
                </h3>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {event.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 flex-shrink-0">•</span>
                      <span>{highlight}</span>
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

