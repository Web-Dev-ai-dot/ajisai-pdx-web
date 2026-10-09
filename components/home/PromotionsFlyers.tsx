"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";

const flyerPromotions: Array<{
  name: string;
  imageSrc: string | null;
  imageAlt: string;
}> = [
  {
    name: "Happy Hour",
    imageSrc: "/promotions/flyers/happy-hour.jpg",
    imageAlt: "Ajisai Happy Hour promotional flyer",
  },
  {
    name: "Football Happy Hour",
    imageSrc: "/promotions/flyers/football-happy-hour.jpg",
    imageAlt: "Ajisai Football Happy Hour promotional flyer",
  },
  {
    name: "Monday Special",
    imageSrc: null,
    imageAlt: "Ajisai Monday Special promotional flyer",
  },
  {
    name: "Tuesday Special",
    imageSrc: null,
    imageAlt: "Ajisai Tuesday Special promotional flyer",
  },
];

export function PromotionsFlyers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const activePromotion = flyerPromotions[activeIndex];

  const selectPromotion = (index: number, moveFocus = false) => {
    setActiveIndex(index);
    if (moveFocus) tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % flyerPromotions.length;
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

  return (
    <section className="w-full overflow-hidden bg-[#F9F4E8] text-[#5D182E]" aria-label="Promotion flyers">
      <div className="border-b border-[#5D182E]/15">
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
                    ? "text-[#9B762F]"
                    : "text-[#5D182E]/50 hover:text-[#5D182E]"
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

      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:py-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            id="promotion-flyer-panel"
            role="tabpanel"
            aria-labelledby={`promotion-flyer-tab-${activeIndex}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: "easeOut" }}
            className="mx-auto flex max-w-2xl justify-center"
          >
            <div className="relative flex aspect-[3/4] w-full max-w-xl items-center justify-center overflow-hidden rounded-sm border border-[#C5A059]/35 bg-white/45 p-8 shadow-sm sm:p-12">
              {activePromotion.imageSrc ? (
                <Image
                  src={activePromotion.imageSrc}
                  alt={activePromotion.imageAlt}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 3rem), 576px"
                  className="object-contain"
                />
              ) : (
                <div className="max-w-sm text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9B762F]">
                    {activePromotion.name}
                  </p>
                  <p className="mt-4 font-serif text-2xl text-[#5D182E] sm:text-3xl">
                    Flyer artwork coming soon
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5D182E]/60">
                    The supplied promotional artwork will appear here.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
