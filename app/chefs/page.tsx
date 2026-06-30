import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";

export const metadata: Metadata = {
    title: "Meet the Chefs | Ajisai Sushi Steak",
    description:
        "Meet the hibachi chefs behind the flame at Ajisai in Beaverton, OR. Years of craft and showmanship — turning every meal into an unforgettable performance.",
    openGraph: {
        title: "Meet the Chefs | Ajisai Sushi Steak",
        description:
            "Meet the hibachi chefs behind the flame at Ajisai in Beaverton, OR.",
        url: "https://www.ajisaisushisteak.com/chefs",
    },
};

const CHEFS = [
    { name: "Joseph Alcantara",                    tenure: "Hibachi chef since 2019" },
    { name: "Jacob Valencia",                       tenure: "Hibachi chef for about 6 years" },
    { name: "Trejan",                               tenure: "Hibachi chef since 2019" },
    { name: "Félix Yu",                             tenure: "Hibachi chef since 1999" },
    { name: "Ismael Samuel Torres Muñoz Salinas",   tenure: "Hibachi chef for 3 years" },
    { name: "Brady Benson",                         tenure: "Hibachi chef since 2017" },
    { name: "Sean Naile",                           tenure: "Hibachi chef since 2014" },
    { name: "Christopher",                          tenure: "Hibachi chef for about 10 years" },
    { name: "Geovanny",                             tenure: "Hibachi chef for about 3.5 years" },
    { name: "Gama",                                 tenure: "Hibachi chef for 3 years" },
    { name: "Scott Sims",                           tenure: "Hibachi chef for almost 5 years" },
];

export default function ChefsPage() {
    return (
        <main className="min-h-screen bg-[#0D0D0D] text-white">

            {/* Hero Banner */}
            <section className="relative w-full h-[52vh] min-h-[360px] flex items-end overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a10] via-[#2a0d1a] to-[#0D0D0D]" />
                {/* Flame accent line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />
                <div className="relative container mx-auto px-6 pb-16">
                    <span className="text-[#C5A059] tracking-[0.25em] text-xs font-bold uppercase block mb-4">
                        Teppanyaki Masters
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-balance">
                        Meet the Chefs<br />
                        <span className="text-[#C5A059]">Behind the Flame</span>
                    </h1>
                    <div className="w-20 h-px bg-[#C5A059] mt-6" />
                </div>
            </section>

            {/* Subheading */}
            <section className="bg-[#0D0D0D] pt-12 pb-4">
                <div className="container mx-auto px-6 max-w-3xl">
                    <p className="text-white/60 font-light text-lg leading-relaxed text-pretty">
                        Our hibachi chefs bring years of craft and showmanship to every table —
                        turning each meal into a performance you will not forget.
                    </p>
                </div>
            </section>

            {/* Chef Grid */}
            <section className="bg-[#0D0D0D] py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {CHEFS.map((chef) => (
                            <div
                                key={chef.name}
                                className="group relative bg-[#141414] border border-white/5 hover:border-[#C5A059]/40 rounded-sm overflow-hidden transition-all duration-300"
                            >
                                {/* Photo */}
                                <div className="relative h-[320px] w-full overflow-hidden bg-[#1c1c1c]">
                                    <Image
                                        src="/placeholder.svg?height=400&width=320"
                                        alt={`Chef ${chef.name}`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <div className="flex items-start gap-2 mb-1">
                                        <Flame
                                            className="text-[#C5A059] shrink-0 mt-0.5"
                                            size={14}
                                        />
                                        <h2 className="font-serif text-white text-base leading-snug">
                                            {chef.name}
                                        </h2>
                                    </div>
                                    <p className="text-white/45 text-sm font-light pl-5">
                                        {chef.tenure}
                                    </p>
                                </div>

                                {/* Gold bottom accent on hover */}
                                <div className="absolute bottom-0 inset-x-0 h-px bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#0D0D0D] pb-24 pt-4">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-white/50 font-light mb-8 text-pretty">
                        Ready to watch them in action? Book your table and experience the show.
                    </p>
                    <Link
                        href="/reservations"
                        className="inline-block bg-[#C5A059] text-[#0D0D0D] px-10 py-4 rounded-sm uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors duration-300"
                    >
                        Reserve a Table
                    </Link>
                </div>
            </section>

        </main>
    );
}
