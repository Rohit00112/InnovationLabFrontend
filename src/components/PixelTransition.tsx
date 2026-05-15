"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

interface PixelTransitionProps {
  firstContent: React.ReactNode | string;
  secondContent: React.ReactNode | string;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  once?: boolean;
  interactive?: boolean;
  className?: string;
  aspectClass?: string;
}

type PixelHandle = {
  cover: () => Promise<void>;
  reveal: () => Promise<void>;
};

const PixelTransition = React.forwardRef<PixelHandle, PixelTransitionProps>(
  (
    {
      firstContent,
      secondContent,
      gridSize = 24,
      pixelColor = "currentColor",
      animationStepDuration = 0.2,
      once = true,
      interactive = true,
      aspectClass = "aspect-square",
      className = "",
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const pixelGridRef = useRef<HTMLDivElement | null>(null);
    const activeRef = useRef<HTMLDivElement | null>(null);
    const delayedCallRef = useRef<gsap.core.Tween | null>(null);

    const [isActive, setIsActive] = useState(false);

    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches);

    useEffect(() => {
      const pixelGridEl = pixelGridRef.current;
      if (!pixelGridEl) return;

      pixelGridEl.innerHTML = "";

      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const pixel = document.createElement("div");
          pixel.classList.add(
            "pixelated-image-card__pixel",
            "absolute",
            "hidden",
            "aspect-square",
          );
          pixel.style.backgroundColor = "#00EAED";

          const size = 100 / gridSize;
          pixel.style.width = `${size}%`;
          pixel.style.height = `${size}%`;
          pixel.style.left = `${col * size}%`;
          pixel.style.top = `${row * size}%`;

          pixelGridEl.appendChild(pixel);
        }
      }
    }, [gridSize, pixelColor]);

    const animatePixels = (activate: boolean): void => {
      setIsActive(activate);
      if (containerRef.current) {
        containerRef.current.style.pointerEvents = activate ? "auto" : "none";
      }

      const pixelGridEl = pixelGridRef.current;
      const activeEl = activeRef.current;
      if (!pixelGridEl || !activeEl) return;

      const pixels = pixelGridEl.querySelectorAll<HTMLDivElement>(
        ".pixelated-image-card__pixel",
      );

      if (!pixels.length) return;

      gsap.killTweensOf(pixels);

      if (delayedCallRef.current) {
        delayedCallRef.current.kill();
      }

      gsap.set(pixels, { display: "none" });

      const totalPixels = pixels.length;
      const staggerDuration = animationStepDuration / totalPixels;

      gsap.to(pixels, {
        display: "block",
        duration: 0,
        stagger: {
          each: staggerDuration,
          from: "random",
        },
      });

      delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
        activeEl.style.display = activate ? "block" : "none";
        activeEl.style.pointerEvents = activate ? "auto" : "none";
      });

      gsap.to(pixels, {
        display: "none",
        duration: 0,
        delay: animationStepDuration,
        stagger: {
          each: staggerDuration,
          from: "random",
        },
      });
    };

    React.useImperativeHandle(ref, () => ({
      cover: () =>
        new Promise<void>((resolve) => {
          animatePixels(true);
          setTimeout(
            () => resolve(),
            Math.max(300, animationStepDuration * 1000 + 50),
          );
        }),
      reveal: () =>
        new Promise<void>((resolve) => {
          animatePixels(false);
          setTimeout(
            () => resolve(),
            Math.max(300, animationStepDuration * 1000 + 50),
          );
        }),
    }));

    const handleEnter = (): void => {
      if (!isActive) animatePixels(true);
    };

    const handleLeave = (): void => {
      if (isActive && !once) animatePixels(false);
    };

    const handleClick = (): void => {
      if (!isActive) animatePixels(true);
      else if (isActive && !once) animatePixels(false);
    };

    return (
      <div
        ref={containerRef}
        className={`${className} relative overflow-hidden pointer-events-none`}
        onMouseEnter={interactive && !isTouchDevice ? handleEnter : undefined}
        onMouseLeave={interactive && !isTouchDevice ? handleLeave : undefined}
        onClick={interactive && isTouchDevice ? handleClick : undefined}
        onFocus={interactive && !isTouchDevice ? handleEnter : undefined}
        onBlur={interactive && !isTouchDevice ? handleLeave : undefined}
        tabIndex={interactive ? 0 : -1}
      >
        <div className={aspectClass} />

        <div className="absolute inset-0 w-full h-full">{firstContent}</div>

        <div
          ref={activeRef}
          className="absolute inset-0 w-full h-full z-20 hidden"
        >
          {secondContent}
        </div>

        <div
          ref={pixelGridRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
        />
      </div>
    );
  },
);

PixelTransition.displayName = "PixelTransition";

export default PixelTransition;