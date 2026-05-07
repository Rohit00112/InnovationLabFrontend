"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import PageLayout from "./primitives/PageLayout";

const footerNavigation = {
  explore: ["About", "Communities", "Events", "Contact"],
  lab: ["Programs", "Projects", "Research", "Archive"],
  connect: ["Instagram", "Facebook", "GitHub"],
};

const footerLinkTargets: Record<string, string> = {
  Facebook: "https://www.facebook.com/profile.php?id=61570739730422",
  GitHub: "https://github.com/InnovationLabAtIIC",
  Instagram: "https://www.instagram.com/innovationlab.iic/",
};

export default function Footer() {
  return (
    <PageLayout>
      <footer className="border-t border-gray-300 bg-white text-neutral-900">
        <div className="line-bg w-full md:h-16 h-6"></div>
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 gap-0 border border-gray-300 bg-white lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-b border-gray-300 p-6 md:border-b-0 md:border-r md:p-8 lg:p-10">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-primary"
              >
                Innovation Lab
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="mt-4 max-w-[12ch] text-[clamp(28px,5vw,64px)] font-black uppercase leading-[0.92] tracking-[-0.08em] text-neutral-900"
              >
                Keep building with us.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 }}
                className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base"
              >
                A simple, focused system for ideas, communities, events, and
                collaboration. Join the next cycle when you are ready to ship.
              </motion.p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-neutral-900 bg-neutral-900 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.28em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:var(--color-primary)"
                >
                  Contact the lab
                </Link>
                <Link
                  href="/communities"
                  className="inline-flex items-center justify-center border border-gray-300 bg-white px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.28em] text-neutral-900 transition-transform duration-300 hover:-translate-y-0.5 hover:border-neutral-900"
                >
                  View communities
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-0 border-l border-gray-300 md:grid-cols-3">
              {Object.entries(footerNavigation).map(
                ([category, links], idx) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * idx }}
                    className={`border-b border-gray-300 p-6 md:border-b-0 md:p-6 ${idx !== 0 ? "md:border-l md:border-gray-300" : ""}`}
                  >
                    <h4 className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-neutral-500">
                      {category}
                    </h4>
                    <ul className="mt-5 flex flex-col gap-3">
                      {links.map((link) => (
                        <li key={link}>
                          <Link
                            href={footerLinkTargets[link] ?? "#"}
                            target={footerLinkTargets[link] ? "_blank" : undefined}
                            rel={footerLinkTargets[link] ? "noreferrer" : undefined}
                            className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-neutral-900 transition-colors hover:text-primary"
                          >
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ),
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 border border-gray-300 px-6 py-5 text-[11px] font-extrabold uppercase tracking-[0.24em] text-neutral-500 md:flex-row md:items-center md:justify-between md:px-8 md:py-6">
            <span>Innovation Lab © 2026</span>
            <span>Built for communities that move ideas forward.</span>
          </div>
        </div>
      </footer>
    </PageLayout>
  );
}
