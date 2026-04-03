"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Smooth spring for ring
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check for touch device
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    setIsVisible(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Update trail
      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 20) {
        trailRef.current.shift();
      }
    },
    [cursorX, cursorY]
  );

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const interactive = target.closest(
      "a, button, input, textarea, [role='button'], .cursor-pointer"
    );
    if (interactive) {
      setIsHovering(true);
      const tagName = interactive.tagName.toLowerCase();
      if (tagName === "a") setHoverText("VIEW");
      else if (tagName === "button") setHoverText("CLICK");
      else if (tagName === "input" || tagName === "textarea")
        setHoverText("TYPE");
      else setHoverText("CLICK");
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
    setHoverText("");
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouchDevice, handleMouseMove, handleMouseOver, handleMouseOut, handleMouseLeave, handleMouseEnter]);

  // Trail canvas rendering
  useEffect(() => {
    if (isTouchDevice) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const trail = trailRef.current;

      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const alpha = (i / trail.length) * 0.3;
          const width = (i / trail.length) * 2;
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.strokeStyle = `rgba(191, 255, 0, ${alpha})`;
          ctx.lineWidth = width;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      animFrameRef.current = requestAnimationFrame(drawTrail);
    };

    drawTrail();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Dot Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className={`rounded-full bg-[var(--neon-green)] transition-all duration-200 ${
            isHovering ? "w-2 h-2" : "w-3 h-3"
          }`}
          style={{
            boxShadow: "0 0 8px rgba(191, 255, 0, 0.6), 0 0 16px rgba(191, 255, 0, 0.3)",
          }}
        />
      </motion.div>

      {/* Ring Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="rounded-full border border-[var(--neon-green)]/50 flex items-center justify-center"
          animate={{
            width: isHovering ? 64 : 36,
            height: isHovering ? 64 : 36,
            borderColor: isHovering
              ? "rgba(191, 255, 0, 0.8)"
              : "rgba(191, 255, 0, 0.3)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            boxShadow: isHovering
              ? "0 0 20px rgba(191, 255, 0, 0.15)"
              : "none",
          }}
        >
          {/* Hover text label */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isHovering ? 1 : 0,
              scale: isHovering ? 1 : 0.5,
            }}
            transition={{ duration: 0.2 }}
            className="text-[8px] font-mono font-bold tracking-widest text-[var(--neon-green)] uppercase"
          >
            {hoverText}
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
}
