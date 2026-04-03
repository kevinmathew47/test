"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "> INITIALIZING SYSTEMS...",
  "> LOADING NEURAL NETWORKS...",
  "> CALIBRATING INTERFACES...",
  "> SCANNING DIGITAL ASSETS...",
  "> ESTABLISHING CONNECTIONS...",
  "> ALL SYSTEMS OPERATIONAL.",
  "> WELCOME TO NUESTRO.",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(onComplete, 800);
  }, [onComplete]);

  // Progress bar animation
  useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const step = (100 / duration) * interval;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + step + Math.random() * 0.5, 100);
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  // Boot text lines
  useEffect(() => {
    const lineInterval = 3000 / bootLines.length;
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= bootLines.length) {
          clearInterval(timer);
          return bootLines.length;
        }
        return prev + 1;
      });
    }, lineInterval);
    return () => clearInterval(timer);
  }, []);

  // Auto complete when progress reaches 100
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(handleComplete, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, handleComplete]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="loading"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-sans overflow-hidden"
        >
          {/* Scanline overlay */}
          <div className="loading-scanlines" />

          {/* Grain overlay */}
          <div className="grain-overlay" style={{ zIndex: 10 }} />

          {/* Glitch Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-12"
          >
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase glitch-text" data-text="NUESTRO">
              NUESTRO
            </h1>
            <div className="absolute -bottom-3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--neon-green)] to-transparent opacity-60" />
          </motion.div>

          {/* Boot Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-lg px-8 mb-10 font-mono text-xs md:text-sm space-y-1.5 h-[180px] overflow-hidden"
          >
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`${
                  i === visibleLines - 1
                    ? "text-[var(--neon-green)]"
                    : "text-white/40"
                } ${i === bootLines.length - 1 ? "text-[var(--neon-green)] font-bold" : ""}`}
              >
                {line}
                {i === visibleLines - 1 && (
                  <span className="inline-block w-2 h-4 bg-[var(--neon-green)] ml-1 animate-pulse align-middle" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-lg w-full px-8"
          >
            <div className="flex justify-between items-center mb-2 text-[10px] font-mono tracking-widest uppercase">
              <span className="text-white/40">Loading</span>
              <span className="text-[var(--neon-green)]">{Math.floor(progress)}%</span>
            </div>
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--neon-green)] rounded-full relative"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--neon-green)] shadow-[0_0_12px_var(--neon-green),0_0_24px_var(--neon-green)]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={handleComplete}
            className="absolute bottom-8 right-8 text-[10px] font-mono tracking-widest text-white/30 hover:text-[var(--neon-green)] transition-colors uppercase"
          >
            SKIP →
          </motion.button>

          {/* Decorative corner brackets */}
          <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-[var(--neon-green)]/30" />
          <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-[var(--neon-green)]/30" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-[var(--neon-green)]/30" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-[var(--neon-green)]/30" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
