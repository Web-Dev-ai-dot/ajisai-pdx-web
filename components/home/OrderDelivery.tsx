"use client";

import { ChevronRight } from "lucide-react";

const PROVIDERS = [
  {
    name: "Toast",
    tag: "Pickup",
    href: "https://toast.app/r/ajisai-beaverton/order",
  },
  {
    name: "DoorDash",
    tag: "Delivery & Pickup",
    href: "https://www.doordash.com/store/ajisai-sushi-and-steak-beaverton-38434949/113394000/?pickup=true&src=yp&utm_source_id=4b3a3b62-0272-4a57-8baf-6f65102f9d8c",
  },
  {
    name: "Grubhub",
    tag: "Delivery",
    href: "https://www.grubhub.com/restaurant/ajisai-sushi-and-steak-4050-sw-114th-ave-beaverton/14508864",
  },
];

export function OrderDelivery() {
  return (
    <section className="relative w-full overflow-hidden">
      {/*
        IMAGE PLACEHOLDER
        Replace the backgroundImage below with a real Ajisai sushi/interior
        photo, e.g.:
        style={{ backgroundImage: "url('/images/order-online-bg.jpg')" }}
        Until then this falls back to a solid burgundy background so the
        section still reads correctly.
      */}
      <div
        className="absolute inset-0 bg-[#5C1A2E] bg-cover bg-center"
        style={{ backgroundImage: "" }}
        aria-hidden="true"
      />

      {/* Burgundy overlay for text contrast */}
      <div className="absolute inset-0 bg-[#5C1A2E]/75" aria-hidden="true" />
      {/* Bottom gradient for extra contrast near lower content */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-28">
        <div className="text-center mb-10 md:mb-16">
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

        {/* Desktop: inline row with vertical dividers */}
        <div className="hidden md:flex items-center justify-center">
          {PROVIDERS.map((provider, index) => (
            <div key={provider.name} className="flex items-center">
              {index > 0 && (
                <div
                  className="w-px h-16 bg-[#C9A24B]/40 mx-10 md:mx-14"
                  aria-hidden="true"
                />
              )}
              <a
                href={provider.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Order now on ${provider.name} (opens in a new tab)`}
                className="group flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
              >
                <span className="relative text-3xl md:text-4xl font-serif text-[#C9A24B] group-hover:text-white transition-colors duration-300">
                  {provider.name}
                  <span className="absolute left-0 -bottom-1.5 h-px w-0 bg-[#C9A24B] transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="mt-3 text-white/60 text-xs uppercase tracking-widest">
                  {provider.tag}
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Mobile: stacked full-width rows */}
        <div className="md:hidden max-w-sm mx-auto divide-y divide-[#C9A24B]/30">
          {PROVIDERS.map((provider) => (
            <a
              key={provider.name}
              href={provider.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order now on ${provider.name} (opens in a new tab)`}
              className="group flex items-center justify-between gap-4 py-5"
            >
              <span className="flex flex-col">
                <span className="text-2xl font-serif text-[#C9A24B]">
                  {provider.name}
                </span>
                <span className="mt-1 text-white/60 text-xs uppercase tracking-widest">
                  {provider.tag}
                </span>
              </span>
              <ChevronRight
                className="text-[#C9A24B] transition-transform duration-300 group-hover:translate-x-1 shrink-0"
                size={20}
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
