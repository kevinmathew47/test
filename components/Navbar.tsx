"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b-4 border-primary-container px-4 md:px-6 py-4 bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl md:text-4xl font-black italic tracking-tighter">NUESTRO</Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-12 font-black uppercase text-sm tracking-widest">
          <Link href="/manifesto" className="hover:text-neon-green transition-colors">Manifesto</Link>
          <Link href="/works" className="hover:text-neon-green transition-colors">Works</Link>
          <Link href="/#contact" className="hover:text-neon-green transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/#contact" className="hidden sm:block bg-primary-container text-black px-6 py-2 font-black uppercase text-xs tracking-tighter border-2 border-black hover:bg-white transition-all">Start a riot</Link>
          
          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary-container p-2"
          >
            <span className="material-symbols-outlined text-4xl">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[76px] bg-background border-t-4 border-primary-container z-40 md:hidden flex flex-col p-8 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <Link onClick={() => setIsMenuOpen(false)} href="/manifesto" className="text-5xl font-black uppercase tracking-tighter hover:text-neon-green transition-colors">Manifesto</Link>
          <Link onClick={() => setIsMenuOpen(false)} href="/works" className="text-5xl font-black uppercase tracking-tighter hover:text-neon-green transition-colors">Works</Link>
          <Link onClick={() => setIsMenuOpen(false)} href="/#contact" className="text-5xl font-black uppercase tracking-tighter hover:text-neon-green transition-colors">Contact</Link>
          <div className="mt-auto">
            <Link onClick={() => setIsMenuOpen(false)} href="/#contact" className="inline-block bg-primary-container text-black px-8 py-4 font-black uppercase text-xl tracking-tighter border-4 border-black w-full text-center">Start a riot</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
