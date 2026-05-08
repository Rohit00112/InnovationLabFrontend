import PageLayout from "@/components/primitives/PageLayout";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageLayout>
      <section className="w-full border border-gray-300 bg-white px-6 py-10 text-center md:px-10 md:py-14">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-primary">
          404
        </p>
        <h1 className="mt-4 text-[clamp(2.5rem,10vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-neutral-900">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-600 md:text-base">
          The page you&apos;re looking for does not exist, moved, or was typed
          incorrectly.
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-neutral-900 bg-neutral-900 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white transition hover:bg-primary hover:text-black"
          >
            Go home
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center justify-center border border-gray-300 bg-white px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-neutral-900 transition hover:border-neutral-900"
          >
            View events
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
