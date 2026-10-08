"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type TouchEvent } from "react";

const promotions = [
  {
    eyebrow: "Football Happy Hour",
    title: "Catch the NFL Games With Us",
    description:
      "Game-day food and drink specials available at the bartop during select NFL games.",
    details: [
      "Sunday — All Day",
      "Monday — During the Game",
      "Thursday — During the Game",
    ],
  },
  {
    eyebrow: "Monday Special",
    title: "Kids Meals 50% Off",
    description:
      "Valid with the purchase of an adult entrée. Available for kids 12 and under.",
    details: [],
  },
  {
    eyebrow: "Tuesday Special",
    title: "A Special Tuesday Treat for Ladies",
    description: "Enjoy 15% off all wine, beer, and hot sake all day long.",
    details: [],
  },
  {
    eyebrow: "Happy Hour",
    title: "Happy Hour at Ajisai",
    description:
      "Enjoy sushi rolls, appetizers, drinks, and more at special Happy Hour pricing.",
    details: [
      "Sunday–Thursday — 2PM–5PM",
      "Friday & Saturday — All Day",
    ],
  },
];

const AUTOPLAY_DELAY = 7000;

export function PromotionsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isInteracting || prefersReducedMotion || activeIndex === promotions.length - 1) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => Math.min(current + 1, promotions.length - 1));
    }, AUTOPLAY_DELAY);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isInteracting, prefersReducedMotion]);

  const showPrevious = () => {
    setActiveIndex((current) => Math.max(current - 1, 0));
  };

  const showNext = () => {
    setActiveIndex((current) => Math.min(current + 1, promotions.length - 1));
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    setIsInteracting(true);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;

    if (startX !== null && endX !== undefined) {
      const distance = endX - startX;
      if (distance > 50) showPrevious();
      if (distance < -50) showNext();
    }

    touchStartX.current = null;
    setIsInteracting(false);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#481029] text-white"
      aria-label="Current promotions"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={() => setIsInteracting(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStartX.current = null;
        setIsInteracting(false);
      }}
    >
      <div
        className={`flex touch-pan-y ${prefersReducedMotion ? "" : "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"}`}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {promotions.map((promotion, index) => (
          <article
            key={promotion.eyebrow}
            className="flex min-h-[430px] w-full shrink-0 items-center justify-center px-16 py-16 text-center sm:min-h-[450px] sm:px-20 md:min-h-[470px] md:px-24 md:py-20 lg:min-h-[490px]"
            aria-hidden={index !== activeIndex}
          >
            <div className="mx-auto flex max-w-4xl flex-col items-center">
              <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-[#C5A059] sm:text-xs">
                {promotion.eyebrow}
              </p>
              <h2 className="max-w-3xl font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                {promotion.title}
              </h2>
              <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/75 sm:text-base md:text-lg">
                {promotion.description}
              </p>

              {promotion.details.length > 0 && (
                <ul className="mt-5 space-y-1.5 text-sm leading-relaxed text-[#D8BF8B] sm:text-base">
                  {promotion.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}

              <Link
                href="/reservations"
                tabIndex={index === activeIndex ? 0 : -1}
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-sm bg-[#C5A059] px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#111] transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#481029] sm:px-9 sm:text-sm"
              >
                Reserve a Table
              </Link>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={showPrevious}
        disabled={activeIndex === 0}
        aria-label="Previous promotion"
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#C5A059]/60 bg-[#481029]/85 text-[#C5A059] backdrop-blur-sm transition-colors hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-30 sm:left-5 md:left-8 md:h-12 md:w-12"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={showNext}
        disabled={activeIndex === promotions.length - 1}
        aria-label="Next promotion"
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#C5A059]/60 bg-[#481029]/85 text-[#C5A059] backdrop-blur-sm transition-colors hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-30 sm:right-5 md:right-8 md:h-12 md:w-12"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2.5 md:bottom-8">
        {promotions.map((promotion, index) => (
          <button
            key={promotion.eyebrow}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show promotion ${index + 1} of ${promotions.length}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              index === activeIndex
                ? "w-8 bg-[#C5A059]"
                : "w-2.5 bg-white/35 hover:bg-white/65"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
