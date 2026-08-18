import { ChevronRight } from "lucide-react";

const PROVIDERS = [
  {
    name: "Toast",
    tag: "Pickup",
    button: "Order Now",
    href: "https://toast.app/r/ajisai-beaverton/order",
  },
  {
    name: "DoorDash",
    tag: "Delivery & Pickup",
    button: "Order Now",
    href: "https://www.doordash.com/store/ajisai-sushi-and-steak-beaverton-38434949/113394000/?pickup=true&src=yp&utm_source_id=4b3a3b62-0272-4a57-8baf-6f65102f9d8c",
  },
  {
    name: "Grubhub",
    tag: "Delivery",
    button: "Order Now",
    href: "https://www.grubhub.com/restaurant/ajisai-sushi-and-steak-4050-sw-114th-ave-beaverton/14508864",
  },
];

export function OrderDelivery() {
  return (
    <section className="relative w-full bg-[#5C1A2E] pt-10 md:pt-16 pb-12 md:pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
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

        <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-6 md:mx-0 px-6 md:px-0">
          {PROVIDERS.map((provider) => (
            <div
              key={provider.name}
              className="group snap-start shrink-0 w-[78%] sm:w-[60%] md:w-auto bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 px-6 py-6 md:px-8 md:py-10 flex flex-col items-center text-center"
            >
              <h3 className="text-2xl md:text-3xl font-serif text-[#C9A24B] mb-2">
                {provider.name}
              </h3>
              <p className="text-[#5C1A2E]/60 text-xs md:text-sm uppercase tracking-widest mb-3">
                {provider.tag}
              </p>

              <div className="w-10 h-px bg-[#C9A24B]/50 mb-4 md:mb-6" />

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
          ))}
        </div>
      </div>
    </section>
  );
}
