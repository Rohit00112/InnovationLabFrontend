import Button from "./primitives/Button";

export default function Hero() {
  return (
    <header className="relative py-16 px-5 text-center overflow-hidden bg-white">
      {/* Welcome Tag */}
      <div className="flex items-center justify-center gap-5 text-[14px] tracking-[4px] font-bold uppercase mb-4">
        <span className="w-4 h-4 var(--color-iblue) relative "></span>
        WELCOME TO
        <span className="w-4 h-4 var(--color-iblue) relative "></span>
      </div>

      <h1 className="text-[clamp(40px,8vw,90px)] font-black leading-none tracking-tighter uppercase mb-8 text-gap-2 ">
        INN<span className="text-iblue">O</span>VATI
        <span className="text-iblue">O</span>N LAB
      </h1>

      <div className="flex justify-center gap-4 relative z-10">
        <Button variant="primary">Send a Message</Button>
        <Button variant="outline">Send a Message</Button>
      </div>

      {/* Decorative Bars (Left) */}
      <div className="absolute left-7 bottom-0 flex items-end gap-1  lg:flex">
        <div className="w-5 h-6 var(--color-iblue) opacity-50"></div>
        <div className="w-5 h-10 var(--color-iblue) opacity-80"></div>
        <div className="w-5 h-16 var(--color-iblue)"></div>
      </div>

      {/* Decorative SVG (Right) */}
      <div className="absolute right-7 bottom-0 w-24 hidden lg:block">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 100 C0 44.77 44.77 0 100 0 L100 100 Z" fill="black" />
          <circle cx="23" cy="80" r="20" fill="#22d3ee" />
        </svg>
      </div>
    </header>
  );
}
