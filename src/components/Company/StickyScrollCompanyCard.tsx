// component.tsx
'use client';
import { ReactLenis } from 'lenis/react';
import React, { forwardRef, useEffect, useState } from 'react';
import CompanyCard from './companyCard';
import type { CompanyListItem } from './companyList';

interface CompanyCardListProps {
  companies: CompanyListItem[];
}

const Component = forwardRef<HTMLElement, CompanyCardListProps>(({ companies }, ref) => {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const updateNavHeight = () => {
      const navElement = document.querySelector('nav');
      if (navElement) {
        setNavHeight(navElement.offsetHeight);
      }
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
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
      <main className='bg-white' ref={ref}>
        <section className='w-full bg-transparent px-4 py-8 text-black'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-0 border border-[#DFDFDF]'>
            {/* Column 1 */}
            <div className='lg:col-span-4 grid gap-0'>
              {col1.map((company, index) => (
                <CompanyCard
                  key={`col1-${index}`}
                  {...company}
                  topText=""
                  className={`h-full ${getCardBgClass(index)}`}
                />
              ))}
            </div>

            {/* Column 2 - Sticky on Desktop */}
            <div 
              className='lg:col-span-4 lg:sticky lg:top-0 lg:h-screen grid gap-0 overflow-hidden'
              style={{
                top: `calc(${navHeight}px + 0px)`,
                height: `calc(100vh - ${navHeight}px)`
              }}
            >
              {col2.map((company, index) => (
                <CompanyCard
                  key={`col2-${index}`}
                  {...company}
                  topText=""
                  compact={true}
                  className={`h-full border-t lg:border-t-0 lg:border-x border-[#DFDFDF] ${getCardBgClass(leftCount + index)}`}
                />
              ))}
            </div>

            {/* Column 3 */}
            <div className='lg:col-span-4 grid gap-0 md:col-span-2 lg:md:col-span-4'>
              {col3.map((company, index) => (
                <CompanyCard
                  key={`col3-${index}`}
                  {...company}
                  topText=""
                  className={`h-full border-t lg:border-t-0 border-[#DFDFDF] ${getCardBgClass(leftCount + middleCount + index)}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
});

Component.displayName = 'Component';

export default Component;