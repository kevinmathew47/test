"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Waves } from "@/components/ui/wave-background";

export default function Home() {
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (resp.ok) setFormStatus("success");
      else setFormStatus("error");
    } catch (err) {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-neon-green selection:text-black font-sans leading-relaxed">
      <Navbar />

      <main className="pt-24 relative z-10">
        {/* Dynamic Glowing Background */}
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0c1609] via-background to-background pointer-events-none"></div>

        {/* Hero Section */}
        <section id="hero" className="min-h-[90svh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <Waves className="h-full w-full" strokeColor="#39FF14" backgroundColor="transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none"></div>
          </div>
          
          <div className="relative z-10 w-full flex flex-col items-center max-w-5xl">
            <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
              Forging Digital Experiences that <span className="text-gradient">Pull the Future Forward</span>
            </h1>
            <p className="text-lg md:text-2xl font-light tracking-wide mb-12 max-w-3xl opacity-80 mx-auto px-4 text-white">
              Vision matters. Velocity wins. We deliver more than resources—we create the infrastructure for scale.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="#contact" className="glow-border bg-white text-black px-10 py-4 font-semibold text-sm tracking-widest uppercase transition-all hover:bg-transparent hover:text-white rounded-sm shadow-[0_0_30px_rgba(57,255,20,0.15)]">
                Start Building
              </Link>
            </div>
          </div>
        </section>

        {/* Foresight / Manifesto Section */}
        <section id="manifesto" className="py-24 md:py-32 px-4 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="md:w-1/3">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">Exponential Foresight.</h2>
              <div className="w-12 h-1 bg-primary-container mb-6 opacity-80"></div>
            </div>
            <div className="md:w-2/3">
              <p className="text-2xl md:text-4xl font-light leading-snug mb-12 text-white/90">
                We spot digital trends before they permeate the industry. Transform them into products that matter. Some call it foresight. <span className="text-gradient-neon font-normal">We call it pattern recognition at scale.</span>
              </p>
              <div className="group flex items-center gap-4 text-sm font-semibold tracking-widest uppercase text-primary-container hover:text-white transition-colors cursor-pointer w-fit pb-1 border-b border-primary-container/30">
                Explore our philosophy
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services / Expertise Section */}
        <section id="services" className="py-24 md:py-32 px-4 md:px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 pl-4 border-l border-primary-container/30">
              <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-4">Core Infrastructure</h2>
              <p className="text-lg opacity-70 max-w-2xl font-light text-white">Comprehensive support shifting the odds. With scalable systems that work. With experts who've been there.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-10 hover:-translate-y-2 transition-transform duration-500 rounded-sm group">
                <span className="text-primary-container/50 font-mono text-sm tracking-widest mb-8 block transition-colors group-hover:text-primary-container">01 / 03</span>
                <span className="material-symbols-outlined text-5xl mb-8 text-white/80 transition-colors group-hover:text-white">view_quilt</span>
                <h4 className="text-2xl font-semibold mb-4 tracking-tight">Next-Gen Design</h4>
                <p className="text-base font-light opacity-70 leading-relaxed text-white">Interfaces built for exponential markets. We prioritize impact, clarity, and raw usability to establish category kings.</p>
              </div>
              
              <div className="glass-panel p-10 hover:-translate-y-2 transition-transform duration-500 rounded-sm group">
                <span className="text-primary-container/50 font-mono text-sm tracking-widest mb-8 block transition-colors group-hover:text-primary-container">02 / 03</span>
                <span className="material-symbols-outlined text-5xl mb-8 text-white/80 transition-colors group-hover:text-white">memory</span>
                <h4 className="text-2xl font-semibold mb-4 tracking-tight">Robust Architecture</h4>
                <p className="text-base font-light opacity-70 leading-relaxed text-white">Custom architectures built to survive. Resilient data flows and systems engineered for maximum performance.</p>
              </div>
              
              <div className="glass-panel p-10 hover:-translate-y-2 transition-transform duration-500 rounded-sm group">
                <span className="text-primary-container/50 font-mono text-sm tracking-widest mb-8 block transition-colors group-hover:text-primary-container">03 / 03</span>
                <span className="material-symbols-outlined text-5xl mb-8 text-white/80 transition-colors group-hover:text-white">rocket_launch</span>
                <h4 className="text-2xl font-semibold mb-4 tracking-tight">Intelligent Iteration</h4>
                <p className="text-base font-light opacity-70 leading-relaxed text-white">Instant scale. Zero friction. No drawn-out curriculum, just ruthless focus on product-market fit and market entry.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section id="works" className="py-24 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-4">Selected Portfolio</h2>
              <p className="text-lg opacity-70 font-light text-white">Our builds don't just enter markets. They define them.</p>
            </div>
            <Link href="/works" className="text-sm font-semibold tracking-widest uppercase text-white hover:text-primary-container transition-colors pb-1 border-b border-white/20 hover:border-primary-container">
              View full archive
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/works#void" className="group relative overflow-hidden aspect-[4/3] block rounded-sm bg-[#050505] border border-white/5">
              <Image src="/assets/void.png" width={800} height={600} alt="Void Protocol" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-8 md:p-12">
                <span className="text-primary-container font-mono text-xs tracking-widest mb-3 block opacity-80 uppercase">Fintech Market Rebellion</span>
                <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white group-hover:text-gradient-neon transition-all duration-300">VOID Protocol</h3>
              </div>
            </Link>
            <Link href="/works#cyber" className="group relative overflow-hidden aspect-[4/3] block rounded-sm bg-[#050505] border border-white/5">
              <Image src="/assets/cyber.png" width={800} height={600} alt="Cyber Skins" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-8 md:p-12">
                <span className="text-primary-container font-mono text-xs tracking-widest mb-3 block opacity-80 uppercase">E-Commerce Disruption</span>
                <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white group-hover:text-gradient-neon transition-all duration-300">Cyber-Skins</h3>
              </div>
            </Link>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 px-6 border-y border-primary-container/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary-container/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-20 text-center">
              The Only Constant: <span className="text-gradient-neon font-normal">Our Methodology</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 border-y border-white/10">
              {["Discovery", "Blueprint", "Execution", "Refinement", "Optimization", "Deployment"].map((step, idx) => (
                <div key={idx} className="p-6 md:p-8 border-r border-b md:border-b-0 border-white/10 hover:bg-white/5 transition-colors flex flex-col justify-between min-h-[160px] group last:border-r-0">
                  <div className="text-xs font-mono opacity-40 group-hover:text-primary-container group-hover:opacity-100 transition-colors">{String(idx + 1).padStart(2, '0')}</div>
                  <h4 className="text-lg md:text-xl font-light tracking-tight mt-auto text-white">{step}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-[1] mb-8">
                Build fast.<br/><span className="text-gradient">Zero friction.</span>
              </h2>
              <p className="text-lg font-light opacity-70 mb-12 max-w-md leading-relaxed text-white">
                Skip the noise and build with a launch-ready team, deep resources, and immediate market access from day one. Let's move.
              </p>
              <div className="space-y-6 pt-8 border-t border-white/10">
                <a href="mailto:hello@nuestro.agency" className="block text-2xl font-light hover:text-primary-container transition-colors text-white">hello@nuestro.agency</a>
                <div className="text-xl font-light opacity-50">+1 (555) 000-0000</div>
              </div>
            </div>
            
            <div className="glass-panel p-8 md:p-12 rounded-sm relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-bl-full blur-3xl pointer-events-none"></div>
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="space-y-3">
                  <label className="block text-xs tracking-widest uppercase opacity-60 font-medium">Name / Organization</label>
                  <input name="name" required className="w-full bg-transparent border-b border-white/20 pb-3 font-light text-xl focus:outline-none focus:border-primary-container transition-all text-white placeholder-white/10" placeholder="John Doe" type="text" />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs tracking-widest uppercase opacity-60 font-medium">Project Scope</label>
                  <textarea name="mission" required className="w-full bg-transparent border-b border-white/20 pb-3 font-light text-xl focus:outline-none focus:border-primary-container transition-all h-24 text-white placeholder-white/10 resize-none" placeholder="What are we building?"></textarea>
                </div>
                <button 
                  disabled={formStatus === "submitting"}
                  className="w-full glow-border bg-white text-black py-5 font-semibold uppercase tracking-widest text-sm hover:bg-transparent hover:text-white transition-all disabled:opacity-50 mt-4 rounded-sm"
                >
                  {formStatus === "submitting" ? "Transmitting..." : "Initialize Partnership"}
                </button>
                {formStatus === "success" && <p className="text-primary-container tracking-widest text-sm text-center font-medium mt-4">Inquiry received. We'll be in touch shortly.</p>}
                {formStatus === "error" && <p className="text-red-400 tracking-widest text-sm text-center font-medium mt-4">Transmission failed. Please try again.</p>}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 px-6 glass-panel border-t border-primary-container/20 border-x-0 border-b-0 text-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
            <div className="text-3xl md:text-4xl font-bold tracking-tight">NUESTRO</div>
            <div className="flex gap-8 text-sm font-light tracking-wider">
              <a className="hover:text-primary-container transition-colors" href="#">Instagram</a>
              <a className="hover:text-primary-container transition-colors" href="#">Twitter / X</a>
              <a className="hover:text-primary-container transition-colors" href="#">LinkedIn</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 gap-8">
            <div className="font-light opacity-50 text-xs leading-relaxed">
              © {new Date().getFullYear()} Nuestro Agency.<br />
              All rights reserved.<br />
            </div>
            <div className="text-right flex items-center gap-4">
              <div className="w-12 h-[1px] bg-primary-container/50"></div>
              <span className="font-light text-lg opacity-80 uppercase tracking-widest">Forging the future.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
