"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, type PanInfo } from "framer-motion";
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
  toIndex: number;
  from: MenuPage[];
  to: MenuPage[];
  isSinglePageTransition: boolean;
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
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c99a4b]/70 bg-black/70 text-[#e2b967] shadow-lg backdrop-blur-sm transition-colors hover:border-[#e2b967] hover:bg-black disabled:cursor-not-allowed disabled:opacity-30 lg:h-11 lg:w-11"
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
      draggable={false}
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

function DesktopSinglePageTransition({
  turn,
  onComplete,
}: {
  turn: PageTurn;
  onComplete: () => void;
}) {
  const opening = turn.from.length === 1;
  const movingForward = turn.direction === 1;
  const singlePage = opening ? turn.from[0] : turn.to[0];
  const spread = opening ? turn.to : turn.from;
  const spreadTurningPage = movingForward ? spread[spread.length - 1] : spread[0];
  const spreadRevealPage = movingForward ? spread[0] : spread[spread.length - 1];
  const turningFront = opening ? singlePage : spreadTurningPage;
  const turningBack = opening ? spreadRevealPage : singlePage;
  const initialLeft = opening ? "25%" : movingForward ? "50%" : "0%";
  const leftKeyframes = opening
    ? movingForward
      ? ["25%", "50%", "50%"]
      : ["25%", "0%", "0%"]
    : movingForward
      ? ["50%", "50%", "25%"]
      : ["0%", "0%", "25%"];
  const rotationKeyframes = opening
    ? movingForward
      ? [0, 0, -180]
      : [0, 0, 180]
    : movingForward
      ? [0, -180, -180]
      : [0, 180, 180];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-md bg-[#11100f]"
      style={{ perspective: "1800px" }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: opening ? 0 : 1 }}
        animate={{ opacity: opening ? [0, 0, 1] : 1 }}
        transition={{ duration: 0.72, times: [0, 0.18, 0.38] }}
      >
        <DesktopBookState pages={spread} />
      </motion.div>

      {!opening && (
        <motion.div
          className="absolute inset-0 z-10 bg-[#11100f]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1] }}
          transition={{ duration: 0.72, times: [0, 0.78, 1] }}
        />
      )}

      <motion.div
        key={turn.id}
        initial={{ left: initialLeft, rotateY: 0 }}
        animate={{
          left: leftKeyframes,
          rotateY: rotationKeyframes,
        }}
        transition={{
          duration: 0.72,
          ease: [0.45, 0, 0.2, 1],
          times: opening ? [0, 0.18, 1] : [0, 0.82, 1],
        }}
        onAnimationComplete={onComplete}
        className="absolute inset-y-0 z-30 w-1/2"
        style={{
          transformOrigin: movingForward ? "left center" : "right center",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-md border border-[#c99a4b]/35 bg-black shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <PageImage page={turningFront} sizes="(min-width: 1280px) 576px, 45vw" />
          <motion.div
            className={`absolute inset-0 ${movingForward ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-black/5 via-black/10 to-black/55`}
            animate={{ opacity: [0.08, 0.7, 0.18] }}
            transition={{ duration: 0.72, times: [0, 0.58, 1] }}
          />
        </div>

        <div
          className="absolute inset-0 overflow-hidden rounded-md border border-[#c99a4b]/35 bg-black shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <PageImage page={turningBack} sizes="(min-width: 1280px) 576px, 45vw" />
          <motion.div
            className={`absolute inset-0 ${movingForward ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-black/15 via-transparent to-black/45`}
            animate={{ opacity: [0.65, 0.25, 0.08] }}
            transition={{ duration: 0.72, times: [0, 0.5, 1] }}
          />
        </div>

        <motion.div
          className={`absolute inset-y-0 z-40 w-8 ${movingForward ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l"} from-black/60 to-transparent`}
          animate={{ opacity: [0.12, 0.85, 0.12] }}
          transition={{ duration: 0.72, times: [0, 0.52, 1] }}
        />
      </motion.div>
    </div>
  );
}

export default function CateringFlipbook() {
  const [stateIndex, setStateIndex] = useState(0);
  const [desktopStateIndex, setDesktopStateIndex] = useState(0);
  const [mobilePageIndex, setMobilePageIndex] = useState(0);
  const [mobileDirection, setMobileDirection] = useState<1 | -1>(1);
  const [turn, setTurn] = useState<PageTurn | null>(null);
  const desktopPages = bookStates[desktopStateIndex];

  const moveDesktop = (delta: number) => {
    if (turn) return;

    const nextState = Math.min(
      Math.max(stateIndex + delta, 0),
      bookStates.length - 1,
    );

    if (nextState === stateIndex) return;

    const nextDirection = delta > 0 ? 1 : -1;
    const isSinglePageTransition =
      bookStates[stateIndex].length !== bookStates[nextState].length;

    setTurn({
      id: Date.now(),
      direction: nextDirection,
      toIndex: nextState,
      from: bookStates[stateIndex],
      to: bookStates[nextState],
      isSinglePageTransition,
    });
    setStateIndex(nextState);
    if (!isSinglePageTransition) setDesktopStateIndex(nextState);
  };

  const moveMobile = (delta: number) => {
    const nextPage = Math.min(
      Math.max(mobilePageIndex + delta, 0),
      menuPages.length - 1,
    );

    if (nextPage === mobilePageIndex) return;
    setMobileDirection(delta > 0 ? 1 : -1);
    setMobilePageIndex(nextPage);
  };

  const handleMobileSwipe = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -50 || info.velocity.x < -450) moveMobile(1);
    if (info.offset.x > 50 || info.velocity.x > 450) moveMobile(-1);
  };

  const completeTurn = () => {
    if (turn?.isSinglePageTransition) setDesktopStateIndex(turn.toIndex);
    setTurn(null);
  };

  const desktopControls = (
    <div className="mt-5 flex items-center justify-center gap-4 sm:mt-6 sm:gap-5 lg:mt-7">
      <NavigationButton
        direction="previous"
        disabled={stateIndex === 0 || turn !== null}
        onClick={() => moveDesktop(-1)}
      />
      <p className="min-w-24 text-center text-sm tracking-[0.16em] text-white/70">
        {stateIndex + 1} of {bookStates.length}
      </p>
      <NavigationButton
        direction="next"
        disabled={stateIndex === bookStates.length - 1 || turn !== null}
        onClick={() => moveDesktop(1)}
      />
    </div>
  );

  const mobileControls = (
    <div className="mt-5 flex items-center justify-center gap-4 sm:mt-6 sm:gap-5">
      <NavigationButton
        direction="previous"
        disabled={mobilePageIndex === 0}
        onClick={() => moveMobile(-1)}
      />
      <p className="min-w-24 text-center text-sm tracking-[0.16em] text-white/70">
        {mobilePageIndex + 1} of {menuPages.length}
      </p>
      <NavigationButton
        direction="next"
        disabled={mobilePageIndex === menuPages.length - 1}
        onClick={() => moveMobile(1)}
      />
    </div>
  );

  return (
    <section className="overflow-hidden bg-[#11100f] px-4 py-14 text-white sm:py-16 md:px-6 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#c99a4b]">
            Browse the menu
          </p>
          <h2 className="font-serif text-3xl tracking-wide sm:text-4xl lg:text-5xl">
            Catering Menu Flipbook
          </h2>
        </div>

        <div className="hidden lg:block">
          <div className="relative mx-auto aspect-[13/10] w-full max-w-6xl">
            {turn?.isSinglePageTransition ? (
              <DesktopSinglePageTransition turn={turn} onComplete={completeTurn} />
            ) : (
              <>
                <DesktopBookState pages={desktopPages} />
                {turn && <DesktopPageTurn turn={turn} onComplete={completeTurn} />}
              </>
            )}
          </div>
          {desktopControls}
        </div>

        <div className="lg:hidden">
          <div
            className="relative mx-auto aspect-[13/20] w-full max-w-md overflow-hidden rounded-sm sm:max-w-[560px]"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              key={mobilePageIndex}
              initial={{ rotateY: mobileDirection > 0 ? 28 : -28, opacity: 0.88 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.42, ease: [0.35, 0, 0.2, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragEnd={handleMobileSwipe}
              className="absolute inset-0 cursor-grab touch-pan-y overflow-hidden rounded-sm border border-[#c99a4b]/35 bg-black shadow-[0_22px_50px_rgba(0,0,0,0.5)] active:cursor-grabbing"
              style={{
                backfaceVisibility: "hidden",
                transformOrigin: mobileDirection > 0 ? "left center" : "right center",
              }}
              aria-label={`Catering menu page ${mobilePageIndex + 1}`}
            >
              <PageImage
                page={menuPages[mobilePageIndex]}
                sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 560px, 448px"
              />
              <motion.div
                className={`pointer-events-none absolute inset-0 ${mobileDirection > 0 ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-black/45 via-transparent to-transparent`}
                animate={{ opacity: [0.6, 0] }}
                transition={{ duration: 0.42 }}
              />
            </motion.div>
          </div>
          {mobileControls}
          <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-white/45">
            Swipe to turn pages
          </p>
        </div>
      </div>
    </section>
  );
}
