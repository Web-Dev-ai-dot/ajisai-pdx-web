"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ChefCardProps = {
    name: string;
    tenure: string;
    image: string;
};

export function ChefCard({ name, tenure, image }: ChefCardProps) {
    const isBrady = name === "Brady Benson";
    const isChristopher = name === "Christopher";
    const isFelix = name === "Félix Yu";
    const hasVideo = isBrady || isChristopher || isFelix;
    const [showVideo, setShowVideo] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const [isCompactViewport, setIsCompactViewport] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setIsHydrated(true);
        const mediaQuery = window.matchMedia("(max-width: 1023px)");
        const updateViewport = () => setIsCompactViewport(mediaQuery.matches);
        updateViewport();
        mediaQuery.addEventListener("change", updateViewport);
        return () => mediaQuery.removeEventListener("change", updateViewport);
    }, []);

    useEffect(() => {
        if (!showVideo) {
            videoRef.current?.pause();
            setIsPlaying(false);
        }
    }, [showVideo]);

    const togglePlayback = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            void video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <>
            <div className="group relative bg-[#141414] border border-white/5 hover:border-[#C5A059]/40 rounded-sm overflow-hidden transition-all duration-300">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1c1c1c]">
                    {isHydrated && (isFelix || isChristopher) && isCompactViewport && showVideo ? (
                        <video
                            ref={videoRef}
                            src={isFelix ? "/chefs/felix-yu-v1.mp4" : "/chefs/christopher-v3.mp4"}
                            autoPlay
                            playsInline
                            preload="metadata"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            aria-label="Félix Yu cooking video"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : isHydrated && isBrady && showVideo ? (
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
                    {isHydrated && isCompactViewport && !showVideo && (
                        <button
                            type="button"
                            onClick={() => { if (hasVideo) setShowVideo(true); }}
                            className="absolute inset-0 flex items-center justify-center"
                            aria-label={hasVideo ? `Play ${name} cooking video` : `${name} photo`}
                        >
                            {hasVideo && (
                                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C5A059] bg-[#0D0D0D]/60 text-white transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                                    <span className="ml-1 text-lg">▶</span>
                                </span>
                            )}
                        </button>
                    )}
                    {isHydrated && isFelix && showVideo && (
                        <button
                            type="button"
                            onClick={togglePlayback}
                            className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#C5A059] bg-[#0D0D0D]/75 text-white transition-colors hover:bg-[#C5A059] hover:text-[#0D0D0D]"
                            aria-label={isPlaying ? `Pause ${name} video` : `Play ${name} video`}
                        >
                            <span aria-hidden="true" className="text-sm">{isPlaying ? "Ⅱ" : "▶"}</span>
                        </button>
                    )}
                    {!isFelix && (
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent pointer-events-none" />
                    )}
                </div>

                <div className="p-5">
                    <h2 className="font-serif text-white text-base leading-snug mb-1">{name}</h2>
                    <p className="text-white/45 text-sm font-light">{tenure}</p>
                    {isHydrated && !isCompactViewport && (
                        <button
                            type="button"
                            onClick={() => { if (hasVideo) setShowVideo(true); }}
                            className="mt-4 text-[#C5A059] text-xs uppercase tracking-[0.2em] font-bold hover:text-white transition-colors"
                            aria-label={hasVideo ? `Learn more about ${name}` : `${name} photo`}
                        >
                            Learn More
                        </button>
                    )}
                </div>

                <div className="absolute bottom-0 inset-x-0 h-px bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>

            {isHydrated && !isCompactViewport && (isChristopher || isFelix) && showVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0D]/90 p-4 sm:p-8"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${name} cooking video`}
                    onClick={(event) => {
                        if (event.target === event.currentTarget) setShowVideo(false);
                    }}
                >
                    <div className="relative w-full max-w-lg overflow-hidden rounded-sm bg-[#141414] shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setShowVideo(false)}
                            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#0D0D0D]/80 text-2xl leading-none text-white hover:bg-[#C5A059] hover:text-[#0D0D0D] transition-colors"
                            aria-label={`Close ${name} video`}
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="relative aspect-[9/16] w-full bg-[#0D0D0D]">
                            <video
                                ref={videoRef}
                                src={isChristopher ? "/chefs/christopher-v3.mp4" : "/chefs/felix-yu-v1.mp4"}
                                autoPlay
                                playsInline
                                preload="metadata"
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                aria-label={`${name} cooking video`}
                                className="absolute inset-0 h-full w-full object-contain"
                            />
                            <button
                                type="button"
                                onClick={togglePlayback}
                                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C5A059] bg-[#0D0D0D]/70 text-white hover:bg-[#C5A059] hover:text-[#0D0D0D] transition-colors"
                                aria-label={isPlaying ? "Pause Christopher video" : "Play Christopher video"}
                            >
                                <span aria-hidden="true" className="text-xl">
                                    {isPlaying ? "Ⅱ" : "▶"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
