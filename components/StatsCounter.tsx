"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span className="tabular-nums">
      {displayValue}
      <span className="text-[var(--neon-green)]">{suffix}</span>
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-6 bg-[#030303] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="text-center relative group"
            >
              {/* Divider line between items */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10" />
              )}

              <div className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-3"
                style={{
                  textShadow: isInView ? "0 0 30px rgba(191, 255, 0, 0.15)" : "none",
                }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
              </div>
              <div className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-white/40">
                {stat.label}
              </div>

              {/* Bottom glow line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-[var(--neon-green)]/30 to-transparent mt-6 mx-auto w-24"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
