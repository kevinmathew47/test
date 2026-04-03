"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"ring" | "text" | "ready">("ring");
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(onComplete, 1000);
  }, [onComplete]);

  // Canvas energy ring animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 300;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = 80;
    let startTime = Date.now();

    const draw = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      ctx.clearRect(0, 0, size, size);

      // Outer pulsing ring
      const pulseScale = 1 + Math.sin(elapsed * 2) * 0.05;
      const outerRadius = radius * pulseScale;

      // Rotating arc segments
      const numArcs = 3;
      for (let i = 0; i < numArcs; i++) {
        const startAngle = (elapsed * (1.5 + i * 0.3)) + (i * Math.PI * 2) / numArcs;
        const arcLength = Math.PI * 0.6 + Math.sin(elapsed * 3 + i) * 0.3;

        const gradient = ctx.createLinearGradient(
          cx + Math.cos(startAngle) * outerRadius,
          cy + Math.sin(startAngle) * outerRadius,
          cx + Math.cos(startAngle + arcLength) * outerRadius,
          cy + Math.sin(startAngle + arcLength) * outerRadius
        );
        gradient.addColorStop(0, `rgba(191, 255, 0, 0)`);
        gradient.addColorStop(0.3, `rgba(191, 255, 0, ${0.6 + Math.sin(elapsed * 2 + i) * 0.3})`);
        gradient.addColorStop(0.7, `rgba(191, 255, 0, ${0.8 + Math.sin(elapsed * 3 + i) * 0.2})`);
        gradient.addColorStop(1, `rgba(191, 255, 0, 0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, outerRadius, startAngle, startAngle + arcLength);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Inner ring (subtle)
      const innerRadius = radius * 0.7;
      ctx.beginPath();
      ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(191, 255, 0, ${0.08 + Math.sin(elapsed * 4) * 0.04})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Glow center dot
      const dotGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
      dotGlow.addColorStop(0, `rgba(191, 255, 0, ${0.4 + Math.sin(elapsed * 3) * 0.2})`);
      dotGlow.addColorStop(0.5, `rgba(191, 255, 0, 0.1)`);
      dotGlow.addColorStop(1, `rgba(191, 255, 0, 0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = dotGlow;
      ctx.fill();

      // Orbiting particles
      const numParticles = 12;
      for (let i = 0; i < numParticles; i++) {
        const angle = (elapsed * 0.8) + (i * Math.PI * 2) / numParticles;
        const particleRadius = radius + Math.sin(elapsed * 2 + i * 0.5) * 15;
        const px = cx + Math.cos(angle) * particleRadius;
        const py = cy + Math.sin(angle) * particleRadius;
        const particleSize = 1 + Math.sin(elapsed * 3 + i) * 0.5;
        const alpha = 0.3 + Math.sin(elapsed * 2 + i * 0.7) * 0.2;

        ctx.beginPath();
        ctx.arc(px, py, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191, 255, 0, ${alpha})`;
        ctx.fill();
      }

      // Progress arc (based on loading progress)
      const progressAngle = (progress / 100) * Math.PI * 2 - Math.PI / 2;
      if (progress > 0) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius + 10, -Math.PI / 2, progressAngle);
        ctx.strokeStyle = `rgba(191, 255, 0, 0.3)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Bright tip at progress end
        const tipX = cx + Math.cos(progressAngle) * (radius + 10);
        const tipY = cy + Math.sin(progressAngle) * (radius + 10);
        const tipGlow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 6);
        tipGlow.addColorStop(0, `rgba(191, 255, 0, 0.8)`);
        tipGlow.addColorStop(1, `rgba(191, 255, 0, 0)`);
        ctx.beginPath();
        ctx.arc(tipX, tipY, 6, 0, Math.PI * 2);
        ctx.fillStyle = tipGlow;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [progress]);

  // Progress timer
  useEffect(() => {
    const duration = 3500;
    const interval = 30;
    const step = (100 / duration) * interval;
    const timer = setInterval(() => {
      setProgress((prev: number) => {
        const next = prev + step + Math.random() * 0.8;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  // Phase transitions
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 800);
    const t2 = setTimeout(() => setPhase("ready"), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Auto complete
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(handleComplete, 800);
      return () => clearTimeout(t);
    }
  }, [progress, handleComplete]);

  const letterVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const brandLetters = "NUESTRO".split("");

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Radial gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(191,255,0,0.03)_0%,transparent_70%)]" />

          {/* Grid lines background */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(191,255,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(191,255,0,0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Energy Ring Canvas */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-8"
          >
            <canvas ref={canvasRef} className="relative z-10" />

            {/* Brand name in center of ring */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase !== "ring" ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="flex"
                style={{ perspective: "400px" }}
              >
                {brandLetters.map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate={phase !== "ring" ? "visible" : "hidden"}
                    className="text-2xl md:text-3xl font-black tracking-[0.2em] text-white uppercase"
                    style={{ display: "inline-block" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Status Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <AnimatePresence mode="wait">
              {phase === "ring" && (
                <motion.p
                  key="init"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase"
                >
                  Initializing systems
                </motion.p>
              )}
              {phase === "text" && (
                <motion.p
                  key="loading"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-[10px] font-mono tracking-[0.3em] text-[var(--neon-green)]/50 uppercase"
                >
                  Loading experience
                </motion.p>
              )}
              {phase === "ready" && (
                <motion.p
                  key="ready"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-[10px] font-mono tracking-[0.3em] text-[var(--neon-green)] uppercase"
                >
                  Systems ready
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Minimal Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-48 relative"
          >
            <div className="w-full h-[1px] bg-white/10">
              <motion.div
                className="h-full bg-[var(--neon-green)] relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--neon-green)] shadow-[0_0_8px_var(--neon-green)]" />
              </motion.div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[9px] font-mono tracking-widest text-white/20 uppercase">Loading</span>
              <span className="text-[9px] font-mono tracking-widest text-[var(--neon-green)]/60">{Math.floor(progress)}%</span>
            </div>
          </motion.div>

          {/* Skip */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={handleComplete}
            className="absolute bottom-8 right-8 text-[9px] font-mono tracking-[0.3em] text-white/20 hover:text-[var(--neon-green)] transition-colors uppercase group flex items-center gap-2"
          >
            Skip
            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>

          {/* Corner brackets */}
          <div className="absolute top-6 left-6 w-6 h-6 border-l border-t border-white/10" />
          <div className="absolute top-6 right-6 w-6 h-6 border-r border-t border-white/10" />
          <div className="absolute bottom-6 left-6 w-6 h-6 border-l border-b border-white/10" />
          <div className="absolute bottom-6 right-6 w-6 h-6 border-r border-b border-white/10" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
