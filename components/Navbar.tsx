"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fps, setFps] = useState(60);

  // Simulate FPS variance
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(Math.random() * (62 - 58 + 1)) + 58);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-5 bg-background/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand & Indicators */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight text-white hover:text-primary-container transition-colors crt-text">
            NUESTRO
          </Link>
          
          <div className="hidden md:flex items-center gap-4 text-[10px] tracking-widest font-mono uppercase text-white/50">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_8px_var(--neon-green)]"></div>
              <span>ONLINE</span>
            </div>
            <span>//</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_8px_var(--neon-green)]"></div>
              <span>{fps} FPS</span>
            </div>
          </div>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest uppercase text-white/80">
          <Link href="/#manifesto" className="hover:text-primary-container transition-colors">Foresight</Link>
          <Link href="/#works" className="hover:text-primary-container transition-colors">Portfolio</Link>
          <Link href="/#services" className="hover:text-primary-container transition-colors">Expertise</Link>
          <Link href="/#contact" className="hover:text-primary-container transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/#contact" className="hidden sm:inline-block bg-primary-container text-black px-6 py-2.5 font-bold text-[10px] tracking-widest uppercase rounded-full hover:scale-105 transition-all shadow-[0_0_15px_rgba(191,255,0,0.2)]">START BUILDING</Link>
          
          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary-container p-2 focus:outline-none"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[76px] bg-background/95 backdrop-blur-xl border-t border-primary-container/20 z-40 md:hidden flex flex-col p-8 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <Link onClick={() => setIsMenuOpen(false)} href="/#manifesto" className="text-3xl font-bold tracking-tight hover:text-primary-container transition-colors uppercase">Foresight</Link>
          <Link onClick={() => setIsMenuOpen(false)} href="/#works" className="text-3xl font-bold tracking-tight hover:text-primary-container transition-colors uppercase">Portfolio</Link>
          <Link onClick={() => setIsMenuOpen(false)} href="/#services" className="text-3xl font-bold tracking-tight hover:text-primary-container transition-colors uppercase">Expertise</Link>
          <Link onClick={() => setIsMenuOpen(false)} href="/#contact" className="text-3xl font-bold tracking-tight hover:text-primary-container transition-colors uppercase">Contact</Link>
          <div className="mt-8">
            <Link onClick={() => setIsMenuOpen(false)} href="/#contact" className="inline-block bg-primary-container text-black px-8 py-4 font-bold tracking-widest text-sm w-full text-center rounded-full uppercase">START BUILDING</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
