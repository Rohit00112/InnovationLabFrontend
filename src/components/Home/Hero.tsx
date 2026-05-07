import { useMemo } from "react";
import Marquee from "react-fast-marquee";
import Carousel from "../Carousel";
import Button from "../primitives/Button";
import { GridWithPlus } from "./GridWithPlus";
import LatestNewsSection from "./LatestNewsSection";

export default function Hero() {
  const rows = 8;
  const cols = 24;

  const gridColors = useMemo(() => {
    return Array.from({ length: rows * cols }, () => { });
  }, []);

  return (
    <>
      <div className="w-full h-auto relative overflow-hidden">
        <div className="grid w-full h-full overflow-hidden grid-cols-[repeat(12,1fr)] md:grid-cols-[repeat(24,1fr)] grid-rows-[repeat(4,1fr)] md:grid-rows-[repeat(8,1fr)]">
          {gridColors.map((color, i) => (
            <div
              key={i}
              className="w-full h-full aspect-square bg-white border border-gray-100 hover:bg-gray-50 duration-10"
            />
          ))}
        </div>

        <div className="w-full h-full absolute top-0 flex flex-col">
          <div className="px-3 pt-4 sm:pt-6 lg:pt-8">
            <h1 className="whitespace-nowrap text-[clamp(1.45rem,9.2vw,4.4rem)] sm:text-[clamp(2rem,9vw,5rem)] lg:text-[clamp(5.1rem,8vw,10rem)] font-bold leading-[0.86] tracking-[-0.08em]">
              INN<span className="text-primary">O</span>VATI<span className="text-primary">O</span>N LABS
            </h1>
          </div>

          <div className="mx-3 mt-3 sm:mt-4">
            <h2 className="max-w-2xl text-justify text-[clamp(1rem,1.2vw,1.25rem)] leading-relaxed text-neutral-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </h2>
          </div>

          <div className="mx-3 mt-8 flex flex-wrap gap-3 sm:gap-5">
            <Button>Explore the Lab</Button>
            <Button variant="outline">VIEW EVENTS</Button>
          </div>


        </div>
      </div>

      <Carousel />

      <div className="line-bg w-full md:h-16 h-6"></div>

      <div className="w-full h-auto">
        <div className="flex items-center justify-center border-t border-gray-300 bg-white px-3 py-4 sm:py-5">
          <h2 className="text-[clamp(2rem,4vw,4rem)] font-semibold">
            <span className="text-primary">O</span>UR PARTNERS
          </h2>
        </div>

        <Marquee speed={42} gradient={false} autoFill pauseOnHover={true}>
          <GridWithPlus rows={1} />
        </Marquee>

        <Marquee speed={42} gradient={false} autoFill pauseOnHover={true} direction="right">
          <GridWithPlus rows={1} />
        </Marquee>
      </div>

      <LatestNewsSection />
    </>
  );
}
