"use client";

import Image from "next/image";
import { useState } from "react";

type ChefCardProps = {
    name: string;
    tenure: string;
    image: string;
};

export function ChefCard({ name, tenure, image }: ChefCardProps) {
    const isBrady = name === "Brady Benson";
    const [showVideo, setShowVideo] = useState(false);

    return (
        <div className="group relative bg-[#141414] border border-white/5 hover:border-[#C5A059]/40 rounded-sm overflow-hidden transition-all duration-300">
            <div className="relative h-[320px] w-full overflow-hidden bg-[#1c1c1c]">
                {isBrady && showVideo ? (
                    <video
                        src="/chefs/brady-benson-v2.mp4"
                        autoPlay
                        controls
                        playsInline
                        preload="metadata"
                        aria-label="Brady Benson cooking video"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    <Image
                        src={image}
                        alt={`Chef ${name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-5">
                <h2 className="font-serif text-white text-base leading-snug mb-1">
                    {name}
                </h2>
                <p className="text-white/45 text-sm font-light">
                    {tenure}
                </p>
                {isBrady && !showVideo && (
                    <button
                        type="button"
                        onClick={() => setShowVideo(true)}
                        className="mt-4 text-[#C5A059] text-xs uppercase tracking-[0.2em] font-bold hover:text-white transition-colors"
                    >
                        Learn More
                    </button>
                )}
            </div>

            <div className="absolute bottom-0 inset-x-0 h-px bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </div>
    );
}

