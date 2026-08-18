"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const PROVIDERS = [
  {
    name: "Toast",
    tag: "Pickup",
    button: "Order Now",
    numeral: "01",
    href: "https://toast.app/r/ajisai-beaverton/order",
  },
  {
    name: "DoorDash",
    tag: "Delivery & Pickup",
    button: "Order Now",
    numeral: "02",
    href: "https://www.doordash.com/store/ajisai-sushi-and-steak-beaverton-38434949/113394000/?pickup=true&src=yp&utm_source_id=4b3a3b62-0272-4a57-8baf-6f65102f9d8c",
  },
  {
    name: "Grubhub",
    tag: "Delivery",
    button: "Order Now",
    numeral: "03",
    href: "https://www.grubhub.com/restaurant/ajisai-sushi-and-steak-4050-sw-114th-ave-beaverton/14508864",
  },
];

function ProviderCard({ provider }: { provider: (typeof PROVIDERS)[number] }) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 border border-transparent hover:border-[#C9A24B]/60 px-7 py-8 md:px-9 md:py-11 flex flex-col items-center text-center h-full">
      {/* Watermark numeral */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 right-2 font-serif text-[6.5rem] md:text-[7.5rem] leading-none text-[#5C1A2E]/[0.05] select-none"
      >
        {provider.numeral}
      </span>

      <div className="relative z-10 flex flex-col items-center flex-1">
        <h3 className="text-2xl md:text-3xl font-serif text-[#C9A24B] mb-2">
          {provider.name}
        </h3>
        <p className="text-[#5C1A2E]/60 text-xs md:text-sm uppercase tracking-widest mb-4">
          {provider.tag}
        </p>

        <div className="w-10 h-px bg-[#C9A24B]/50 mb-5 md:mb-6" />

        <a
          href={provider.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Order now on ${provider.name} (opens in a new tab)`}
          className="mt-auto inline-flex items-center gap-1.5 text-[#5C1A2E] text-sm font-semibold uppercase tracking-widest hover:text-[#C9A24B] transition-colors duration-300"
        >
          {provider.button}
          <ChevronRight
            className="transition-transform duration-300 group-hover:translate-x-1"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
}

export function OrderDelivery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement | undefined;
    if (card) {
      container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, children } = container;
      let closestIndex = 0;
      let closestDistance = Infinity;
      Array.from(children).forEach((child, index) => {
        const el = child as HTMLElement;
        const distance = Math.abs(el.offsetLeft - container.offsetLeft - scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full bg-[#5C1A2E] pt-10 md:pt-16 pb-12 md:pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-14">
          <span className="text-[#C9A24B] tracking-[0.25em] text-xs font-bold uppercase block mb-4">
            Order Online
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-4 text-balance">
            Enjoy Ajisai <span className="italic text-[#C9A24B]">at Home</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed text-pretty">
            Order delivery or pickup through your favorite platform.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {PROVIDERS.map((provider) => (
            <ProviderCard key={provider.name} provider={provider} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="relative -mx-6 px-6">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
              style={{ scrollPaddingLeft: "1.5rem" }}
            >
              {PROVIDERS.map((provider) => (
                <div
                  key={provider.name}
                  className="snap-center shrink-0 w-[82%]"
                >
                  <ProviderCard provider={provider} />
                </div>
              ))}
              {/* trailing spacer so the last card can center */}
              <div className="shrink-0 w-[9%]" aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
              disabled={activeIndex === 0}
              aria-label="Previous provider"
              className="text-[#C9A24B] disabled:text-white/25 transition-colors duration-300"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Order provider selector">
              {PROVIDERS.map((provider, index) => (
                <button
                  key={provider.name}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  aria-label={`Show ${provider.name}`}
                  onClick={() => scrollToIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "w-6 bg-[#C9A24B]" : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(activeIndex + 1, PROVIDERS.length - 1))}
              disabled={activeIndex === PROVIDERS.length - 1}
              aria-label="Next provider"
              className="text-[#C9A24B] disabled:text-white/25 transition-colors duration-300"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
