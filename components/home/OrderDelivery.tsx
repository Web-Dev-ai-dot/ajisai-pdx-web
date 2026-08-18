const PROVIDERS = [
  {
    name: "Toast",
    label: "Order for Pickup",
    button: "Order on Toast",
    href: "https://toast.app/r/ajisai-beaverton/order",
  },
  {
    name: "DoorDash",
    label: "Delivery & Pickup",
    button: "Order on DoorDash",
    href: "https://www.doordash.com/store/ajisai-sushi-and-steak-beaverton-38434949/113394000/?pickup=true&src=yp&utm_source_id=4b3a3b62-0272-4a57-8baf-6f65102f9d8c",
  },
  {
    name: "Grubhub",
    label: "Delivery",
    button: "Order on Grubhub",
    href: "https://www.grubhub.com/restaurant/ajisai-sushi-and-steak-4050-sw-114th-ave-beaverton/14508864",
  },
];

export function OrderDelivery() {
  return (
    <section className="w-full bg-[#F9F4E8] py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#C5A059] tracking-[0.25em] text-xs font-bold uppercase block mb-4">
            Order Online
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#5D182E] leading-tight mb-6">
            Delivery &amp; <span className="italic">Pickup</span>
          </h2>
          <p className="text-gray-700 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Enjoy Ajisai at home. Order through your favorite platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROVIDERS.map((provider) => (
            <div
              key={provider.name}
              className="group bg-white rounded-sm shadow-sm hover:shadow-xl border border-transparent hover:border-[#C5A059] transition-all duration-300 hover:-translate-y-1 p-8 flex flex-col items-center text-center"
            >
              {/* Logo placeholder */}
              <div className="w-20 h-20 rounded-full bg-[#F9F4E8] border border-[#5D182E]/10 flex items-center justify-center mb-6">
                <span className="text-[#5D182E] font-serif text-sm">
                  {provider.name}
                </span>
              </div>

              <h3 className="text-2xl font-serif text-[#5D182E] mb-2">
                {provider.name}
              </h3>
              <p className="text-gray-600 text-sm uppercase tracking-widest mb-8">
                {provider.label}
              </p>

              <a
                href={provider.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${provider.button} (opens in a new tab)`}
                className="mt-auto w-full bg-[#C5A059] text-[#111] px-6 py-4 rounded-sm uppercase tracking-widest text-sm font-bold hover:bg-[#5D182E] hover:text-white transition-colors duration-300"
              >
                {provider.button}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
