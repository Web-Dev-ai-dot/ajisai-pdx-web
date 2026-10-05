"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
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

const desktopVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    rotateY: direction > 0 ? 52 : -52,
    x: direction > 0 ? 44 : -44,
  }),
  center: { opacity: 1, rotateY: 0, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    rotateY: direction > 0 ? -72 : 72,
    x: direction > 0 ? -44 : 44,
  }),
};

const mobileVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 72 : -72 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -72 : 72 }),
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
      aria-label={`${isPrevious ? "Previous" : "Next"} menu page`}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c99a4b]/70 bg-black/70 text-[#e2b967] shadow-lg backdrop-blur-sm transition-colors hover:border-[#e2b967] hover:bg-black disabled:cursor-not-allowed disabled:opacity-30"
    >
      {isPrevious ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
    </button>
  );
}

export default function CateringFlipbook() {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const spreadStart = Math.floor(pageIndex / 2) * 2;

  const moveMobile = (delta: number) => {
    const nextPage = Math.min(Math.max(pageIndex + delta, 0), menuPages.length - 1);
    if (nextPage === pageIndex) return;
    setDirection(delta > 0 ? 1 : -1);
    setPageIndex(nextPage);
  };

  const moveDesktop = (delta: number) => {
    const nextSpread = Math.min(
      Math.max(spreadStart + delta * 2, 0),
      menuPages.length - 2,
    );
    if (nextSpread === spreadStart) return;
    setDirection(delta > 0 ? 1 : -1);
    setPageIndex(nextSpread);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -50 || info.velocity.x < -450) moveMobile(1);
    if (info.offset.x > 50 || info.velocity.x > 450) moveMobile(-1);
  };

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
          <div
            className="relative mx-auto aspect-[13/10] w-full max-w-6xl"
            style={{ perspective: "1800px" }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={spreadStart}
                custom={direction}
                variants={desktopVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 grid grid-cols-2 overflow-hidden rounded-md border border-[#c99a4b]/35 bg-black shadow-[0_28px_70px_rgba(0,0,0,0.55)]"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: direction > 0 ? "left center" : "right center",
                }}
              >
                {[spreadStart, spreadStart + 1].map((index) => (
                  <div key={menuPages[index].src} className="relative h-full bg-black">
                    <Image
                      src={menuPages[index].src}
                      alt={menuPages[index].alt}
                      fill
                      sizes="(min-width: 1280px) 576px, 45vw"
                      className="object-contain"
                    />
                  </div>
                ))}
                <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/35 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5">
            <NavigationButton direction="previous" disabled={spreadStart === 0} onClick={() => moveDesktop(-1)} />
            <p className="min-w-32 text-center text-sm tracking-[0.16em] text-white/70">
              Pages {spreadStart + 1}–{spreadStart + 2} of {menuPages.length}
            </p>
            <NavigationButton direction="next" disabled={spreadStart >= menuPages.length - 2} onClick={() => moveDesktop(1)} />
          </div>
        </div>

        <div className="md:hidden">
          <div className="relative mx-auto aspect-[13/20] w-full max-w-md overflow-hidden rounded-sm border border-[#c99a4b]/35 bg-black shadow-[0_22px_50px_rgba(0,0,0,0.5)]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={pageIndex}
                custom={direction}
                variants={mobileVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
              >
                <Image
                  src={menuPages[pageIndex].src}
                  alt={menuPages[pageIndex].alt}
                  fill
                  sizes="(max-width: 767px) 92vw, 448px"
                  className="pointer-events-none select-none object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-5">
            <NavigationButton direction="previous" disabled={pageIndex === 0} onClick={() => moveMobile(-1)} />
            <p className="min-w-28 text-center text-sm tracking-[0.16em] text-white/70">
              Page {pageIndex + 1} of {menuPages.length}
            </p>
            <NavigationButton direction="next" disabled={pageIndex === menuPages.length - 1} onClick={() => moveMobile(1)} />
          </div>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-white/45">
            Swipe to turn pages
          </p>
        </div>
      </div>
    </section>
  );
}
