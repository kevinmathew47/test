"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function NavLetters({ text }: { text: string }) {
  return (
    <span className="nav-link inline-flex">
      {text.split("").map((letter, i) => (
        <span key={i} className="nav-letter">
          {letter}
        </span>
      ))}
    </span>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"}`}>
      {/* Top border line */}
      <div className="h-[1px] w-full bg-[var(--border-color)]" />
      
      <div className="flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="px-6 md:px-8 py-5 border-r border-[var(--border-color)] text-xl md:text-2xl font-black tracking-tight text-white hover:text-[var(--neon-green)] transition-colors">
          N.
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center text-[11px] font-bold tracking-[0.2em] uppercase text-white/70">
          {[
            { href: "/#manifesto", label: "ABOUT" },
            { href: "/#works", label: "WORK" },
            { href: "/#services", label: "SERVICES" },
            { href: "/#contact", label: "CONTACT" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-6 py-5 border-r border-[var(--border-color)] hover:bg-[var(--neon-green)]/5 transition-all"
            >
              <NavLetters text={link.label} />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/#contact"
          className="hidden sm:flex items-center gap-3 px-8 py-5 ml-auto bg-[var(--neon-green)] text-black font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-white transition-colors"
        >
          LET&apos;S TALK
          <span className="text-lg">→</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden px-6 py-5 border-l border-[var(--border-color)] text-[var(--neon-green)]"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Bottom border */}
      <div className="h-[1px] w-full bg-[var(--border-color)]" />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[68px] bg-black z-40 md:hidden flex flex-col border-t border-[var(--border-color)]">
          {[
            { href: "/#manifesto", label: "ABOUT" },
            { href: "/#works", label: "WORK" },
            { href: "/#services", label: "SERVICES" },
            { href: "/#contact", label: "CONTACT" },
          ].map((link) => (
            <Link
              key={link.label}
              onClick={() => setIsMenuOpen(false)}
              href={link.href}
              className="px-8 py-6 text-3xl font-black tracking-tight hover:text-[var(--neon-green)] transition-colors uppercase border-b border-[var(--border-color)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            onClick={() => setIsMenuOpen(false)}
            href="/#contact"
            className="mx-8 mt-8 py-4 bg-[var(--neon-green)] text-black text-center font-bold tracking-[0.2em] text-sm uppercase"
          >
            LET&apos;S TALK →
          </Link>
        </div>
      )}
    </nav>
  );
}
