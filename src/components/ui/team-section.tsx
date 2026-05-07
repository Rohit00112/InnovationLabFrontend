'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/util';
import {
  HTMLMotionProps,
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

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

export interface TeamMember {
  avatar: string;
  name: string;
  role: string;
}

export function TeamCard({
  member,
  className,
  ...props
}: React.ComponentProps<'div'> & { member: TeamMember }) {
  return (
    <div className={cn('flex flex-col', className)} {...props}>
      <div className="relative w-full flex-1 min-h-0">
        <Image
          src={member.avatar}
          alt={member.name}
          width={200}
          height={200}
          className="aspect-square w-full h-full object-cover"
        />
      </div>
      <div className="space-y-1 py-3 px-4 shrink-0">
        <h3 className="text-base font-medium">{member.name}</h3>
        <h4 className="text-sm">{member.role}</h4>
      </div>
    </div>
  );
}

export interface TeamSectionProps extends React.ComponentProps<'section'> {
  members: TeamMember[];
  heading?: string;
  highlight?: string;
  highlightClassName?: string;
  cardClassName?: string;
}

export default function TeamSection({
  members,
  heading = 'MOU Signed',
  highlight = 'Companies',
  highlightClassName = 'text-primary',
  cardClassName = 'min-w-[40vw] md:min-w-[16vw] bg-card border',
  className,
  ...props
}: TeamSectionProps) {
  return (
    <section className={className} {...props}>
      <ScrollAnimation spacerClass="h-[200vh]">  {/* ← extra scroll room */}
        <div className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center items-center gap-6">

          {/* Top row */}
          <div className="w-full overflow-hidden">
            <ScrollTranslateX
              xRange={['-120%', '0%']}
              inputRange={[0, 0.6]}
              className="origin-bottom flex flex-nowrap gap-4"
            >
              {members.map((member, index) => (
                <TeamCard
                  className={cn(cardClassName, 'h-56')}
                  key={`${member.name}-${index}`}
                  member={member}
                />
              ))}
            </ScrollTranslateX>
          </div>

          {/* Center heading */}
          <ScrollScale
            inputRange={[0, 0.5]}
            scaleRange={[1.4, 1]}
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
              inputRange={[0, 0.6]}
              xRange={['120%', '-50%']}
              className="flex flex-nowrap gap-4"
            >
              {members.map((member, index) => (
                <TeamCard
                  className={cn(cardClassName, 'h-56')}
                  key={`${member.name}-${index}-bottom`}
                  member={member}
                />
              ))}
            </ScrollTranslateX>
          </div>

        </div>
      </ScrollAnimation>
    </section>
  );
}