"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  const text = "DESIGN • DEVELOP • DEPLOY • DISRUPT • ";
  const repeatedText = text.repeat(6);

  return (
    <div
      ref={containerRef}
      className="py-12 md:py-16 overflow-hidden border-y border-white/5 bg-black relative"
    >
      {/* Top line */}
      <motion.div
        className="whitespace-nowrap text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white/[0.03] uppercase select-none mb-4"
        style={{ x: x1 }}
      >
        {repeatedText}
      </motion.div>

      {/* Bottom line (reversed direction) */}
      <motion.div
        className="whitespace-nowrap text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase select-none"
        style={{ x: x2 }}
      >
        <span className="text-transparent" style={{
          WebkitTextStroke: "1px rgba(191, 255, 0, 0.15)",
        }}>
          {repeatedText}
        </span>
      </motion.div>

      {/* Gradient fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
    </div>
  );
}
