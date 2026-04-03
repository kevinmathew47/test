"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const words = children.split(" ");

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="flex flex-wrap">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden mr-[0.3em] inline-block">
            <motion.span
              initial={{ y: "110%", rotateX: -40 }}
              animate={isInView ? { y: "0%", rotateX: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: delay + i * 0.04,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block"
              style={{ transformOrigin: "bottom", perspective: "500px" }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
}
