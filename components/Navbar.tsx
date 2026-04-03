"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 glass-panel border-b border-primary-container/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-primary-container transition-colors">NUESTRO</Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-12 font-medium tracking-wide text-sm text-foreground/80">
          <Link href="/#manifesto" className="hover:text-primary-container transition-colors">Foresight</Link>
          <Link href="/#works" className="hover:text-primary-container transition-colors">Portfolio</Link>
          <Link href="/#services" className="hover:text-primary-container transition-colors">Expertise</Link>
          <Link href="/#contact" className="hover:text-primary-container transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/#contact" className="hidden sm:inline-block bg-transparent text-primary-container px-6 py-2 font-semibold text-xs tracking-wider border border-primary-container/50 rounded-sm hover:bg-primary-container hover:text-black transition-all glow-border">START BUILDING</Link>
          
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
          <Link onClick={() => setIsMenuOpen(false)} href="/#manifesto" className="text-4xl font-light tracking-tight hover:text-primary-container transition-colors">Foresight</Link>
          <Link onClick={() => setIsMenuOpen(false)} href="/#works" className="text-4xl font-light tracking-tight hover:text-primary-container transition-colors">Portfolio</Link>
          <Link onClick={() => setIsMenuOpen(false)} href="/#services" className="text-4xl font-light tracking-tight hover:text-primary-container transition-colors">Expertise</Link>
          <Link onClick={() => setIsMenuOpen(false)} href="/#contact" className="text-4xl font-light tracking-tight hover:text-primary-container transition-colors">Contact</Link>
          <div className="mt-8">
            <Link onClick={() => setIsMenuOpen(false)} href="/#contact" className="inline-block bg-primary-container text-black px-8 py-4 font-semibold tracking-wider text-sm w-full text-center rounded-sm">START BUILDING</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
