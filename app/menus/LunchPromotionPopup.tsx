"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

interface LunchPromotionPopupProps {
    onViewLunch: () => void;
}

export default function LunchPromotionPopup({ onViewLunch }: LunchPromotionPopupProps) {
    const [isOpen, setIsOpen] = useState(true);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeButtonRef.current?.focus();

        const handleEscape = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "Tab" || !dialogRef.current) return;

        const focusable = Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
                'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
            ),
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    const viewLunch = () => {
        setIsOpen(false);
        onViewLunch();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6"
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setIsOpen(false);
                    }}
                >
                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="lunch-promotion-title"
                        aria-describedby="lunch-promotion-description"
                        onKeyDown={handleDialogKeyDown}
                        className="relative grid max-h-[calc(100vh-2rem)] w-full max-w-4xl overflow-y-auto rounded-sm border border-[#C5A059]/45 bg-[#481029] shadow-2xl md:grid-cols-[0.9fr_1.1fr]"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: "easeOut" }}
                    >
                        <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-[#1A0A10]/75 text-white transition-colors hover:border-[#C5A059] hover:text-[#C5A059] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                            aria-label="Close lunch promotion"
                        >
                            <X aria-hidden="true" className="h-5 w-5" />
                        </button>

                        <div className="relative min-h-52 overflow-hidden md:min-h-full">
                            <Image
                                src="/lunch-spread.png"
                                alt="A spread of Ajisai lunch dishes"
                                fill
                                sizes="(max-width: 767px) calc(100vw - 2rem), 40vw"
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#481029]/45 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#481029]/30" />
                        </div>

                        <div className="flex flex-col justify-center px-7 py-10 text-center sm:px-10 md:px-12 md:py-14 md:text-left">
                            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C5A059]">
                                Lunch Special
                            </p>
                            <h2
                                id="lunch-promotion-title"
                                className="mt-4 font-serif text-3xl leading-tight text-[#F9F4E8] sm:text-4xl"
                            >
                                A Lunch Worth Leaving Your Desk For
                            </h2>
                            <p className="mt-5 font-serif text-2xl text-[#C5A059]">
                                Starting at $13
                            </p>
                            <p
                                id="lunch-promotion-description"
                                className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base"
                            >
                                Available Monday through Friday, 11:00 AM–3:00 PM.
                            </p>
                            <button
                                type="button"
                                onClick={viewLunch}
                                className="mx-auto mt-7 inline-flex min-h-12 items-center justify-center rounded-sm bg-[#C5A059] px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#111] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#481029] md:mx-0"
                            >
                                View Lunch Menu
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
