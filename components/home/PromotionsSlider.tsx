"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
  type TransitionEvent,
} from "react";

const promotions = [
  {
    eyebrow: "Football Happy Hour",
    title: "Catch the NFL Games With Us",
    description:
      "Game-day food and drink specials available at the bartop during select NFL games.",
    detailGroups: [
      {
        title: "Happy Hour Food",
        lines: [
          "$0.50 Wings — each",
          "Cajun · Buffalo · Spicy BBQ · Black Pepper Teriyaki",
          "Lettuce Wraps",
          "Crab Rangoons",
        ],
      },
      {
        title: "Happy Hour Drinks",
        lines: [
          "$5 Draft Beer",
          "$5 Well Cocktails",
          "$5 Wine — Red · White · Rosé",
        ],
      },
      {
        title: "NFL at the Bartop",
        lines: [
          "Sunday — All Day",
          "Monday — During the Game",
          "Thursday — During the Game",
        ],
      },
    ],
    schedule: [],
  },
  {
    eyebrow: "Monday Special",
    title: "Kids Meals 50% Off",
    description:
      "Valid with the purchase of an adult entrée. Available for kids 12 and under.",
    detailGroups: [],
    schedule: [],
  },
  {
    eyebrow: "Tuesday Special",
    title: "A Special Tuesday Treat for Ladies",
    description: "Enjoy 15% off all wine, beer, and hot sake all day long.",
    detailGroups: [],
    schedule: [],
  },
  {
    eyebrow: "Happy Hour",
    title: "Happy Hour at Ajisai",
    description:
      "Sushi rolls from $5, nigiri for $3, appetizers from $0.50, and drinks for $5 — every day.",
    detailGroups: [
      { title: "Sushi Rolls", lines: ["$5–$7"] },
      {
        title: "Nigiri — $3 each",
        lines: ["Tuna · Salmon · Ebi · Yellowtail · Red Snapper"],
      },
      { title: "Salads & Soup", lines: ["From $3"] },
      { title: "Hot Appetizers", lines: ["$0.50–$7"] },
      {
        title: "Drinks — $5",
        lines: ["Draft Beer · Well Cocktails · Wine by the Glass"],
      },
    ],
    schedule: ["BAR — 2PM–6PM", "LOUNGE — 2PM–5PM", "EVERY DAY"],
  },
];

const AUTOPLAY_DELAY = 7000;
const lastPromotionIndex = promotions.length - 1;
const renderedPromotions = [
  { promotion: promotions[lastPromotionIndex], originalIndex: lastPromotionIndex, isClone: true },
  ...promotions.map((promotion, originalIndex) => ({
    promotion,
    originalIndex,
    isClone: false,
  })),
  { promotion: promotions[0], originalIndex: 0, isClone: true },
];

export function PromotionsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTrackAnimated, setIsTrackAnimated] = useState(true);
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

  const moveCarousel = useCallback((direction: 1 | -1) => {
    if (isTransitioning) return;

    const nextIndex =
      (activeIndex + direction + promotions.length) % promotions.length;

    setActiveIndex(nextIndex);

    if (prefersReducedMotion) {
      setTrackIndex(nextIndex + 1);
      return;
    }

    setIsTransitioning(true);
    setTrackIndex((current) => current + direction);
  }, [activeIndex, isTransitioning, prefersReducedMotion]);

  const showPrevious = useCallback(() => moveCarousel(-1), [moveCarousel]);
  const showNext = useCallback(() => moveCarousel(1), [moveCarousel]);

  useEffect(() => {
    if (isInteracting || prefersReducedMotion || isTransitioning) return;

    const timer = window.setTimeout(showNext, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isInteracting, isTransitioning, prefersReducedMotion, showNext]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;

    if (trackIndex !== 0 && trackIndex !== promotions.length + 1) {
      setIsTransitioning(false);
      return;
    }

    setIsTrackAnimated(false);
    setTrackIndex(trackIndex === 0 ? promotions.length : 1);
    setIsTransitioning(false);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsTrackAnimated(true));
    });
  };

  const showPromotion = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    setActiveIndex(index);
    setTrackIndex(index + 1);
    setIsTransitioning(!prefersReducedMotion);
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
        className={`flex touch-pan-y ${isTrackAnimated && !prefersReducedMotion ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
        style={{ transform: `translateX(-${trackIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {renderedPromotions.map(({ promotion, originalIndex, isClone }, renderedIndex) => (
          <article
            key={`${promotion.eyebrow}-${renderedIndex}`}
            className="flex min-h-[570px] w-full shrink-0 items-center justify-center px-16 py-14 text-center sm:min-h-[560px] sm:px-20 md:min-h-[570px] md:px-24 md:py-16 lg:min-h-[590px]"
            aria-hidden={isClone || originalIndex !== activeIndex}
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

              {promotion.detailGroups.length > 0 && (
                <div className={`mt-5 grid w-full max-w-4xl gap-x-5 gap-y-4 text-left ${promotion.detailGroups.length === 3 ? "grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"}`}>
                  {promotion.detailGroups.map((group, groupIndex) => (
                    <div
                      key={group.title}
                      className={promotion.detailGroups.length === 3 && groupIndex === 2 ? "min-[360px]:col-span-2 md:col-span-1" : ""}
                    >
                      <h3 className="text-[0.67rem] font-bold uppercase tracking-[0.17em] text-[#C5A059] sm:text-xs">
                        {group.title}
                      </h3>
                      <div className="mt-1.5 space-y-1 text-xs leading-relaxed text-white/65 sm:text-sm">
                        {group.lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {promotion.schedule.length > 0 && (
                <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[0.68rem] font-semibold tracking-[0.12em] text-[#D8BF8B] sm:text-xs">
                  {promotion.schedule.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}

              <Link
                href="/reservations"
                tabIndex={!isClone && originalIndex === activeIndex ? 0 : -1}
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-sm bg-[#C5A059] px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#111] transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#481029] sm:px-9 sm:text-sm"
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
        aria-label="Previous promotion"
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#C5A059]/60 bg-[#481029]/85 text-[#C5A059] backdrop-blur-sm transition-colors hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-5 md:left-8 md:h-12 md:w-12"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={showNext}
        aria-label="Next promotion"
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#C5A059]/60 bg-[#481029]/85 text-[#C5A059] backdrop-blur-sm transition-colors hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 md:right-8 md:h-12 md:w-12"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2.5 md:bottom-8">
        {promotions.map((promotion, index) => (
          <button
            key={promotion.eyebrow}
            type="button"
            onClick={() => showPromotion(index)}
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
