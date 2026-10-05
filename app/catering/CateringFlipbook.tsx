"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const menuPages = [
  { src: "/catering/menu-pages/01-cover.webp", alt: "Ajisai catering menu cover" },
  { src: "/catering/menu-pages/02-appetizers.webp", alt: "Ajisai catering appetizers menu" },
  { src: "/catering/menu-pages/03-catering-menu.webp", alt: "Ajisai sushi catering menu" },
  { src: "/catering/menu-pages/04-hibachi.webp", alt: "Ajisai hibachi catering menu" },
  { src: "/catering/menu-pages/05-salads.webp", alt: "Ajisai salads catering menu" },
  { src: "/catering/menu-pages/06-lunch-boxes.webp", alt: "Ajisai lunch box catering menu" },
  { src: "/catering/menu-pages/07-beverages.webp", alt: "Ajisai beverage catering menu" },
  { src: "/catering/menu-pages/08-thank-you.webp", alt: "Ajisai catering information and thank you page" },
];

const bookStates = [
  [menuPages[0]],
  [menuPages[1], menuPages[2]],
  [menuPages[3], menuPages[4]],
  [menuPages[5], menuPages[6]],
  [menuPages[7]],
];

const stateVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 32 : -32,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -32 : 32,
  }),
};

function NavigationButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const isPrevious = direction === "previous";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${isPrevious ? "Previous" : "Next"} menu state`}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c99a4b]/70 bg-black/70 text-[#e2b967] shadow-lg backdrop-blur-sm transition-colors hover:border-[#e2b967] hover:bg-black disabled:cursor-not-allowed disabled:opacity-30"
    >
      {isPrevious ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
    </button>
  );
}

export default function CateringFlipbook() {
  const [stateIndex, setStateIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const currentPages = bookStates[stateIndex];

  const move = (delta: number) => {
    const nextState = Math.min(
      Math.max(stateIndex + delta, 0),
      bookStates.length - 1,
    );

    if (nextState === stateIndex) return;
    setDirection(delta > 0 ? 1 : -1);
    setStateIndex(nextState);
  };

  const controls = (
    <div className="mt-7 flex items-center justify-center gap-5">
      <NavigationButton
        direction="previous"
        disabled={stateIndex === 0}
        onClick={() => move(-1)}
      />
      <p className="min-w-24 text-center text-sm tracking-[0.16em] text-white/70">
        {stateIndex + 1} of {bookStates.length}
      </p>
      <NavigationButton
        direction="next"
        disabled={stateIndex === bookStates.length - 1}
        onClick={() => move(1)}
      />
    </div>
  );

  return (
    <section className="overflow-hidden bg-[#11100f] px-4 py-20 text-white md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#c99a4b]">
            Browse the menu
          </p>
          <h2 className="font-serif text-3xl tracking-wide md:text-5xl">
            Catering Menu Flipbook
          </h2>
        </div>

        <div className="hidden md:block">
          <div className="relative mx-auto aspect-[13/10] w-full max-w-6xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={stateIndex}
                custom={direction}
                variants={stateVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 flex overflow-hidden rounded-md ${
                  currentPages.length === 1 ? "justify-center" : "border border-[#c99a4b]/35"
                }`}
              >
                {currentPages.map((page) => (
                  <div
                    key={page.src}
                    className={`relative h-full bg-black shadow-[0_28px_70px_rgba(0,0,0,0.55)] ${
                      currentPages.length === 1
                        ? "w-1/2 overflow-hidden rounded-md border border-[#c99a4b]/35"
                        : "w-1/2"
                    }`}
                  >
                    <Image
                      src={page.src}
                      alt={page.alt}
                      fill
                      sizes="(min-width: 1280px) 576px, 45vw"
                      className="object-contain"
                    />
                  </div>
                ))}
                {currentPages.length === 2 && (
                  <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/35 to-transparent" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          {controls}
        </div>

        <div className="md:hidden">
          <div className="relative mx-auto aspect-[13/20] w-full max-w-md">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={stateIndex}
                custom={direction}
                variants={stateVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-sm border border-[#c99a4b]/35 bg-black shadow-[0_22px_50px_rgba(0,0,0,0.5)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label={`Catering menu state ${stateIndex + 1}`}
              >
                {currentPages.map((page) => (
                  <div key={page.src} className="relative h-full w-full flex-none snap-center">
                    <Image
                      src={page.src}
                      alt={page.alt}
                      fill
                      sizes="(max-width: 767px) 92vw, 448px"
                      className="select-none object-contain"
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          {controls}
          {currentPages.length === 2 && (
            <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-white/45">
              Swipe to view both pages
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
