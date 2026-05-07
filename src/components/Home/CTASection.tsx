import { size } from "zod";
import Button from "@/components/primitives/Button";

const barHeights = [
  "h-[64%]",
  "h-[88%]",
  "h-[22%]",
  "h-[55%]",
  "h-[44%]",
  "h-[66%]",
  "h-[77%]",
  "h-[33%]",
  "h-[11%]",
  "h-[99%]",
];

export function CTASection() {
  return (
    <section className="relative w-full min-h-screen bg-linear-to-b from-white to-gray-50 overflow-hidden flex flex-col items-center justify-center px-4 py-24 md:py-32">
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-[clamp(3rem,9vw,7rem)] font-black uppercase tracking-[-0.08em] text-neutral-900">
          <span className="text-primary">C</span>ONNECT WITH US
        </h2>
        <p className="mx-auto max-w-xl text-[clamp(1rem,1.25vw,1.25rem)] leading-relaxed text-neutral-600">
          Build meaningful collaborations, share your ideas, and become part of
          a growing innovation community.
        </p>
        <Button href="/contact">Reach Us</Button>
      </div>
      <div>
        <div className="absolute bottom-0 left-0 right-0 flex h-7/12 flex-row items-end justify-end overflow-hidden md:h-8/12">
          {barHeights.map((heightClass, i) => (
            <div
              key={i}
              style={{ height: `${size}%` }}
              className="bg-linear-to-t from-cyan-500 to-white mb-1 flex flex-1"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
