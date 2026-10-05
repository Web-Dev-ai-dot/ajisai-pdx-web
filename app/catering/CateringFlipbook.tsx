"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
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

type MenuPage = (typeof menuPages)[number];

type PageTurn = {
  id: number;
  direction: 1 | -1;
  from: MenuPage[];
  to: MenuPage[];
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

function PageImage({ page, sizes }: { page: MenuPage; sizes: string }) {
  return (
    <Image
      src={page.src}
      alt={page.alt}
      fill
      sizes={sizes}
      className="select-none object-contain"
    />
  );
}

function DesktopBookState({ pages }: { pages: MenuPage[] }) {
  return (
    <div className={`absolute inset-0 flex overflow-hidden rounded-md ${pages.length === 1 ? "justify-center" : "border border-[#c99a4b]/35"}`}>
      {pages.map((page) => (
        <div
          key={page.src}
          className={`relative h-full bg-black shadow-[0_28px_70px_rgba(0,0,0,0.55)] ${
            pages.length === 1
              ? "w-1/2 overflow-hidden rounded-md border border-[#c99a4b]/35"
              : "w-1/2"
          }`}
        >
          <PageImage page={page} sizes="(min-width: 1280px) 576px, 45vw" />
        </div>
      ))}
      {pages.length === 2 && (
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/35 to-transparent" />
      )}
    </div>
  );
}

function DesktopPageTurn({ turn, onComplete }: { turn: PageTurn; onComplete: () => void }) {
  const movingForward = turn.direction === 1;
  const frontPage = movingForward ? turn.from[turn.from.length - 1] : turn.from[0];
  const backPage = movingForward ? turn.to[0] : turn.to[turn.to.length - 1];
  const stationaryPage = turn.from.length === 2
    ? movingForward
      ? turn.from[0]
      : turn.from[turn.from.length - 1]
    : null;
  const singlePageOffset = turn.from.length === 1 ? "left-1/4" : movingForward ? "left-1/2" : "left-0";

  return (
    <div className="pointer-events-none absolute inset-0 z-20" style={{ perspective: "1800px" }}>
      {stationaryPage && (
        <div className={`absolute inset-y-0 z-20 w-1/2 bg-black ${movingForward ? "left-0" : "left-1/2"}`}>
          <PageImage page={stationaryPage} sizes="(min-width: 1280px) 576px, 45vw" />
        </div>
      )}

      <motion.div
        key={turn.id}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: movingForward ? -180 : 180 }}
        transition={{ duration: 0.68, ease: [0.45, 0, 0.2, 1] }}
        onAnimationComplete={onComplete}
        className={`absolute inset-y-0 z-30 w-1/2 ${singlePageOffset}`}
        style={{
          transformOrigin: movingForward ? "left center" : "right center",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden bg-black shadow-[0_10px_35px_rgba(0,0,0,0.55)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <PageImage page={frontPage} sizes="(min-width: 1280px) 576px, 45vw" />
          <motion.div
            className={`absolute inset-0 ${movingForward ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-black/5 via-black/10 to-black/55`}
            animate={{ opacity: [0.15, 0.7, 0.2] }}
            transition={{ duration: 0.68, times: [0, 0.55, 1] }}
          />
        </div>

        <div
          className="absolute inset-0 overflow-hidden bg-black shadow-[0_10px_35px_rgba(0,0,0,0.45)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <PageImage page={backPage} sizes="(min-width: 1280px) 576px, 45vw" />
          <motion.div
            className={`absolute inset-0 ${movingForward ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-black/10 via-transparent to-black/45`}
            animate={{ opacity: [0.65, 0.25, 0.08] }}
            transition={{ duration: 0.68, times: [0, 0.5, 1] }}
          />
        </div>

        <motion.div
          className={`absolute inset-y-0 z-40 w-8 ${movingForward ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l"} from-black/55 to-transparent`}
          animate={{ opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: 0.68, times: [0, 0.5, 1] }}
        />
      </motion.div>
    </div>
  );
}

export default function CateringFlipbook() {
  const [stateIndex, setStateIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [turn, setTurn] = useState<PageTurn | null>(null);
  const currentPages = bookStates[stateIndex];

  const move = (delta: number) => {
    if (turn) return;

    const nextState = Math.min(
      Math.max(stateIndex + delta, 0),
      bookStates.length - 1,
    );

    if (nextState === stateIndex) return;

    const nextDirection = delta > 0 ? 1 : -1;
    setDirection(nextDirection);
    setTurn({
      id: Date.now(),
      direction: nextDirection,
      from: currentPages,
      to: bookStates[nextState],
    });
    setStateIndex(nextState);
  };

  const controls = (
    <div className="mt-7 flex items-center justify-center gap-5">
      <NavigationButton
        direction="previous"
        disabled={stateIndex === 0 || turn !== null}
        onClick={() => move(-1)}
      />
      <p className="min-w-24 text-center text-sm tracking-[0.16em] text-white/70">
        {stateIndex + 1} of {bookStates.length}
      </p>
      <NavigationButton
        direction="next"
        disabled={stateIndex === bookStates.length - 1 || turn !== null}
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
            <DesktopBookState pages={currentPages} />
            {turn && <DesktopPageTurn turn={turn} onComplete={() => setTurn(null)} />}
          </div>
          {controls}
        </div>

        <div className="md:hidden">
          <div
            className="relative mx-auto aspect-[13/20] w-full max-w-md"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              key={stateIndex}
              initial={{ rotateY: direction > 0 ? 72 : -72 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.55, ease: [0.35, 0, 0.2, 1] }}
              className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-sm border border-[#c99a4b]/35 bg-black shadow-[0_22px_50px_rgba(0,0,0,0.5)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{
                backfaceVisibility: "hidden",
                transformOrigin: direction > 0 ? "left center" : "right center",
              }}
              aria-label={`Catering menu state ${stateIndex + 1}`}
            >
              {currentPages.map((page) => (
                <div key={page.src} className="relative h-full w-full flex-none snap-center">
                  <PageImage page={page} sizes="(max-width: 767px) 92vw, 448px" />
                  <motion.div
                    className={`pointer-events-none absolute inset-0 ${direction > 0 ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-black/45 via-transparent to-transparent`}
                    animate={{ opacity: [0.6, 0] }}
                    transition={{ duration: 0.55 }}
                  />
                </div>
              ))}
            </motion.div>
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
