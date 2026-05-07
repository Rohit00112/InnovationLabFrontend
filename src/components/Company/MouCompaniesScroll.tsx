'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/util';
import type { CompanyListItem } from '@/components/Company/companyList';
import {
  HTMLMotionProps,
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);
    updateMatch();

    if (media.addEventListener) {
      media.addEventListener('change', updateMatch);
      return () => media.removeEventListener('change', updateMatch);
    }

    media.addListener(updateMatch);
    return () => media.removeListener(updateMatch);
  }, [query]);

  return matches;
}

interface ScrollAnimationContextValue {
  scrollProgress: MotionValue<number>;
}
const ScrollAnimationContext = React.createContext<
  ScrollAnimationContextValue | undefined
>(undefined);

export function useScrollAnimationContext() {
  const context = React.useContext(ScrollAnimationContext);
  if (!context) {
    throw new Error(
      'useScrollAnimationContext must be used within a ScrollAnimationContextProvider',
    );
  }
  return context;
}

export function ScrollAnimation({
  spacerClass,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & { spacerClass?: string }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 400,
    restDelta: 0.001,
  });
  const reducedMotion = useReducedMotion();
  const scrollProgress = reducedMotion ? scrollYProgress : smoothProgress;

  return (
    <ScrollAnimationContext.Provider value={{ scrollProgress }}>
      <div ref={scrollRef} className={cn('relative', className)} {...props}>
        {children}
        <div className={cn('w-full h-96', spacerClass)} />
      </div>
    </ScrollAnimationContext.Provider>
  );
}

export function ScrollTranslateY({
  yRange = [0, 384],
  inputRange = [0, 1],
  style,
  className,
  ...props
}: HTMLMotionProps<'div'> & { yRange?: unknown[]; inputRange?: number[] }) {
  const { scrollProgress } = useScrollAnimationContext();
  const y = useTransform(scrollProgress, inputRange, yRange);
  return (
    <motion.div
      style={{ y, willChange: 'transform', ...style }}
      className={cn('relative origin-top', className)}
      {...props}
    />
  );
}

export function ScrollTranslateX({
  xRange = [0, 100],
  inputRange = [0, 1],
  style,
  className,
  ...props
}: HTMLMotionProps<'div'> & { xRange?: unknown[]; inputRange?: number[] }) {
  const { scrollProgress } = useScrollAnimationContext();
  const x = useTransform(scrollProgress, inputRange, xRange);
  return (
    <motion.div
      style={{ x, willChange: 'transform', ...style }}
      className={cn('relative origin-top', className)}
      {...props}
    />
  );
}

export function ScrollScale({
  scaleRange = [1.2, 1],
  inputRange = [0, 1],
  className,
  style,
  ...props
}: HTMLMotionProps<'div'> & { scaleRange?: unknown[]; inputRange?: number[] }) {
  const { scrollProgress } = useScrollAnimationContext();
  const scale = useTransform(scrollProgress, inputRange, scaleRange);
  return (
    <motion.div
      className={className}
      style={{ scale, willChange: 'transform', ...style }}
      {...props}
    />
  );
}

export function CompanyCard({
  company,
  className,
  ...props
}: React.ComponentProps<'div'> & { company: CompanyListItem }) {
  const cardContent = (
    <>
      <div className="relative w-full flex-1 min-h-0">
        <Image
          src={company.logoUrl}
          alt={company.name}
          width={200}
          height={200}
          className="aspect-square w-full h-full object-cover"
        />
      </div>
      <div className="space-y-1 py-3 px-4 shrink-0">
        <h3 className="text-base font-medium text-black">{company.name}</h3>
        <h4 className="text-sm text-[#515151]">{company.about}</h4>
        <p className="text-xs text-black">{company.contactEmail}</p>
      </div>
    </>
  );

  return (
    <div className={cn('flex flex-col', className)} {...props}>
      {company.websiteUrl ? (
        <a
          href={company.websiteUrl}
          target="_blank"
          rel="noreferrer"
          className="flex h-full flex-col"
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </div>
  );
}

export interface MOUCompaniesScrollProps extends React.ComponentProps<'section'> {
  companies: CompanyListItem[];
  heading?: string;
  highlight?: string;
  highlightClassName?: string;
  cardClassName?: string;
}

export default function MOUCompaniesScroll({
  companies,
  heading = 'MOU Signed',
  highlight = 'Companies',
  highlightClassName = 'text-primary',
  cardClassName = 'min-w-[45vw] md:min-w-[18vw] bg-card border border-[#DFDFDF]',
  className,
  ...props
}: MOUCompaniesScrollProps) {
  const splitIndex = Math.ceil(companies.length / 2);
  const topCompanies = companies.slice(0, splitIndex);
  const bottomCompanies = companies.slice(splitIndex);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const rowInputRange = isSmallScreen ? [0, 0.8] : [0, 0.6];
  const topRowRange = isSmallScreen ? ['-310%', '110%'] : ['-130%', '130%'];
  const bottomRowRange = isSmallScreen ? ['310%', '-310%'] : ['130%', '-130%'];
  const headingInputRange = isSmallScreen ? [0, 0.6] : [0, 0.5];
  const headingScaleRange = isSmallScreen ? [1.25, 1] : [1.4, 1];
  const spacerClassName = isSmallScreen ? 'h-[240vh]' : 'h-[200vh]';

  return (
    <section className={className} {...props}>
      <ScrollAnimation spacerClass={spacerClassName}>
        <div className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center items-center gap-6">

          {/* Top row */}
          <div className="w-full overflow-hidden">
            <ScrollTranslateX
              xRange={topRowRange}
              inputRange={rowInputRange}
              className="origin-bottom flex flex-nowrap gap-4"
            >
              {topCompanies.map((company, index) => (
                <CompanyCard
                  className={cn(cardClassName, 'h-64')}
                  key={`${company.name}-${index}`}
                  company={company}
                />
              ))}
            </ScrollTranslateX>
          </div>

          {/* Center heading */}
          <ScrollScale
            inputRange={headingInputRange}
            scaleRange={headingScaleRange}
            className="w-10/12 flex flex-col justify-center text-center items-center mx-auto origin-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              {heading}{' '}
              <span className={highlightClassName}>{highlight}</span>
            </h2>
          </ScrollScale>

          {/* Bottom row */}
          <div className="w-full overflow-hidden">
            <ScrollTranslateX
              inputRange={rowInputRange}
              xRange={bottomRowRange}
              className="flex flex-nowrap gap-4"
            >
              {bottomCompanies.map((company, index) => (
                <CompanyCard
                  className={cn(cardClassName, 'h-64')}
                  key={`${company.name}-${index}-bottom`}
                  company={company}
                />
              ))}
            </ScrollTranslateX>
          </div>

        </div>
      </ScrollAnimation>
    </section>
  );
}