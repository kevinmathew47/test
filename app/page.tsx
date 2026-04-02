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
    <div className="grain-overlay scanlines min-h-screen bg-background text-foreground selection:bg-neon-green selection:text-black">
      <Navbar />

      <main className="pt-24">
        {/* Hero Section */}
        <section id="hero" className="min-h-[100svh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden border-b-4 border-primary-container">
          {/* Dynamic Wave Background */}
          <div className="absolute inset-0 z-0">
            <Waves className="h-full w-full opacity-80" strokeColor="#3cf91a" backgroundColor="#0c1609" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 pointer-events-none"></div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10 w-full flex flex-col items-center pointer-events-none">
            <h1 className="text-[clamp(3rem,15vw,10rem)] font-black uppercase tracking-tighter leading-[0.8] mb-4 drop-shadow-[0_0_30px_rgba(0,0,0,1)]">
              F*CK THE RULES.
            </h1>
            <p className="text-base md:text-2xl font-bold uppercase tracking-widest mb-12 max-w-2xl opacity-90 mx-auto px-4 drop-shadow-[0_0_15px_rgba(0,0,0,1)] text-white">
              We build software that bites back.
            </p>
            <div className="flex gap-4 justify-center pointer-events-auto">
              <Link href="#contact" className="bg-primary-container text-black px-12 py-6 font-black uppercase text-2xl tracking-tighter border-4 border-black hover:bg-white transition-all active:translate-y-2 shadow-[0_0_30px_rgba(60,249,26,0.15)]">
                Start a riot
              </Link>
            </div>
          </div>
        </section>

        {/* Manifesto Section */}
        <section id="manifesto" className="bg-primary-container text-black py-20 md:py-32 px-4 md:px-12 border-y-8 border-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-6xl md:text-[12rem] font-black italic tracking-tighter leading-none mb-12">MANIFESTO</h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              <p className="text-2xl md:text-6xl font-black uppercase leading-[0.9] max-w-4xl">
                NO TEMPLATES. NO COMPROMISES. <br />
                <span className="bg-black text-primary-container px-2">WE DON'T BUILD SOFTWARE TO BLEND IN.</span>
              </p>
              <div className="group flex items-center gap-4 text-xl font-black uppercase tracking-tighter border-b-8 border-black pb-2 hover:italic whitespace-nowrap cursor-pointer">
                OUR CODE IS OUR RIOT
                <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </section>

        {/* The Collective Section */}
        <section className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
            <div>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">Creative Badasses’ Collective</h3>
              <p className="text-lg md:text-xl font-medium opacity-70 leading-relaxed max-w-md">
                A decentralized swarm of designers, engineers, and digital anarchists. We don't have "account managers." You talk to the people who break the code.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="aspect-square border-4 border-primary-container p-6 md:p-8 flex flex-col justify-end hover:bg-primary-container hover:text-black transition-all group">
                <span className="text-6xl md:text-7xl font-black italic mb-4">01</span>
                <span className="text-xl md:text-2xl font-black uppercase">Design Vandalism</span>
              </div>
              <div className="aspect-square bg-primary-container text-black p-6 md:p-8 flex flex-col justify-end border-4 border-primary-container hover:bg-black hover:text-primary-container transition-all group">
                <span className="text-6xl md:text-7xl font-black italic mb-4">02</span>
                <span className="text-xl md:text-2xl font-black uppercase">Code Insurgency</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section (SYSTEM PROTOCOLS) */}
        <section id="services" className="bg-[#0a1208] py-20 md:py-32 px-4 md:px-6 border-y-4 border-primary-container">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 border-b-4 border-primary-container pb-8 gap-4">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">System Protocols</h2>
              <span className="text-primary-container font-black text-lg md:text-2xl italic tracking-widest">// DEPLOYMENT READY</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 border-4 border-primary-container">
              <div className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-primary-container hover:bg-primary-container hover:text-black transition-all group">
                <span className="material-symbols-outlined text-6xl md:text-8xl mb-8">brush</span>
                <h4 className="text-3xl md:text-4xl font-black uppercase mb-4">Brutal UI/UX</h4>
                <div className="h-2 w-16 bg-primary-container group-hover:bg-black mb-6"></div>
                <p className="text-base md:text-lg font-bold opacity-80">Interfaces that demand attention. We prioritize impact and raw usability over polished mediocrity.</p>
              </div>
              
              <div className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-primary-container hover:bg-primary-container hover:text-black transition-all group">
                <span className="material-symbols-outlined text-6xl md:text-8xl mb-8">terminal</span>
                <h4 className="text-3xl md:text-4xl font-black uppercase mb-4">Core Systems</h4>
                <div className="h-2 w-16 bg-primary-container group-hover:bg-black mb-6"></div>
                <p className="text-base md:text-lg font-bold opacity-80">Custom architectures built to survive. Rust, Go, TypeScript. Engineered for maximum aggression.</p>
              </div>
              
              <div className="p-8 md:p-12 hover:bg-primary-container hover:text-black transition-all group">
                <span className="material-symbols-outlined text-6xl md:text-8xl mb-8">bolt</span>
                <h4 className="text-3xl md:text-4xl font-black uppercase mb-4">Rapid Deployment</h4>
                <div className="h-2 w-16 bg-primary-container group-hover:bg-black mb-6"></div>
                <p className="text-base md:text-lg font-bold opacity-80">Instant scale. Zero friction. We build the engines that drive digital disruption at light speed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section id="works" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter mb-12 md:20 text-outline leading-none">Selected <br />Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Project 1 */}
            <Link href="/works#void" className="group relative border-4 border-primary-container overflow-hidden aspect-video md:aspect-auto block">
              <Image src="/assets/void.png" width={800} height={500} alt="Void" className="w-full h-full md:h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all flex flex-col justify-end p-6 md:p-12">
                <span className="text-primary-container font-black tracking-widest text-xs md:text-sm mb-2 md:4 uppercase">// FINTECH REBELLION</span>
                <h3 className="text-4xl md:text-6xl font-black uppercase leading-none">PROJECT: VOID</h3>
              </div>
            </Link>
            {/* Project 2 */}
            <Link href="/works#cyber" className="group relative border-4 border-primary-container overflow-hidden aspect-video md:aspect-auto block">
              <Image src="/assets/cyber.png" width={800} height={500} alt="Cyber-Skins" className="w-full h-full md:h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all flex flex-col justify-end p-6 md:p-12">
                <span className="text-primary-container font-black tracking-widest text-xs md:text-sm mb-2 md:4 uppercase">// E-COM DISRUPT</span>
                <h3 className="text-4xl md:text-6xl font-black uppercase leading-none">CYBER-SKINS</h3>
              </div>
            </Link>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/works" className="inline-block bg-transparent text-primary-container border-4 border-primary-container px-12 py-4 font-black uppercase text-xl hover:bg-primary-container hover:text-black transition-all">
              View full archive
            </Link>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 px-6 bg-black text-white border-y-8 border-primary-container">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 leading-tight">
              THE ONLY THING WITH STANDARDIZATION AT NUESTRO: <br /><span className="text-primary-container">OUR WORK PROCESS</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 border-y-2 border-white/20">
              {["THE INTERROGATION", "THE BLUEPRINT", "THE CHAOS", "THE REFINEMENT", "THE BUILD", "THE DROP"].map((step, idx) => (
                <div key={idx} className="p-4 md:p-8 border-r-2 border-b-2 md:border-b-0 border-white/20 hover:bg-primary-container hover:text-black transition-colors">
                  <div className="text-[10px] md:text-xs font-bold uppercase opacity-50 mb-4 md:6">{String(idx + 1).padStart(2, '0')} / {["DISC", "PLAN", "SKETCH", "DESIGN", "DEV", "DROP"][idx]}</div>
                  <h4 className="text-lg md:text-2xl font-black uppercase leading-none">{step}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 px-6 bg-[#0a1208] border-b-4 border-primary-container">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-7xl font-black uppercase tracking-tighter mb-20 text-outline">What they say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary-container border-4 border-primary-container shadow-[10px_10px_0px_0px_rgba(57,255,20,0.1)] md:shadow-[20px_20px_0px_0px_rgba(57,255,20,0.1)]">
              <div className="bg-background p-8 md:p-12 flex flex-col justify-between">
                <p className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-none mb-12">"THEY DIDN'T JUST BUILD AN APP; THEY STARTED A WAR AGAINST OUR COMPETITORS."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-2 bg-primary-container"></div>
                  <span className="font-black uppercase tracking-tighter opacity-70 text-xs md:text-base">CTO / NEON UNDERGROUND</span>
                </div>
              </div>
              <div className="bg-background p-8 md:p-12 flex flex-col justify-between">
                <p className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-none mb-12">"NUESTRO DESTROYED EVERY TEMPLATE-BASED ASSUMPTION WE HAD."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-2 bg-primary-container"></div>
                  <span className="font-black uppercase tracking-tighter opacity-70 text-xs md:text-base">FOUNDER / VOID PROTOCOL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section (SUBMIT INTEL) */}
        <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
            <div className="md:col-span-5">
              <h2 className="text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-12">TALK IS <br />CHEAP.</h2>
              <p className="text-lg font-bold uppercase tracking-tight opacity-70 mb-16 max-w-sm">
                Don't reach out if you want a template. Reach out if you want a riot.
              </p>
              <div className="space-y-8">
                <a href="mailto:riot@nuestro.agency" className="block text-4xl md:text-5xl font-black underline decoration-primary-container decoration-8 underline-offset-8 hover:text-primary-container transition-all">riot@nuestro.agency</a>
                <div className="text-4xl md:text-5xl font-black opacity-50">+1 (555) BORN-TO-WIN</div>
              </div>
            </div>
            
            <div className="md:col-span-7 border-4 md:border-8 border-primary-container p-6 md:p-16 bg-black shadow-[15px_15px_0px_0px_rgba(57,255,20,0.1)] md:shadow-[30px_30px_0px_0px_rgba(57,255,20,0.1)]">
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
                <div className="space-y-4">
                  <label className="block font-black uppercase tracking-tighter text-xs md:text-sm opacity-50">WHO ARE YOU?</label>
                  <input name="name" required className="w-full bg-transparent border-b-2 md:border-b-4 border-primary-container/20 p-2 md:p-4 font-black text-xl md:text-2xl uppercase focus:outline-none focus:border-primary-container transition-all text-white placeholder-white/20" placeholder="IDENTIFY YOURSELF" type="text" />
                </div>
                <div className="space-y-4">
                  <label className="block font-black uppercase tracking-tighter text-xs md:text-sm opacity-50">THE MISSION</label>
                  <textarea name="mission" required className="w-full bg-transparent border-b-2 md:border-b-4 border-primary-container/20 p-2 md:p-4 font-black text-xl md:text-2xl uppercase focus:outline-none focus:border-primary-container transition-all h-24 md:h-32 text-white placeholder-white/20 resize-none" placeholder="WHAT ARE WE BUILDING?"></textarea>
                </div>
                <button 
                  disabled={formStatus === "submitting"}
                  className="w-full bg-neon-green text-black p-6 md:p-8 font-black uppercase text-2xl md:text-3xl tracking-tighter hover:bg-white hover:scale-[1.02] transition-all shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                >
                  {formStatus === "submitting" ? "TRANSMITTING..." : "SUBMIT INTEL"}
                </button>
                {formStatus === "success" && <p className="text-neon-green font-black uppercase tracking-widest text-[10px] md:text-base text-center">INTEL RECEIVED. WE'LL BE IN TOUCH.</p>}
                {formStatus === "error" && <p className="text-red-500 font-black uppercase tracking-widest text-[10px] md:text-base text-center">TRANSMISSION FAILED. TRY AGAIN.</p>}
              </form>
            </div>
          </div>
        </section>
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
              © 1984 - 2026 NUESTRO. <br />
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
