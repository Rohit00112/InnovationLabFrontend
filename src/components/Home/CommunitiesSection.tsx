import Link from "next/link";
import { motion } from "framer-motion";
import { communityCards } from "@/lib/data/communities";

export function CommunitiesSection() {
  return (
    <section className="border-t border-gray-300 bg-white">
      <div className="line-bg w-full md:h-16 h-6"></div>
      <div className="mx-auto w-full px-4 pt-10 pb-16 md:px-8">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="">
            <h2 className="mt-3 text-[clamp(34px,6vw,72px)] font-black uppercase leading-[0.92] tracking-[-0.08em] text-neutral-900">
              C<span className="text-primary">O</span>MMUNITIES
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {communityCards.map((community, index) => (
            <Link
              key={community.slug}
              href="/communities"
              className="group overflow-hidden border border-gray-300 bg-white"
            >
              <div className="relative h-72 overflow-hidden">
                <motion.img
                  src={community.image}
                  alt={community.title}
                  initial={false}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full w-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex h-11 w-11 items-center justify-center border border-white/35 bg-white/12 text-xs font-extrabold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                  {index + 1}
                </div>
              </div>
              <div className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-primary">
                    {community.id}
                  </p>
                  <h3 className="mt-3 text-3xl font-black uppercase tracking-tighter text-neutral-900">
                    {community.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
                    {community.description}
                  </p>
                </div>
                <span className="text-2xl font-light text-neutral-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="line-bg w-full md:h-16 h-6"></div>
    </section>
  );
}
