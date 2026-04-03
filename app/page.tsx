"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ParticleField from "@/components/ParticleField";
import ScrollMarquee from "@/components/ScrollMarquee";
import StatsCounter from "@/components/StatsCounter";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Parallax refs
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

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
    } catch {
      setFormStatus("error");
    }
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-neon-green selection:text-black font-sans leading-relaxed">
      <div className="grain-overlay"></div>
      <ParticleField />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="pt-24 relative z-10">
        {/* Hero Section with Parallax */}
        <section
          id="hero"
          ref={heroRef}
          className="min-h-[90svh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="relative z-10 w-full flex flex-col items-center max-w-5xl"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="w-16 h-[1px] bg-[var(--neon-green)] mb-8 opacity-60"
            />
            <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.1] mb-6 crt-text uppercase text-white">
              Forging Digital Experiences that <span className="text-neon-green">Pull the Future Forward</span>
            </h1>
            <p className="text-lg md:text-2xl font-medium tracking-wide mb-12 max-w-3xl opacity-80 mx-auto px-4 text-white uppercase">
              Vision matters. Velocity wins. We deliver more than resources—we create the infrastructure for scale.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="#contact" className="bg-transparent text-neon-green border-2 border-neon-green px-10 py-4 font-bold text-sm tracking-widest uppercase transition-all hover:bg-neon-green hover:text-black rounded-full hover:scale-110 shadow-[0_0_15px_rgba(191,255,0,0.2)]">
                Start Building
              </Link>
            </div>
          </motion.div>

          {/* Scroll down indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-6 bg-gradient-to-b from-[var(--neon-green)]/50 to-transparent"
            />
          </motion.div>
        </section>

        {/* Scroll Marquee */}
        <ScrollMarquee />

        {/* Foresight / Manifesto Section */}
        <section id="manifesto" className="py-24 md:py-32 px-4 md:px-12 bg-[#050505]">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
            className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16"
          >
            <div className="md:w-1/3">
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-black tracking-tight mb-6 crt-text uppercase"
              >
                Exponential Foresight.
              </motion.h2>
              <div className="w-12 h-1 bg-neon-green mb-6 opacity-80 shadow-[0_0_8px_var(--neon-green)]"></div>
            </div>
            <div className="md:w-2/3">
              <p className="text-2xl md:text-4xl font-bold leading-snug mb-12 text-white/90">
                We spot digital trends before they permeate the industry. Transform them into products that matter. Some call it foresight. <span className="text-neon-green crt-text uppercase">We call it pattern recognition at scale.</span>
              </p>
              <div className="group flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-neon-green/80 hover:text-neon-green transition-colors cursor-pointer w-fit pb-1 border-b border-neon-green/30 hover:border-neon-green">
                Explore our philosophy
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats Counter */}
        <StatsCounter />

        {/* Services / Expertise Section with Staggered Cards */}
        <section id="services" className="py-24 md:py-32 px-4 md:px-6 relative bg-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-20 pl-4 border-l-2 border-neon-green"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase crt-text">Core Infrastructure</h2>
              <p className="text-lg opacity-70 max-w-2xl font-bold text-white uppercase tracking-wider">Comprehensive support shifting the odds. With scalable systems that work. With experts who&apos;ve been there.</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {[
                { num: "01", icon: "view_quilt", title: "Next-Gen Design", desc: "Interfaces built for exponential markets. We prioritize impact, clarity, and raw usability to establish category kings." },
                { num: "02", icon: "memory", title: "Robust Architecture", desc: "Custom architectures built to survive. Resilient data flows and systems engineered for maximum performance." },
                { num: "03", icon: "rocket_launch", title: "Intelligent Iteration", desc: "Instant scale. Zero friction. No drawn-out curriculum, just ruthless focus on product-market fit and market entry." }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-[#0a0a0a] p-10 transition-all duration-500 rounded-sm group border border-white/5 hover:border-neon-green/30 relative overflow-hidden"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--neon-green)]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <span className="text-neon-green/50 font-mono text-sm tracking-widest mb-8 block transition-colors group-hover:text-neon-green relative z-10">{service.num} / 03</span>
                  <span className="material-symbols-outlined text-5xl mb-8 text-white/80 transition-colors group-hover:text-neon-green drop-shadow-[0_0_10px_rgba(191,255,0,0)] group-hover:drop-shadow-[0_0_15px_rgba(191,255,0,0.4)] relative z-10">{service.icon}</span>
                  <h4 className="text-2xl font-bold mb-4 tracking-tight uppercase relative z-10">{service.title}</h4>
                  <p className="text-base font-medium opacity-70 leading-relaxed text-white relative z-10">{service.desc}</p>

                  {/* Bottom glow border on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--neon-green)]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: "left" }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Works Section */}
        <section id="works" className="py-24 md:py-32 px-4 md:px-6 max-w-7xl mx-auto bg-black">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase crt-text">Selected Portfolio</h2>
              <p className="text-lg opacity-70 font-bold text-white uppercase tracking-wider">Our builds don&apos;t just enter markets. They define them.</p>
            </div>
            <Link href="/works" className="text-sm font-bold tracking-widest uppercase text-white hover:text-neon-green transition-colors pb-1 border-b border-white/20 hover:border-neon-green">
              View full archive
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Link href="/works#void" className="group relative overflow-hidden aspect-[4/3] block rounded-sm bg-[#050505] border border-white/5 hover:border-neon-green/50 transition-colors">
                <Image src="/assets/void.png" width={800} height={600} alt="Void Protocol" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 md:p-12 border-t border-neon-green/0 group-hover:border-neon-green/30 transition-all">
                  <span className="text-neon-green font-mono text-xs tracking-widest mb-3 block opacity-80 uppercase">Fintech Market Rebellion</span>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white group-hover:text-neon-green transition-all duration-300 uppercase">VOID Protocol</h3>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              <Link href="/works#cyber" className="group relative overflow-hidden aspect-[4/3] block rounded-sm bg-[#050505] border border-white/5 hover:border-neon-green/50 transition-colors">
                <Image src="/assets/cyber.png" width={800} height={600} alt="Cyber Skins" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 md:p-12 border-t border-neon-green/0 group-hover:border-neon-green/30 transition-all">
                  <span className="text-neon-green font-mono text-xs tracking-widest mb-3 block opacity-80 uppercase">E-Commerce Disruption</span>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white group-hover:text-neon-green transition-all duration-300 uppercase">Cyber-Skins</h3>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Second Marquee */}
        <ScrollMarquee />

        {/* Process Section */}
        <section className="py-32 px-6 border-y border-white/5 relative overflow-hidden bg-[#030303]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-20 text-center uppercase crt-text">
              The Only Constant: <span className="text-neon-green">Our Methodology</span>
            </h2>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-6 border-y border-white/10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {["Discovery", "Blueprint", "Execution", "Refinement", "Optimization", "Deployment"].map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={staggerItem}
                  className="p-6 md:p-8 border-r border-b md:border-b-0 border-white/10 hover:bg-neon-green/5 transition-colors flex flex-col justify-between min-h-[160px] group last:border-r-0 relative overflow-hidden"
                >
                  <div className="text-xs font-mono opacity-40 group-hover:text-neon-green group-hover:opacity-100 transition-colors">{String(idx + 1).padStart(2, '0')}</div>
                  <h4 className="text-lg md:text-xl font-bold tracking-tight mt-auto text-white uppercase group-hover:text-neon-green transition-colors">{step}</h4>

                  {/* Animated underline on hover */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--neon-green)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[1] mb-8 uppercase crt-text">
                Build fast.<br/><span className="text-neon-green text-shadow">Zero friction.</span>
              </h2>
              <p className="text-lg font-bold opacity-70 mb-12 max-w-md leading-relaxed text-white uppercase tracking-wider">
                Skip the noise and build with a launch-ready team, deep resources, and immediate market access from day one. Let&apos;s move.
              </p>
              <div className="space-y-6 pt-8 border-t border-white/10">
                <a href="mailto:hello@nuestro.agency" className="block text-2xl font-bold hover:text-neon-green transition-colors text-white tracking-widest uppercase">hello@nuestro.agency</a>
                <div className="text-lg font-mono opacity-50 text-neon-green">+1 (555) 000-0000</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#050505] p-8 md:p-12 rounded-sm relative border border-white/10 shadow-2xl shadow-neon-green/5"
            >
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="space-y-3">
                  <label className="block text-xs text-neon-green tracking-widest uppercase font-mono">Name / Organization</label>
                  <input name="name" required className="w-full bg-transparent border-b border-white/20 pb-3 font-bold text-xl focus:outline-none focus:border-neon-green transition-all text-white placeholder-white/30 uppercase" placeholder="JOHN DOE" type="text" />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs text-neon-green tracking-widest uppercase font-mono">Project Scope</label>
                  <textarea name="mission" required className="w-full bg-transparent border-b border-white/20 pb-3 font-bold text-xl focus:outline-none focus:border-neon-green transition-all h-24 text-white placeholder-white/30 resize-none uppercase" placeholder="WHAT ARE WE BUILDING?"></textarea>
                </div>
                <motion.button
                  disabled={formStatus === "submitting"}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-transparent border-2 border-neon-green text-neon-green py-5 font-bold uppercase tracking-widest text-sm hover:bg-neon-green hover:text-black transition-all disabled:opacity-50 mt-4 rounded-full"
                >
                  {formStatus === "submitting" ? "TRANSMITTING..." : "INITIALIZE PARTNERSHIP"}
                </motion.button>
                {formStatus === "success" && <p className="text-neon-green tracking-widest text-sm text-center font-bold mt-4 font-mono">Inquiry received. We&apos;ll be in touch shortly.</p>}
                {formStatus === "error" && <p className="text-red-500 tracking-widest text-sm text-center font-bold mt-4 font-mono">Transmission failed. Please try again.</p>}
              </form>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 px-6 bg-black border-t border-white/10 text-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
            <div className="text-3xl md:text-4xl font-black tracking-tight crt-text">NUESTRO</div>
            <div className="flex gap-8 text-sm font-bold tracking-widest uppercase">
              <a className="hover:text-neon-green transition-colors" href="#">Instagram</a>
              <a className="hover:text-neon-green transition-colors" href="#">Twitter / X</a>
              <a className="hover:text-neon-green transition-colors" href="#">LinkedIn</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 gap-8">
            <div className="font-mono opacity-50 text-xs leading-relaxed tracking-wider">
              © {new Date().getFullYear()} NUESTRO AGENCY.<br />
              ALL RIGHTS RESERVED.<br />
            </div>
            <div className="text-right flex items-center gap-4">
              <div className="w-12 h-[2px] bg-neon-green"></div>
              <span className="font-bold text-lg text-neon-green opacity-90 uppercase tracking-widest">FORGING THE FUTURE.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
