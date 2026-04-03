"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b-4 border-black ${
        scrolled
          ? "bg-[#131313]/80 backdrop-blur-xl"
          : "bg-[#131313]/80 backdrop-blur-xl"
      }`}
    >
      <div className="flex justify-between items-center px-8 py-6">
        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-white font-[var(--font-space-grotesk)] uppercase hover:text-[var(--neon-green)] transition-colors"
        >
          NUESTRO AGENCY
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-bold tracking-tighter uppercase">
          {[
            { href: "/#manifesto", label: "About" },
            { href: "/#services", label: "Services" },
            { href: "/#works", label: "Portfolio" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white hover:text-[var(--neon-green)] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/#contact"
          className="hidden sm:inline-block bg-[var(--neon-green)] text-[#131313] px-6 py-2 font-black tracking-tighter uppercase border-2 border-black active:translate-y-1 transition-transform"
        >
          INITIALIZE PARTNERSHIP
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-[var(--neon-green)]"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[82px] bg-black z-40 md:hidden flex flex-col border-t-4 border-black">
          {[
            { href: "/#manifesto", label: "About" },
            { href: "/#services", label: "Services" },
            { href: "/#works", label: "Portfolio" },
            { href: "/#contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.label}
              onClick={() => setIsMenuOpen(false)}
              href={link.href}
              className="px-8 py-6 text-3xl font-black tracking-tight hover:text-[var(--neon-green)] transition-colors uppercase border-b-4 border-black"
            >
              {link.label}
            </Link>
          ))}
          <Link
            onClick={() => setIsMenuOpen(false)}
            href="/#contact"
            className="mx-8 mt-8 py-4 bg-[var(--neon-green)] text-black text-center font-bold tracking-[0.2em] text-sm uppercase border-4 border-black"
          >
            INITIALIZE PARTNERSHIP →
          </Link>
        </div>
      )}
    </nav>
  );
}
