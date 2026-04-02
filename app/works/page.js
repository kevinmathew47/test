"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Works() {
  return (
    <div className="grain-overlay scanlines min-h-screen bg-background text-foreground selection:bg-neon-green selection:text-black">
      <Navbar />
      
      <main className="pt-24 min-h-screen">
        {/* Header Section */}
        <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 md:px-12 border-b-4 border-primary-container relative overflow-hidden">
          <div className="w-full text-center z-10">
            <h1 className="text-[clamp(4rem,15vw,18rem)] font-black leading-[0.75] tracking-tighter uppercase mb-8">
              Works<span className="text-primary-container">.</span>
            </h1>
            <div className="flex justify-center">
              <p className="text-lg md:text-3xl max-w-4xl font-black tracking-tight uppercase opacity-80 px-4">
                Disrupting the digital monotony through brutal minimalism and uncompromising code.
              </p>
            </div>
          </div>
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{backgroundImage: 'linear-gradient(to right, #3cf91a 1px, transparent 1px), linear-gradient(to bottom, #3cf91a 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="w-full">
          {/* Project 01 - Project Zero (linked as #void) */}
          <div id="void" className="group border-b-4 border-primary-container grid grid-cols-1 md:grid-cols-12 overflow-hidden scroll-mt-24">
            <div className="md:col-span-8 overflow-hidden h-[300px] md:h-[600px] border-b-4 md:border-b-0 md:border-r-4 border-primary-container bg-black/20">
              <img 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1yXNgNJKCfoTb3RIsAuh25inv9fgbDe8s5rXIN7aHCsTrUxW2UZH9EtTNckaZn6AC6h0WWDuyaT4RxfaT62z873yaPGAtglGbIe19M1V6eEzSnhyI3TXracBGpax6OCvTzvDoUT4HNKxfwrskA4OseF4Lj_oRauCjImxBwXd6bntD9avyc30Kmtx2YAYHaVjc0juApKpoNdJlr4pYw0_qzsIG79Za1S8_6us1Ys4BBFgIJ7EXwyk6MpmxkFz8SLDhAznufbZ3jW0S" 
                alt="Project Zero"
              />
            </div>
            <div className="md:col-span-4 p-8 md:p-12 flex flex-col justify-between bg-background">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-primary-container font-black text-2xl tracking-tighter">01</span>
                  <span className="text-foreground/40 font-black">2024</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">Project Zero</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="border-2 border-primary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/40">Kernel-Level UI</span>
                  <span className="border-2 border-primary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/40">Rust</span>
                  <span className="border-2 border-primary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/40">WASM</span>
                </div>
              </div>
              <button className="w-full py-4 border-4 border-foreground text-foreground font-black uppercase text-xl hover:bg-primary-container hover:text-black hover:border-primary-container transition-all flex justify-between items-center px-6">
                View Intel <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Project 02 - Neon Pulse */}
          <div className="group border-b-4 border-primary-container grid grid-cols-1 md:grid-cols-12 overflow-hidden scroll-mt-24">
            <div className="md:col-span-4 order-2 md:order-1 p-8 md:p-12 flex flex-col justify-between bg-background border-t-4 md:border-t-0 md:border-r-4 border-primary-container">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-primary-container font-black text-2xl tracking-tighter">02</span>
                  <span className="text-foreground/40 font-black">2024</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">Neon Pulse</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="border-2 border-primary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/40">GLSL Shaders</span>
                  <span className="border-2 border-primary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/40">Three.js</span>
                  <span className="border-2 border-primary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/40">Real-time</span>
                </div>
              </div>
              <button className="w-full py-4 border-4 border-foreground text-foreground font-black uppercase text-xl hover:bg-primary-container hover:text-black hover:border-primary-container transition-all flex justify-between items-center px-6">
                View Intel <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className="md:col-span-8 order-1 md:order-2 overflow-hidden h-[300px] md:h-[600px] bg-black/20">
              <img 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2ABz_9pJ3g0WF_WZCPZpYutAy-5ii_4pxoPjQoUJS89ML8XJJqf0s5DLZ3UwkZVRFXh4ACkcufTGnDmLoV6geb-4Gl0Ns3Ed_8Rrx2AdeUctoP48TVOZuvQmzD2kXaubqWJ-8D7JkYsxuVlZBWwjgIjdCxGIAmg3Kf8gKOn4B824Bfeuqvw98qw8AbaOnj2o4_SF-NA0CJrIFyHPXwZBVeQsF7Fkt0vTvgRJl-UUpQ8hu7ha52d17YdjkdtcAMfEc_sAHYPHsFZyn" 
                alt="Neon Pulse"
              />
            </div>
          </div>

          {/* Project 03 - Cyber-Skins (linked as #cyber) */}
          <div id="cyber" className="group border-b-4 border-primary-container grid grid-cols-1 md:grid-cols-12 overflow-hidden scroll-mt-24">
            <div className="md:col-span-8 overflow-hidden h-[300px] md:h-[600px] border-b-4 md:border-b-0 md:border-r-4 border-primary-container bg-black/20">
              <img 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT2dwxISMsJDo89WNwrff2RdmYmQtLKiGT01nbqnSADk6DNZJFvQA4iH-irxfCJ1kYxZsbkyUHf_Y9dKfhrt8dNzJRZ1sHEEF7tYIOFFGYgKiRKYezxtgRI1wua3FeikNwFCmFevUWWcFjDQSmMuZHrjSuBs_An0Y2L8HrQCChz0HE179GXjm4o9iO4k3_eNGi9kWxplOkESOvqyt5O8aNdvzjPRLFPWoAfrRZSK5HCVJj1ZUTpl--K242-UmIiI6fR0rcEwY94TGl" 
                alt="Cyber-Skins"
              />
            </div>
            <div className="md:col-span-4 p-8 md:p-12 flex flex-col justify-between bg-background">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-primary-container font-black text-2xl tracking-tighter">03</span>
                  <span className="text-foreground/40 font-black">2023</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">Cyber-Skins</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="border-2 border-primary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/40">E-Commerce</span>
                  <span className="border-2 border-primary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/40">Next.js</span>
                  <span className="border-2 border-primary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/40">Tailwind</span>
                </div>
              </div>
              <button className="w-full py-4 border-4 border-foreground text-foreground font-black uppercase text-xl hover:bg-primary-container hover:text-black hover:border-primary-container transition-all flex justify-between items-center px-6">
                View Intel <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Project 04 - Riot OS */}
          <div className="group border-b-4 border-primary-container grid grid-cols-1 md:grid-cols-12 overflow-hidden scroll-mt-24">
            <div className="md:col-span-4 order-2 md:order-1 p-8 md:p-12 flex flex-col justify-between bg-background border-t-4 md:border-t-0 md:border-r-4 border-primary-container">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-primary-container font-black text-2xl tracking-tighter">04</span>
                  <span className="text-foreground/40 font-black">2023</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">Riot OS</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="border-2 border-primary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/40">Custom OS</span>
                  <span className="border-2 border-primary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/40">C++</span>
                  <span className="border-2 border-primary-container px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/40">Assembly</span>
                </div>
              </div>
              <button className="w-full py-4 border-4 border-foreground text-foreground font-black uppercase text-xl hover:bg-primary-container hover:text-black hover:border-primary-container transition-all flex justify-between items-center px-6">
                View Intel <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className="md:col-span-8 order-1 md:order-2 overflow-hidden h-[300px] md:h-[600px] bg-black/20">
              <img 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA73CZZrcbgUcdimfV-6nQU-jbcRP6AB_XBSn-ZfXSqfR_ConfkHNE3_nzUB5edket-F6lIjaPvS9xK2tMl4wynioN5h9_A0AQxS-kQBWH3hepBK4b_na5egpbqplh2rQHoAwwCSLTM6q140UP3CWo6g1X4I-QVlIh_gRvHqfx_g7-c9_8P6LDkR4kIjVHp9He2NMaIvV7bU6U2ul39hdBM6Cku_8mnJSuOhJu5wEiFbF_-7366wI-IJVDe7NiTWER5HdQdrwzRRKV7" 
                alt="Riot OS"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 md:px-12 text-center relative border-b-4 border-primary-container">
          <h3 className="text-4xl md:text-6xl font-black uppercase mb-12 tracking-tight">Ready to break the system?</h3>
          <Link href="/#contact" className="w-full max-w-4xl mx-auto block bg-foreground text-background hover:bg-primary-container transition-colors py-12 md:py-20 group">
            <span className="text-5xl md:text-[10rem] font-black tracking-tighter leading-none uppercase group-hover:scale-105 transition-transform inline-block">Start a riot</span>
          </Link>
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
