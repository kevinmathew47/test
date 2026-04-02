"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Manifesto() {
  return (
    <div className="grain-overlay scanlines min-h-screen bg-black text-white selection:bg-primary-container selection:text-black">
      <Navbar />
      
      <main className="relative min-h-screen pt-20">
        {/* Grid Overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-10" 
             style={{backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '8.333333% 100%'}}>
        </div>

        {/* Hero Header */}
        <header className="relative h-[80vh] w-full flex flex-col justify-center items-center text-center px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[60vw] max-w-4xl aspect-square z-0 pointer-events-none opacity-40 mix-blend-screen animate-pulse">
            <img 
              alt="Abstract Chrome Geometric Shape" 
              className="w-full h-full object-contain filter contrast-125 brightness-150 grayscale invert" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9QDU48D8sQlTZGZgmEYjF3HeAlI22h0_NNLkQuFbxPks34MW3Q--1AV266GTSlp2lK_GUe9s4JAPIkJHigaE89PKQ1TqS0e9rsl4j_ts1ODxel7DRilAEMqwu8j3-tANbyk4g3di3Wfw0ps-dLQeShXLSJj4kk5yzl3oj2qUpIX4Mb2O8jEcQZnCJSweIM9me0uc6h07-tj-b6EgRcz_Ncdy-rZRAqOaTeIYH01jC3qH1H4v35gLz4tRl1qU6fam2MShBZI3gUyt3"
            />
          </div>
          <div className="relative z-10 max-w-5xl">
            <p className="text-primary-container uppercase tracking-[0.5em] mb-8 text-sm font-black italic">The Core Philosophy // v1.0</p>
            <h1 className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.85] uppercase tracking-tighter mb-4">
              THE<br/>MANIFESTO
            </h1>
            <div className="w-24 h-1 bg-primary-container mx-auto mt-12 opacity-50"></div>
          </div>
        </header>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-48">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32">
            {/* Rule 01 */}
            <section className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-2">
                <span className="text-7xl md:text-9xl font-black text-primary-container leading-none italic">01</span>
              </div>
              <div className="md:col-span-10 border-l border-white/10 pl-8 md:pl-12">
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">NO TEMPLATES. NO COMPROMISES.</h2>
                <p className="text-xl md:text-2xl text-foreground font-medium opacity-60 leading-relaxed max-w-3xl">
                  We don&apos;t recycle ideas. Every pixel, every line of code, and every strategy is forged from absolute zero. If it&apos;s been seen before, it&apos;s not ours. We reject the safety of the known.
                </p>
              </div>
            </section>

            {/* Rule 02 */}
            <section className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-2">
                <span className="text-7xl md:text-9xl font-black text-primary-container leading-none italic">02</span>
              </div>
              <div className="md:col-span-10 border-l border-white/10 pl-8 md:pl-12">
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">FUNCTION DICTATES FORM.</h2>
                <p className="text-xl md:text-2xl text-foreground font-medium opacity-60 leading-relaxed max-w-3xl">
                  Aesthetics without utility is just decoration. We build systems that work under pressure. Beauty is the byproduct of a solved problem, never the starting point.
                </p>
              </div>
            </section>

            {/* Rule 03 */}
            <section className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-2">
                <span className="text-7xl md:text-9xl font-black text-primary-container leading-none italic">03</span>
              </div>
              <div className="md:col-span-10 border-l border-white/10 pl-8 md:pl-12">
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">MEDIOCRITY IS A DISEASE.</h2>
                <p className="text-xl md:text-2xl text-foreground font-medium opacity-60 leading-relaxed max-w-3xl">
                  Good enough is the enemy of great. We operate on the edge of discomfort. If it doesn&apos;t challenge the status quo, it is a waste of energy. We aim for the throat.
                </p>
              </div>
            </section>

            {/* Rule 04 */}
            <section className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-2">
                <span className="text-7xl md:text-9xl font-black text-primary-container leading-none italic">04</span>
              </div>
              <div className="md:col-span-10 border-l border-white/10 pl-8 md:pl-12">
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">SPEED IS A FEATURE.</h2>
                <p className="text-xl md:text-2xl text-foreground font-medium opacity-60 leading-relaxed max-w-3xl">
                  Perfection is an excuse for procrastination. We move with violent intent. Rapid iteration and uncompromising delivery are the markers of our process.
                </p>
              </div>
            </section>

            {/* Rule 05 */}
            <section className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-2">
                <span className="text-7xl md:text-9xl font-black text-primary-container leading-none italic">05</span>
              </div>
              <div className="md:col-span-10 border-l border-white/10 pl-8 md:pl-12">
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">IF IT DOESN&apos;T BITE BACK, IT&apos;S NOT READY.</h2>
                <p className="text-xl md:text-2xl text-foreground font-medium opacity-60 leading-relaxed max-w-3xl">
                  Passive design is dead design. Our work demands attention, forces interaction, and leaves a scar. We design for the bold, the loud, and the uncompromising.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-24 px-6 bg-primary-container border-t-8 border-black text-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-24">
            <div className="text-6xl md:text-9xl font-black italic tracking-tighter">NUESTRO</div>
            <div className="flex flex-col md:items-end gap-4 w-full md:w-auto">
              <span className="font-black uppercase tracking-[0.5em] text-xs md:text-sm opacity-60">SOCIAL INSURGENCY //</span>
              <div className="grid grid-cols-2 md:flex flex-wrap gap-4 md:gap-8 text-xl md:text-2xl font-black uppercase">
                <a className="hover:italic hover:translate-x-2 transition-all" href="#">Insta</a>
                <a className="hover:italic hover:translate-x-2 transition-all" href="#">X / TW</a>
                <a className="hover:italic hover:translate-x-2 transition-all" href="#">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end border-t-4 border-black pt-8 gap-8">
            <div className="font-black uppercase opacity-40 text-xs">
              © 2024 NUESTRO. <br />
              NO RIGHTS RESERVED. <br />
              DISTRIBUTED UNDER THE CHAOS LICENSE.
            </div>
            <div className="text-right">
              <span className="font-black uppercase italic text-4xl">START A RIOT.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
