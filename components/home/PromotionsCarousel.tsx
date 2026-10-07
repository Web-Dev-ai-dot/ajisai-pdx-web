"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const REWARDS_URL = "https://www.toasttab.com/ajisai-beaverton/rewardsSignup?fbclid=PAZXh0bgNhZW0CMTEAcGRvZgRzcnRjBmFwcF9pZAwyNTYyODEwNDA1NTgAAaeXdTCjEHOPdy8-5TofNhhfqM2m5FALPUsBKnPRuGzK4aL4frA6CGadvH_8lA_aem_XEoDPbkJ2DHxtzmBnypRug&utm_id=97760_v0_s00_e0_tv6_a1denni1wfsq0g";

const promotions = [
    {
        eyebrow: "Football Happy Hour",
        title: "Catch the NFL Games at Ajisai",
        description: "Watch the games with us and enjoy Football Happy Hour specials at the bartop.",
        details: ["Sunday — All day", "Monday — During the game", "Thursday — During the game"],
    },
    {
        eyebrow: "Daily Happy Hour",
        title: "Happy Hour, Every Day",
        description: "Join us for sushi rolls, appetizers, drinks, and more.",
        details: ["Bartop — 2PM–6PM", "Lounge — 2PM–5PM"],
    },
    {
        eyebrow: "Ajisai Rewards",
        title: "Get Rewarded Every Time You Dine",
        description: "Join Ajisai Rewards and earn points while you celebrate, dine, and gather with us.",
        details: [],
        href: REWARDS_URL,
    },
    {
        eyebrow: "Monday Special",
        title: "Kids Meals 50% Off",
        description: "Valid with the purchase of an adult entrée. Available for kids 12 and under.",
        details: [],
    },
    {
        eyebrow: "Tuesday Special",
        title: "A Special Tuesday Treat for Ladies",
        description: "Enjoy 15% off all wine, beer, and hot sake all day long.",
        details: [],
    },
];

export default function PromotionsCarousel() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<Array<HTMLElement | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const goToSlide = (index: number) => {
        const boundedIndex = Math.min(Math.max(index, 0), promotions.length - 1);
        const slider = sliderRef.current;
        const card = cardRefs.current[boundedIndex];

        if (!slider || !card) return;
        const left = card.getBoundingClientRect().left - slider.getBoundingClientRect().left + slider.scrollLeft;
        slider.scrollTo({ left, behavior: "smooth" });
        setActiveIndex(boundedIndex);
    };

    const updateActiveSlide = () => {
        const slider = sliderRef.current;
        if (!slider) return;
        const sliderLeft = slider.getBoundingClientRect().left;

        const closestIndex = cardRefs.current.reduce((closest, card, index) => {
            if (!card) return closest;
            const currentCard = cardRefs.current[closest];
            if (!currentCard) return index;

            return Math.abs(card.getBoundingClientRect().left - sliderLeft) <
                Math.abs(currentCard.getBoundingClientRect().left - sliderLeft)
                ? index
                : closest;
        }, 0);

        setActiveIndex(closestIndex);
    };

    return (
        <section className="w-full overflow-hidden bg-[#F9F4E8] py-20 md:py-24">
            <div className="container mx-auto px-6">
                <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#C5A059]">
                        Specials &amp; Rewards
                    </p>
                    <h2 className="mb-4 font-serif text-4xl text-[#5D182E] md:text-5xl">
                        More Reasons to Visit
                    </h2>
                    <p className="text-base font-light leading-relaxed text-gray-700 md:text-lg">
                        Explore our current specials, happy hours, and rewards.
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    <div
                        ref={sliderRef}
                        onScroll={updateActiveSlide}
                        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        aria-label="Current promotions"
                    >
                        {promotions.map((promotion, index) => (
                            <article
                                key={promotion.title}
                                ref={(element) => { cardRefs.current[index] = element; }}
                                className="flex min-h-[350px] flex-[0_0_100%] snap-start flex-col justify-between rounded-sm border border-[#C5A059]/35 bg-[#5D182E] p-7 text-white shadow-lg sm:min-h-[330px] sm:p-9 lg:p-12"
                            >
                                <div>
                                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#C5A059]">
                                        {promotion.eyebrow}
                                    </p>
                                    <h3 className="max-w-3xl font-serif text-3xl leading-tight md:text-4xl">
                                        {promotion.title}
                                    </h3>
                                    <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-white/75 md:text-lg">
                                        {promotion.description}
                                    </p>
                                    {promotion.details.length > 0 && (
                                        <ul className="mt-7 space-y-2 text-sm tracking-wide text-white/85 md:text-base">
                                            {promotion.details.map((detail) => (
                                                <li key={detail}>{detail}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {promotion.href && (
                                    <a
                                        href={promotion.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-8 inline-flex min-h-11 w-fit items-center justify-center rounded-sm border border-[#C5A059] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#C5A059] transition-colors hover:bg-[#C5A059] hover:text-[#111]"
                                    >
                                        Join Ajisai Rewards
                                    </a>
                                )}
                            </article>
                        ))}
                    </div>

                    <div className="mt-7 flex items-center justify-between gap-5">
                        <div className="flex gap-2" aria-label={`Slide ${activeIndex + 1} of ${promotions.length}`}>
                            {promotions.map((promotion, index) => (
                                <button
                                    key={promotion.title}
                                    type="button"
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to promotion ${index + 1}`}
                                    className={`h-2.5 rounded-full transition-all ${activeIndex === index ? "w-8 bg-[#5D182E]" : "w-2.5 bg-[#5D182E]/25 hover:bg-[#5D182E]/50"}`}
                                />
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => goToSlide(activeIndex - 1)}
                                disabled={activeIndex === 0}
                                aria-label="Previous promotion"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#5D182E]/35 text-[#5D182E] transition-colors hover:border-[#5D182E] hover:bg-[#5D182E] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                type="button"
                                onClick={() => goToSlide(activeIndex + 1)}
                                disabled={activeIndex === promotions.length - 1}
                                aria-label="Next promotion"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#5D182E]/35 text-[#5D182E] transition-colors hover:border-[#5D182E] hover:bg-[#5D182E] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
