// component.tsx
"use client";
import { ReactLenis } from "lenis/react";
import React, { forwardRef, useEffect, useState } from "react";
import CompanyCard from "./companyCard";
import type { CompanyListItem } from "./companyList";

interface CompanyCardListProps {
  companies: CompanyListItem[];
}

const Component = forwardRef<HTMLElement, CompanyCardListProps>(
  ({ companies }, ref) => {
    const [navHeight, setNavHeight] = useState(0);

    useEffect(() => {
      const updateNavHeight = () => {
        const navElement = document.querySelector("nav");
        if (navElement) {
          setNavHeight(navElement.offsetHeight);
        }
      };

      updateNavHeight();
      window.addEventListener("resize", updateNavHeight);
      return () => window.removeEventListener("resize", updateNavHeight);
    }, []);

    // Distribute companies to ensure exactly 2 end up in the middle column
    const total = companies.length;
    const middleCount = Math.min(2, total);
    const sideCount = Math.max(0, total - middleCount);
    const leftCount = Math.ceil(sideCount / 2);
    const rightCount = sideCount - leftCount;

    const col1 = companies.slice(0, leftCount);
    const col2 = companies.slice(leftCount, leftCount + middleCount);
    const col3 = companies.slice(leftCount + middleCount, total);

    const getCardBgClass = (index: number) => {
      const patternIndex = index % 4;

      if (patternIndex === 0) {
        return "bg-[#FFFFFF] sm:bg-[#FFFFFF] lg:bg-[#FFFFFF]";
      }

      if (patternIndex === 1) {
        return "bg-[#F3F3F3] sm:bg-[#F3F3F3] lg:bg-[#F3F3F3]";
      }

      if (patternIndex === 2) {
        return "bg-[#FFFFFF] sm:bg-[#F3F3F3] lg:bg-[#FFFFFF]";
      }
      return "bg-[#F3F3F3] sm:bg-[#FFFFFF] lg:bg-[#F3F3F3]";
    };

    return (
      <ReactLenis root>
        <main className="bg-white" ref={ref}>
          <section className="text-black w-full bg-transparent px-4 py-8">
            <div className="grid grid-cols-12 gap-2 border border-[#DFDFDF]">
              <div className="grid gap-0 col-span-4">
                {col1.map((company, index) => {
                  const trueIndex = index;
                  return (
                    <div key={trueIndex} className="w-full">
                      <CompanyCard
                        topText=""
                        logoUrl={company.logoUrl}
                        name={company.name}
                        about={company.about}
                        numberOfInterns={company.numberOfInterns}
                        className={`h-full ${getCardBgClass(trueIndex)}`}
                        priority={0}
                        isMouSigned={false}
                        contactEmail=""
                        websiteUrl="#"
                      />
                    </div>
                  );
                })}
              </div>
              <div
                className={`sticky w-full col-span-4 gap-0 grid grid-rows-${Math.max(col2.length, 1)}`}
                style={{
                  top: `${navHeight}px`,
                  height: `calc(100vh - ${navHeight}px)`,
                }}
              >
                {col2.map((company, index) => {
                  const trueIndex = leftCount + index;
                  return (
                    <div key={trueIndex} className="w-full h-full">
                      <CompanyCard
                        topText=""
                        logoUrl={company.logoUrl}
                        name={company.name}
                        about={company.about}
                        numberOfInterns={company.numberOfInterns}
                        compact={true}
                        className={`h-full border-t border-[#DFDFDF] ${getCardBgClass(trueIndex)}`}
                        priority={0}
                        isMouSigned={false}
                        contactEmail=""
                        websiteUrl="#"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="grid gap-0 col-span-4">
                {col3.map((company, index) => {
                  const trueIndex = leftCount + middleCount + index;
                  return (
                    <div key={trueIndex} className="w-full">
                      <CompanyCard
                        topText=""
                        logoUrl={company.logoUrl}
                        name={company.name}
                        about={company.about}
                        numberOfInterns={company.numberOfInterns}
                        className={`h-full ${getCardBgClass(trueIndex)}`}
                        priority={0}
                        isMouSigned={false}
                        contactEmail=""
                        websiteUrl="#"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </ReactLenis>
    );
  },
);

Component.displayName = "Component";

export default Component;
