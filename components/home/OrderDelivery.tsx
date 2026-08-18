import { ShoppingBag, Bike, Truck } from "lucide-react";

const PROVIDERS = [
  {
    name: "Toast",
    tag: "Pickup",
    button: "Order Now",
    href: "https://toast.app/r/ajisai-beaverton/order",
    Icon: ShoppingBag,
  },
  {
    name: "DoorDash",
    tag: "Delivery & Pickup",
    button: "Order Now",
    href: "https://www.doordash.com/store/ajisai-sushi-and-steak-beaverton-38434949/113394000/?pickup=true&src=yp&utm_source_id=4b3a3b62-0272-4a57-8baf-6f65102f9d8c",
    Icon: Bike,
  },
  {
    name: "Grubhub",
    tag: "Delivery",
    button: "Order Now",
    href: "https://www.grubhub.com/restaurant/ajisai-sushi-and-steak-4050-sw-114th-ave-beaverton/14508864",
    Icon: Truck,
  },
];

export function OrderDelivery() {
  return (
    <section className="relative w-full bg-[#F7F1E4] pt-10 md:pt-14 pb-16 md:pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[#C9A24B] tracking-[0.25em] text-xs font-bold uppercase block mb-4">
            Order Online
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#5D182E] leading-tight mb-4 text-balance">
            Enjoy Ajisai <span className="italic text-[#C9A24B]">at Home</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed text-pretty">
            Order delivery or pickup through your favorite platform.
          </p>
        </div>

        {/* Cards: overlap upward slightly on desktop to sit between sections */}
        <div className="relative md:-mt-6 -mx-6 md:mx-0 px-6 md:px-0 flex md:grid md:grid-cols-3 gap-3 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide">
          {PROVIDERS.map((provider) => {
            const { Icon } = provider;
            return (
              <div
                key={provider.name}
                className="group snap-start shrink-0 w-[78%] sm:w-[60%] md:w-auto bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 px-5 py-6 md:px-8 md:py-10 flex flex-col items-center text-center"
              >
                {/* Logo placeholder */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#F7F1E4] flex items-center justify-center mb-4 md:mb-5">
                  <Icon
                    className="text-[#C9A24B]"
                    size={26}
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-xl md:text-2xl font-serif text-[#5D182E] mb-1">
                  <span className="text-[#C9A24B]">{provider.name}</span>
                </h3>
                <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest mb-5 md:mb-7">
                  {provider.tag}
                </p>

                <a
                  href={provider.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Order now on ${provider.name} (opens in a new tab)`}
                  className="mt-auto text-[#C9A24B] text-sm font-semibold uppercase tracking-widest hover:text-[#5D182E] transition-colors duration-300"
                >
                  {provider.button}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
