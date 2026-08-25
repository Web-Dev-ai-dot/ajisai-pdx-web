import type { Metadata } from "next";
import Link from "next/link";
import { ChefCard } from "@/components/chefs/ChefCard";

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
    { name: "Joseph Alcantara",                    tenure: "Hibachi chef since 2019",          image: "/chefs/joseph-alcantara.png" },
    { name: "Brady Benson",                         tenure: "Hibachi chef since 2017",          image: "/chefs/brady-benson.png" },
    { name: "Christopher",                          tenure: "Hibachi chef for about 10 years",  image: "/chefs/christopher.png" },
    { name: "Félix Yu",                             tenure: "Hibachi chef since 1999",          image: "/chefs/felix-yu.png" },
    { name: "Gama",                                 tenure: "Hibachi chef for 3 years",         image: "/chefs/gama.png" },
    { name: "Geovanny",                             tenure: "Hibachi chef for about 3.5 years", image: "/chefs/geovanny.png" },
    { name: "Jacob Valencia",                       tenure: "Hibachi chef for about 6 years",   image: "/chefs/jacob-valencia.png" },
    { name: "Trejan",                               tenure: "Hibachi chef since 2019",          image: "/chefs/trejan.png" },
    { name: "Ismael Samuel Torres Muñoz Salinas",   tenure: "Hibachi chef for 3 years",         image: "/chefs/ismael-torres.png" },
    { name: "Sean Naile",                           tenure: "Hibachi chef since 2014",          image: "/chefs/sean-naile.png" },
    { name: "Scott Sims",                           tenure: "Hibachi chef for almost 5 years",  image: "/chefs/scott-sims.png" },
    { name: "Shane White",                           tenure: "Hibachi chef for 4 years now",      image: "/chefs/shane-white.png" },
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
                        TEPPANYAKI MASTERS
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-balance">
                        <span className="text-white">Meet the Chefs</span><br />
                        <span className="text-[#C5A059]">Behind the Flame</span>
                    </h1>
                    <div className="w-20 h-[2px] bg-[#C5A059] mt-6" />
                </div>
            </section>

            {/* Subheading */}
            <section className="bg-[#0D0D0D] pt-12 pb-4">
                <div className="container mx-auto px-6 max-w-3xl">
                    <p className="text-white/60 font-light text-lg leading-relaxed text-pretty">
                        At Ajisai, hibachi dining is more than a meal. It is a live culinary performance crafted by chefs who have dedicated years to mastering their craft. Each of our teppanyaki chefs brings precision knife skills, expert timing, and genuine showmanship to the iron grill, searing premium steaks, fresh seafood, and seasonal vegetables right before your eyes. From the mesmerizing rhythm of the spatula to the heat of the open flame, every moment at the hibachi table is designed to delight. Whether you are celebrating a special occasion or simply craving an immersive dining experience unlike any other in Beaverton, our chefs make every visit memorable.
                    </p>
                </div>
            </section>

            {/* Chef Grid */}
            <section className="bg-[#0D0D0D] py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {CHEFS.map((chef) => (
                            <ChefCard key={chef.name} {...chef} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#0D0D0D] pb-24 pt-4">
                <div className="container mx-auto px-6">
                    <p className="text-white/60 font-light text-lg mb-8 text-pretty">
                        Ready to watch them in action? Book your table and experience the show.
                    </p>
                    <a
                        href="https://www.ajisaisushisteak.com/reservations"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#C5A059] text-[#0D0D0D] px-10 py-4 rounded-sm uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors duration-300"
                    >
                        RESERVE A TABLE
                    </a>
                </div>
            </section>

        </main>
    );
}
