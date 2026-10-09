"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";

const promotionTabs = [
  "Football Happy Hour",
  "Monday Special",
  "Tuesday Special",
  "Happy Hour",
] as const;

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

function FootballPromotion() {
  return (
    <div className="grid min-h-[540px] items-center gap-12 py-14 md:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-20">
      <div className="max-w-xl text-left">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">
          Football Happy Hour
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-[3.5rem]">
          Catch the NFL Games With Us
        </h2>
        <p className="mt-5 text-base font-light leading-relaxed text-white/70 md:text-lg">
          Game-day food and drink specials available at the bartop during select NFL games.
        </p>
        <ReserveButton />
      </div>

      <div className="border-t border-[#C5A059]/30 pt-8 text-left lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
          Game Day Specials
        </p>

        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-serif text-5xl leading-none text-[#C5A059] sm:text-6xl">$0.50</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-white">
              Wings — Each
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
              Cajun · Buffalo · Spicy BBQ · Black Pepper Teriyaki
            </p>
            <div className="mt-5 space-y-1 text-sm text-white/75">
              <p>Lettuce Wraps</p>
              <p>Crab Rangoons</p>
            </div>
          </div>

          <div>
            <div className="flex items-end gap-3">
              <p className="font-serif text-5xl leading-none text-[#C5A059] sm:text-6xl">$5</p>
              <p className="pb-1 text-xs font-bold uppercase tracking-[0.22em] text-white">
                Drinks
              </p>
            </div>
            <div className="mt-5 space-y-2 text-sm leading-relaxed text-white/70">
              <p>Draft Beer</p>
              <p>Well Cocktails</p>
              <p>Wine — Red · White · Rosé</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C5A059]">
            NFL at the Bartop
          </p>
          <div className="mt-4 grid gap-2 text-sm text-white/70 min-[520px]:grid-cols-3 min-[520px]:gap-5">
            <p>Sunday — All Day</p>
            <p>Monday — During the Game</p>
            <p>Thursday — During the Game</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MinimalPromotion({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[540px] items-center py-14 md:py-16 lg:py-20">
      <div className="max-w-3xl text-left">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-white/70 md:text-lg">
          {description}
        </p>
        <ReserveButton />
      </div>
    </div>
  );
}

const happyHourHighlights = [
  { price: "$5–$7", label: "Sushi Rolls" },
  {
    price: "$3 Each",
    label: "Nigiri",
    detail: "Tuna · Salmon · Ebi · Yellowtail · Red Snapper",
  },
  { price: "From $3", label: "Salads & Soup" },
  { price: "$0.50–$7", label: "Hot Appetizers" },
  {
    price: "$5",
    label: "Drinks",
    detail: "Draft Beer · Well Cocktails · Wine by the Glass",
  },
];

function HappyHourPromotion() {
  return (
    <div className="grid min-h-[540px] items-center gap-12 py-14 md:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-20">
      <div className="max-w-xl text-left">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">
          Happy Hour
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-[3.5rem]">
          Happy Hour at Ajisai
        </h2>
        <p className="mt-5 text-base font-light leading-relaxed text-white/70 md:text-lg">
          Sushi, bites, and drinks at Happy Hour prices — every day.
        </p>
        <ReserveButton />
      </div>

      <div className="border-t border-[#C5A059]/30 pt-8 text-left lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
          Happy Hour Favorites
        </p>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
          {happyHourHighlights.map((highlight, index) => (
            <div
              key={highlight.label}
              className={`min-w-0 ${index === happyHourHighlights.length - 1 ? "col-span-2" : ""}`}
            >
              <p className="font-serif text-2xl uppercase leading-tight text-[#C5A059] sm:text-3xl">
                {highlight.price}
              </p>
              <h3 className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
                {highlight.label}
              </h3>
              {highlight.detail && (
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/50 sm:text-sm">
                  {highlight.detail}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-white/15 pt-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C5A059]">
            Every Day
          </p>
          <div className="mt-4 grid grid-cols-2 gap-5 text-sm text-white/70">
            <p>Bar — 2PM–6PM</p>
            <p>Lounge — 2PM–5PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PromotionContent({ index }: { index: number }) {
  if (index === 0) return <FootballPromotion />;
  if (index === 1) {
    return (
      <MinimalPromotion
        eyebrow="Monday Special"
        title="Kids Meals 50% Off"
        description="Valid with the purchase of an adult entrée. Available for kids 12 and under."
      />
    );
  }
  if (index === 2) {
    return (
      <MinimalPromotion
        eyebrow="Tuesday Special"
        title="A Special Tuesday Treat for Ladies"
        description="Enjoy 15% off all wine, beer, and hot sake all day long."
      />
    );
  }
  return <HappyHourPromotion />;
}

export function PromotionsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  const selectPromotion = (index: number, moveFocus = false) => {
    setActiveIndex(index);
    if (moveFocus) tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % promotionTabs.length;
    if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + promotionTabs.length) % promotionTabs.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = promotionTabs.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      selectPromotion(nextIndex, true);
    }
  };

  return (
    <section className="w-full overflow-hidden bg-[#1A0A10] text-white" aria-label="Current promotions">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Select a promotion"
            className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {promotionTabs.map((tab, index) => (
              <button
                key={tab}
                ref={(element) => { tabRefs.current[index] = element; }}
                id={`promotion-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls="promotion-panel"
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => selectPromotion(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`relative min-h-14 shrink-0 px-5 py-4 text-[0.67rem] font-bold uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C5A059] sm:px-7 sm:text-xs lg:flex-1 ${
                  activeIndex === index
                    ? "text-[#C5A059]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {tab}
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
            key={activeIndex}
            id="promotion-panel"
            role="tabpanel"
            aria-labelledby={`promotion-tab-${activeIndex}`}
            className="lg:pl-20 xl:pl-32"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: "easeOut" }}
          >
            <PromotionContent index={activeIndex} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
