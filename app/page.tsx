"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ParticleField from "@/components/ParticleField";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticButton from "@/components/MagneticButton";
import TextReveal from "@/components/TextReveal";

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const hasRun = useRef(false);

  if (inView && !hasRun.current) {
    hasRun.current = true;
    let start = 0;
    const step = () => {
      start += Math.ceil(value / 40);
      if (start >= value) { setDisplay(value); return; }
      setDisplay(start);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return <>{display}<span className="text-[var(--neon-green)]">{suffix}</span></>;
}

export default function Home() {
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

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

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black text-white font-sans"
    >
      <div className="grain-overlay" />
      <ParticleField />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        {/* ============================================ */}
        {/* HERO — Asymmetric, editorial, bordered */}
        {/* ============================================ */}
        <section id="hero" ref={heroRef} className="min-h-screen relative border-b border-[var(--border-color)]">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="min-h-screen flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-12 relative"
          >
            {/* Vertical side label */}
            <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 vertical-text editorial-label opacity-40">
              NUESTRO AGENCY — EST. 2023
            </div>

            {/* Right side decorative number */}
            <div className="hidden lg:block absolute right-8 bottom-20 text-[20rem] font-black text-white/[0.02] leading-none select-none">
              01
            </div>

            <div className="max-w-[90rem] mx-auto w-full pt-32">
              {/* Small label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="editorial-label mb-8 flex items-center gap-3"
              >
                <div className="w-8 h-[1px] bg-[var(--neon-green)]" />
                Digital Agency / Creative Studio
              </motion.div>

              {/* Main headline — asymmetric, left-aligned, massive */}
              <div className="mb-12">
                <TextReveal className="display-huge text-white" delay={0.4}>
                  FORGING
                </TextReveal>
                <TextReveal className="display-huge text-white" delay={0.5}>
                  DIGITAL
                </TextReveal>
                <TextReveal className="display-huge text-[var(--neon-green)]" delay={0.6}>
                  FUTURES
                </TextReveal>
              </div>

              {/* Bottom row — bordered container with info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16"
              >
                {/* Description box */}
                <div className="max-w-md border border-[var(--border-color)] p-6 md:p-8 relative">
                  <div className="absolute -top-3 left-4 bg-black px-2 editorial-label">About</div>
                  <p className="text-sm md:text-base font-medium leading-relaxed text-white/70">
                    We build digital products that don&apos;t just enter markets — they define them.
                    Vision matters. Velocity wins. We create the infrastructure for scale.
                  </p>
                </div>

                {/* CTA */}
                <MagneticButton href="#contact" strength={0.3}>
                  <span className="inline-flex items-center gap-4 bg-[var(--neon-green)] text-black px-8 md:px-12 py-4 md:py-5 font-bold text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors">
                    Start a project
                    <span className="text-xl">→</span>
                  </span>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-6 right-8 flex flex-col items-center gap-2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-[1px] h-8 bg-gradient-to-b from-[var(--neon-green)]/60 to-transparent"
              />
              <span className="text-[9px] font-mono tracking-widest text-white/20 uppercase">Scroll</span>
            </motion.div>
          </motion.div>
        </section>

        {/* ============================================ */}
        {/* HORIZONTAL MARQUEE */}
        {/* ============================================ */}
        <div className="py-6 overflow-hidden border-b border-[var(--border-color)] bg-[var(--neon-green)]">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap text-black font-black text-lg md:text-xl tracking-[0.2em] uppercase"
          >
            {Array(8).fill("DESIGN • DEVELOP • DEPLOY • DISRUPT • ").join("")}
          </motion.div>
        </div>

        {/* ============================================ */}
        {/* MANIFESTO — Bordered, asymmetric layout */}
        {/* ============================================ */}
        <section id="manifesto" className="border-b border-[var(--border-color)]">
          <div className="flex flex-col lg:flex-row">
            {/* Left sidebar label */}
            <div className="hidden lg:flex w-20 border-r border-[var(--border-color)] items-center justify-center shrink-0">
              <span className="vertical-text editorial-label opacity-60">Manifesto</span>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 md:p-16 lg:p-24">
              <div className="max-w-5xl">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-[2px] bg-[var(--neon-green)] mb-8"
                />
                <TextReveal className="display-medium text-white mb-12">
                  We spot digital trends before they permeate the industry.
                </TextReveal>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-3xl font-bold text-[var(--neon-green)] max-w-3xl leading-snug mb-12 uppercase"
                >
                  Some call it foresight. We call it pattern recognition at scale.
                </motion.p>

                <MagneticButton strength={0.25}>
                  <div className="inline-flex items-center gap-4 text-sm font-bold tracking-[0.15em] uppercase text-white/60 hover:text-[var(--neon-green)] transition-colors hover-line pb-1">
                    Explore our philosophy
                    <span className="text-lg">→</span>
                  </div>
                </MagneticButton>
              </div>
            </div>

            {/* Right decorative */}
            <div className="hidden lg:block w-32 border-l border-[var(--border-color)] relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] font-black text-white/[0.03] select-none">
                N
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* STATS — Bordered grid */}
        {/* ============================================ */}
        <section ref={statsRef} className="border-b border-[var(--border-color)]">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: 50, suffix: "+", label: "Projects" },
              { value: 3, suffix: "+", label: "Years" },
              { value: 100, suffix: "%", label: "Satisfaction" },
              { value: 24, suffix: "/7", label: "Support" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`p-8 md:p-12 text-center ${i < 3 ? "border-r border-[var(--border-color)]" : ""} ${i < 2 ? "border-b md:border-b-0 border-[var(--border-color)]" : ""}`}
              >
                <div className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
                </div>
                <div className="editorial-label opacity-50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* SERVICES — Editorial grid with side label */}
        {/* ============================================ */}
        <section id="services" className="border-b border-[var(--border-color)]">
          <div className="flex flex-col lg:flex-row">
            {/* Side label */}
            <div className="hidden lg:flex w-20 border-r border-[var(--border-color)] items-center justify-center shrink-0">
              <span className="vertical-text editorial-label opacity-60">Services</span>
            </div>

            <div className="flex-1">
              {/* Header row */}
              <div className="p-8 md:p-12 lg:px-16 lg:py-12 border-b border-[var(--border-color)]">
                <TextReveal className="display-large">
                  CORE
                </TextReveal>
                <TextReveal className="display-large text-[var(--neon-green)]" delay={0.15}>
                  INFRASTRUCTURE
                </TextReveal>
              </div>

              {/* Service cards — full-width stacked with borders */}
              {[
                { num: "01", title: "NEXT-GEN DESIGN", desc: "Interfaces built for exponential markets. We prioritize impact, clarity, and raw usability to establish category kings.", tags: ["UI/UX", "BRANDING", "PROTOTYPING"] },
                { num: "02", title: "ROBUST ARCHITECTURE", desc: "Custom architectures built to survive. Resilient data flows and systems engineered for maximum performance.", tags: ["WEB", "MOBILE", "API"] },
                { num: "03", title: "INTELLIGENT ITERATION", desc: "Instant scale. Zero friction. Ruthless focus on product-market fit and rapid market entry.", tags: ["STRATEGY", "LAUNCH", "GROWTH"] },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group border-b border-[var(--border-color)] hover:bg-[var(--neon-green)]/[0.03] transition-colors duration-500"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6 p-8 md:p-12 lg:px-16">
                    {/* Number */}
                    <div className="text-5xl md:text-7xl font-black text-white/10 group-hover:text-[var(--neon-green)]/30 transition-colors w-24 shrink-0">
                      {service.num}
                    </div>

                    {/* Title & Desc */}
                    <div className="flex-1">
                      <h4 className="text-2xl md:text-3xl font-black tracking-tight mb-3 group-hover:text-[var(--neon-green)] transition-colors uppercase">
                        {service.title}
                      </h4>
                      <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-xl">
                        {service.desc}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 md:flex-col md:items-end shrink-0">
                      {service.tags.map((tag) => (
                        <span key={tag} className="card-tag">{tag}</span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="text-white/20 group-hover:text-[var(--neon-green)] transition-colors text-2xl hidden md:block">
                      →
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* WORKS — Bordered editorial grid */}
        {/* ============================================ */}
        <section id="works" className="border-b border-[var(--border-color)]">
          <div className="flex flex-col lg:flex-row">
            {/* Side label */}
            <div className="hidden lg:flex w-20 border-r border-[var(--border-color)] items-center justify-center shrink-0">
              <span className="vertical-text editorial-label opacity-60">Portfolio</span>
            </div>

            <div className="flex-1">
              {/* Header */}
              <div className="p-8 md:p-12 lg:px-16 lg:py-12 border-b border-[var(--border-color)] flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <TextReveal className="display-large">SELECTED</TextReveal>
                  <TextReveal className="display-large text-[var(--neon-green)]" delay={0.15}>WORK</TextReveal>
                </div>
                <MagneticButton href="/works" strength={0.3}>
                  <span className="inline-flex items-center gap-3 text-sm font-bold tracking-[0.15em] uppercase text-white/50 hover:text-[var(--neon-green)] transition-colors hover-line pb-1">
                    View Archive →
                  </span>
                </MagneticButton>
              </div>

              {/* Works grid */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {[
                  { href: "/works#void", img: "/assets/void.png", alt: "Void Protocol", tag: "FINTECH", title: "VOID PROTOCOL", num: "01" },
                  { href: "/works#cyber", img: "/assets/cyber.png", alt: "Cyber Skins", tag: "E-COMMERCE", title: "CYBER-SKINS", num: "02" },
                ].map((work, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                    className={`group ${i === 0 ? "md:border-r border-[var(--border-color)]" : ""}`}
                  >
                    <Link href={work.href} className="block">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--border-color)]">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7 }}
                          className="w-full h-full"
                        >
                          <Image
                            src={work.img}
                            width={800}
                            height={600}
                            alt={work.alt}
                            className="w-full h-full object-cover opacity-50 group-hover:opacity-90 transition-opacity duration-700"
                          />
                        </motion.div>

                        {/* Overlay number */}
                        <div className="absolute top-4 right-6 text-6xl font-black text-white/10 group-hover:text-[var(--neon-green)]/20 transition-colors">
                          {work.num}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6 md:p-8 flex justify-between items-end">
                        <div>
                          <span className="card-tag mb-3 inline-flex">{work.tag}</span>
                          <h3 className="text-2xl md:text-3xl font-black tracking-tight group-hover:text-[var(--neon-green)] transition-colors uppercase mt-3">
                            {work.title}
                          </h3>
                        </div>
                        <span className="text-2xl text-white/20 group-hover:text-[var(--neon-green)] transition-colors">
                          →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* PROCESS — Bordered step grid */}
        {/* ============================================ */}
        <section className="border-b border-[var(--border-color)]">
          <div className="p-8 md:p-12 lg:px-16 lg:py-12 border-b border-[var(--border-color)]">
            <TextReveal className="display-medium">THE PROCESS</TextReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6">
            {["Discovery", "Blueprint", "Execution", "Refinement", "Optimization", "Deployment"].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="p-6 md:p-8 border-r border-b border-[var(--border-color)] last:border-r-0 flex flex-col justify-between min-h-[180px] group hover:bg-[var(--neon-green)]/[0.03] transition-colors relative"
              >
                <div className="editorial-label opacity-30 group-hover:opacity-100 group-hover:text-[var(--neon-green)] transition-all">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h4 className="text-base md:text-lg font-bold tracking-tight mt-auto uppercase group-hover:text-[var(--neon-green)] transition-colors">
                  {step}
                </h4>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--neon-green)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* CONTACT — Split layout */}
        {/* ============================================ */}
        <section id="contact" className="border-b border-[var(--border-color)]">
          <div className="flex flex-col lg:flex-row">
            {/* Left — Big text */}
            <div className="flex-1 p-8 md:p-12 lg:p-20 lg:border-r border-[var(--border-color)] flex flex-col justify-center">
              <div className="mb-12">
                <TextReveal className="display-large">BUILD</TextReveal>
                <TextReveal className="display-large">FAST.</TextReveal>
                <TextReveal className="display-large text-[var(--neon-green)]" delay={0.2}>ZERO</TextReveal>
                <TextReveal className="display-large text-[var(--neon-green)]" delay={0.3}>FRICTION.</TextReveal>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-base font-medium max-w-md leading-relaxed mb-12"
              >
                Skip the noise and build with a launch-ready team, deep resources,
                and immediate market access from day one.
              </motion.p>

              <div className="space-y-4 pt-6 border-t border-[var(--border-color)]">
                <MagneticButton strength={0.2}>
                  <a href="mailto:hello@nuestro.agency" className="block text-xl md:text-2xl font-bold hover:text-[var(--neon-green)] transition-colors tracking-wider uppercase">
                    hello@nuestro.agency
                  </a>
                </MagneticButton>
                <div className="text-sm font-mono opacity-40 text-[var(--neon-green)]">+1 (555) 000-0000</div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="flex-1 p-8 md:p-12 lg:p-20 bg-[#050505]">
              <div className="editorial-label mb-8 flex items-center gap-3">
                <div className="w-6 h-[1px] bg-[var(--neon-green)]" />
                Get in touch
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                  <label className="editorial-label opacity-60 mb-3 block">Name / Organization</label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder="JOHN DOE"
                    className="w-full bg-transparent border-b border-white/15 pb-3 font-bold text-xl focus:outline-none focus:border-[var(--neon-green)] transition-colors text-white placeholder-white/20 uppercase"
                  />
                </div>
                <div>
                  <label className="editorial-label opacity-60 mb-3 block">Project Scope</label>
                  <textarea
                    name="mission"
                    required
                    placeholder="WHAT ARE WE BUILDING?"
                    className="w-full bg-transparent border-b border-white/15 pb-3 font-bold text-xl focus:outline-none focus:border-[var(--neon-green)] transition-colors h-24 text-white placeholder-white/20 resize-none uppercase"
                  />
                </div>

                <MagneticButton strength={0.15}>
                  <motion.button
                    disabled={formStatus === "submitting"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[var(--neon-green)] text-black py-5 font-bold uppercase tracking-[0.15em] text-sm hover:bg-white transition-colors disabled:opacity-50"
                  >
                    {formStatus === "submitting" ? "TRANSMITTING..." : "INITIALIZE PARTNERSHIP →"}
                  </motion.button>
                </MagneticButton>

                {formStatus === "success" && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--neon-green)] text-sm text-center font-mono tracking-wider">
                    Inquiry received. We&apos;ll be in touch shortly.
                  </motion.p>
                )}
                {formStatus === "error" && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm text-center font-mono tracking-wider">
                    Transmission failed. Please try again.
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================ */}
      {/* FOOTER — Bordered editorial */}
      {/* ============================================ */}
      <footer className="relative z-10">
        <div className="flex flex-col md:flex-row">
          {/* Brand */}
          <div className="p-8 md:p-12 md:border-r border-[var(--border-color)] flex items-center">
            <span className="text-3xl md:text-4xl font-black tracking-tight">N.</span>
          </div>

          {/* Social links */}
          <div className="flex-1 flex items-center p-8 md:p-12 gap-8">
            {["Instagram", "Twitter / X", "LinkedIn"].map((s) => (
              <MagneticButton key={s} strength={0.3}>
                <a href="#" className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 hover:text-[var(--neon-green)] transition-colors hover-line pb-1">
                  {s}
                </a>
              </MagneticButton>
            ))}
          </div>

          {/* Tagline */}
          <div className="p-8 md:p-12 md:border-l border-[var(--border-color)] flex items-center gap-4">
            <div className="w-8 h-[2px] bg-[var(--neon-green)]" />
            <span className="font-bold text-sm text-[var(--neon-green)] tracking-[0.15em] uppercase">Forging the future.</span>
          </div>
        </div>

        <div className="border-t border-[var(--border-color)] px-8 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono opacity-30 text-[10px] tracking-wider">
            © {new Date().getFullYear()} NUESTRO AGENCY. ALL RIGHTS RESERVED.
          </div>
          <div className="font-mono opacity-20 text-[10px] tracking-wider">
            DESIGNED & BUILT WITH OBSESSIVE DETAIL
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
