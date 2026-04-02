"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

function FloatingPaths({ position }: { position: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - window.innerWidth / 2);
            mouseY.set(e.clientY - window.innerHeight / 2);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: i % 2 === 0 ? "rgba(60,249,26,0.15)" : "rgba(60,249,26,0.05)",
        width: 0.5 + i * 0.03,
    }));

    // Mouse parallax effect for paths
    const translateX = useTransform(springX, (val) => val * 0.05 * position);
    const translateY = useTransform(springY, (val) => val * 0.05 * position);

    return (
        <motion.div 
            style={{ x: translateX, y: translateY }}
            className="absolute inset-0 pointer-events-none"
        >
            <svg
                className="w-full h-full text-primary-container"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.015}
                        initial={{ pathLength: 0.3, opacity: 0.5 }}
                        animate={{
                            pathLength: [0.3, 1, 0.3],
                            opacity: [0.2, 0.5, 0.2],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 15 + Math.random() * 15,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </motion.div>
    );
}

export function BackgroundPaths({
    title = "F*CK THE RULES.",
}: {
    title?: string;
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black mb-12 tracking-tighter uppercase leading-[0.8]">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 80, opacity: 0, filter: "blur(10px)" }}
                                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.05,
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 15,
                                        }}
                                        className="inline-block text-primary-container"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <div
                        className="inline-block group relative bg-primary-container/10 p-px rounded-2xl backdrop-blur-lg 
                        overflow-hidden shadow-[0_0_20px_rgba(60,249,26,0.1)] hover:shadow-[0_0_30px_rgba(60,249,26,0.2)] transition-shadow duration-300"
                    >
                        <Button
                            variant="ghost"
                            className="rounded-xl px-12 py-8 text-2xl font-black uppercase tracking-tighter backdrop-blur-md 
                            bg-primary-container text-black hover:bg-white transition-all duration-300 
                            group-hover:-translate-y-1 border-2 border-primary-container
                            hover:shadow-lg shadow-black"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                Start a riot
                            </span>
                            <span
                                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-2 
                                transition-all duration-300"
                            >
                                →
                            </span>
                        </Button>
                    </div>
                </motion.div>
            </div>
            
            {/* Scanline and Grain integration for this specific section */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>
        </div>
    );
}
