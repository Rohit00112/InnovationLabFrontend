"use client";

import Image from "next/image";

type Brand = {
  name: string;
  image: string;
};

type BrandScrollerProps = {
  brands: Brand[];
  direction?: "left" | "right";
  speed?: number;
};

const BrandScroller = ({
  brands,
  direction = "left",
  speed = 40,
}: BrandScrollerProps) => {
  const animationClass =
    direction === "left" ? "animate-marquee" : "animate-marquee-reverse";

  return (
    <div
      className="group flex overflow-hidden py-2 flex-row max-w-full"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 flex-row justify-around ${animationClass}`}
            style={{
              gap: "var(--gap)",
              animationDuration: `${speed}s`,
            }}
          >
            {brands.map((brand, index) => (
              <div key={index} className="flex items-center w-32 gap-3">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                <p className="text-lg font-semibold opacity-80">{brand.name}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

const brands = [
  {
    name: "Spotify",
    image: "/brands/spotify.png",
  },
  {
    name: "YouTube",
    image: "/brands/youtube.png",
  },
  {
    name: "Amazon",
    image: "/brands/amazon.png",
  },
  {
    name: "Google",
    image: "/brands/google.png",
  },
];

export default function CompanyScroll() {
  return (
    <div className="space-y-6">
      <BrandScroller brands={brands} direction="left" />
      <BrandScroller brands={brands} direction="right" />
    </div>
  );
}
