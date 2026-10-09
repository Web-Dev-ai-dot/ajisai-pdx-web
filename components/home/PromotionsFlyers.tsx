"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";

type FlyerPromotion = {
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  scheduleHeading?: string;
  schedule?: string[];
  imageSrc: string | null;
  imageAlt: string;
};

const flyerPromotions: FlyerPromotion[] = [
  {
    name: "Happy Hour",
    eyebrow: "HAPPY HOUR",
    title: "Happy Hour at Ajisai",
    description: "Sushi, bites, and drinks at Happy Hour prices — every day.",
    scheduleHeading: "EVERY DAY",
    schedule: ["BAR — 2PM–6PM", "LOUNGE — 2PM–5PM"],
    imageSrc: "/promotions/flyers/happy-hour.jpg",
    imageAlt: "Ajisai Happy Hour menu flyer",
  },
  {
    name: "Football Happy Hour",
    eyebrow: "FOOTBALL HAPPY HOUR",
    title: "Catch the NFL Games With Us",
    description:
      "Game-day food and drink specials available at the bartop during select NFL games.",
    scheduleHeading: "AVAILABLE AT BARTOP",
    schedule: [
      "Sunday — All Day",
      "Monday — During the Game",
      "Thursday — During the Game",
    ],
    imageSrc: "/promotions/flyers/football-happy-hour.jpg",
    imageAlt: "Ajisai Football Happy Hour menu flyer",
  },
  {
    name: "Monday Special",
    eyebrow: "MONDAY SPECIAL",
    title: "Kids Meals 50% Off",
    description:
      "Valid with the purchase of an adult entrée. Available for kids 12 and under.",
    imageSrc: null,
    imageAlt: "Monday Special flyer",
  },
  {
    name: "Tuesday Special",
    eyebrow: "TUESDAY SPECIAL",
    title: "A Special Tuesday Treat for Ladies",
    description: "Enjoy 15% off all wine, beer, and hot sake all day long.",
    imageSrc: null,
    imageAlt: "Tuesday Special flyer",
  },
];

function ReserveButton() {
  return (
    <Link
      href="/reservations"
      className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-[#C5A059] px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#111] transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#481029] sm:text-sm"
    >
      Reserve a Table
    </Link>
  );
}

function PromotionPanel({ promotion }: { promotion: FlyerPromotion }) {
  return (
    <div className="grid min-h-[540px] items-center gap-12 py-14 md:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-20">
      <div className="max-w-xl text-left">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">
          {promotion.eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-[3.5rem]">
          {promotion.title}
        </h2>
        <p className="mt-5 text-base font-light leading-relaxed text-white/70 md:text-lg">
          {promotion.description}
        </p>

        {promotion.scheduleHeading && promotion.schedule && (
          <div className="mt-8 border-t border-white/15 pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C5A059]">
              {promotion.scheduleHeading}
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              {promotion.schedule.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        )}

        <ReserveButton />
      </div>

      <div className="flex items-center justify-center border-t border-[#C5A059]/30 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
        {promotion.imageSrc ? (
          <Image
            src={promotion.imageSrc}
            alt={promotion.imageAlt}
            width={720}
            height={900}
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 480px, 42vw"
            className="h-auto w-full max-w-[420px] object-contain sm:max-w-[480px] lg:max-h-[560px] lg:w-auto lg:max-w-full"
          />
        ) : (
          <div className="flex aspect-[4/5] w-full max-w-[420px] items-center justify-center border border-white/15 bg-white/[0.02] px-8 text-center sm:max-w-[480px] lg:max-h-[560px]">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A059]">
                FLYER ARTWORK
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Coming soon
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PromotionsFlyers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  const selectPromotion = (index: number, moveFocus = false) => {
    setActiveIndex(index);
    if (moveFocus) tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % flyerPromotions.length;
    }
    if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + flyerPromotions.length) % flyerPromotions.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = flyerPromotions.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      selectPromotion(nextIndex, true);
    }
  };

  const activePromotion = flyerPromotions[activeIndex];

  return (
    <section className="w-full overflow-hidden bg-[#1A0A10] text-white" aria-label="Promotion flyers">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Select a promotion flyer"
            className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {flyerPromotions.map((promotion, index) => (
              <button
                key={promotion.name}
                ref={(element) => { tabRefs.current[index] = element; }}
                id={`promotion-flyer-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls="promotion-flyer-panel"
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => selectPromotion(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`relative min-h-14 shrink-0 px-5 py-4 text-[0.67rem] font-bold uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C5A059] sm:px-7 sm:text-xs lg:flex-1 ${
                  activeIndex === index
                    ? "text-[#C5A059]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {promotion.name}
                <span
                  className={`absolute inset-x-5 bottom-0 h-0.5 bg-[#C5A059] transition-opacity ${activeIndex === index ? "opacity-100" : "opacity-0"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            id="promotion-flyer-panel"
            key={activeIndex}
            role="tabpanel"
            aria-labelledby={`promotion-flyer-tab-${activeIndex}`}
            className="lg:pl-20 xl:pl-32"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: "easeOut" }}
          >
            <PromotionPanel promotion={activePromotion} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
