import type { Metadata } from "next";
import Image from "next/image";
import { Download, Phone } from "lucide-react";

export const metadata: Metadata = {
    title: "Catering by Ajisai",
    description:
        "Ajisai catering for gatherings, celebrations, corporate events, and special occasions in Beaverton, Oregon.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function CateringPage() {
    return (
        <div className="min-h-screen bg-secondary text-primary">
            <section className="relative flex h-[55vh] min-h-[420px] w-full items-center justify-center overflow-hidden">
                <Image
                    src="/lunch-spread.png"
                    alt="A selection of Ajisai dishes prepared for sharing"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
                    <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-[#C5A059]">
                        Gather. Celebrate. Enjoy.
                    </span>
                    <h1 className="mb-6 font-serif text-5xl leading-tight md:text-6xl lg:text-7xl">
                        Catering by Ajisai
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white/80 md:text-xl">
                        Bring the Ajisai experience to gatherings, celebrations, corporate events, and special occasions with thoughtfully prepared Japanese catering.
                    </p>
                </div>
            </section>

            <section className="px-6 py-20 md:py-24">
                <div className="container mx-auto max-w-4xl text-center">
                    <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-accent">
                        Explore the Menu
                    </span>
                    <h2 className="mb-6 font-serif text-4xl md:text-5xl">Catering Menu</h2>
                    <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-primary/70">
                        Browse our catering selections for shareable appetizers, sushi, hibachi favorites, lunch boxes, salads, beverages, and more.
                    </p>
                    <a
                        href="/catering/ajisai-catering-menu.pdf"
                        download
                        className="inline-flex items-center gap-3 rounded-sm bg-primary px-8 py-4 text-sm uppercase tracking-widest text-secondary transition-colors duration-300 hover:bg-accent hover:text-primary"
                    >
                        <Download className="h-5 w-5" aria-hidden="true" />
                        Download Catering Menu
                    </a>
                </div>
            </section>

            <section className="bg-primary px-6 py-20 text-secondary md:py-24">
                <div className="container mx-auto max-w-4xl text-center">
                    <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-accent">
                        Plan Your Event
                    </span>
                    <h2 className="mb-6 font-serif text-4xl md:text-5xl">How to Order</h2>
                    <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-secondary/80">
                        Catering reservations and orders are currently handled by phone. Call our team to discuss your event, menu selections, serving needs, and pickup or delivery details.
                    </p>
                    <a
                        href="tel:9717273180"
                        className="inline-flex items-center gap-3 rounded-sm border border-accent bg-accent px-8 py-4 text-sm uppercase tracking-widest text-primary transition-colors duration-300 hover:bg-secondary hover:text-primary"
                    >
                        <Phone className="h-5 w-5" aria-hidden="true" />
                        Call to Order
                    </a>
                    <p className="mt-8 text-sm font-light text-secondary/60">
                        Questions about your catering order? Call us at (971) 727-3180 and we will be happy to help.
                    </p>
                </div>
            </section>
        </div>
    );
}
