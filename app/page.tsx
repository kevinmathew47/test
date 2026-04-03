"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import FluidParticlesBackground from "@/components/FluidParticlesBackground";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticButton from "@/components/MagneticButton";
import TextReveal from "@/components/TextReveal";

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const hasRun = useRef(false);

  if (inView && !hasRun.current) {
    hasRun.current = true;
    let start = 0;
    const step = () => {
      start += Math.ceil(value / 40);
      if (start >= value) {
        setDisplay(value);
        return;
      }
      setDisplay(start);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return (
    <>
      {display}
      <span className="text-[var(--primary-fixed)]">{suffix}</span>
    </>
  );
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

  // Track mouse for grid background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty(
        "--mouse-x",
        `${(e.clientX / window.innerWidth) * 100}%`
      );
      document.documentElement.style.setProperty(
        "--mouse-y",
        `${(e.clientY / window.innerHeight) * 100}%`
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
      className="min-h-screen bg-[var(--background)] text-[var(--on-background)] font-[var(--font-inter)] overflow-x-hidden"
    >
      <div className="grain-overlay" />
      <FluidParticlesBackground />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10 pt-24">
        {/* ============================================ */}
        {/* HERO — Brutalist, full-viewport, with image */}
        {/* ============================================ */}
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen flex flex-col justify-center px-8 overflow-hidden"
        >
          <div className="absolute inset-0 grid-bg -z-10 opacity-40" />
          <div className="kinetic-overlay" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--surface-container-low)]/50 -z-10 border-l-4 border-black/20" />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-4"
          >
            {/* Headline */}
            <div className="col-span-12 md:col-span-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <TextReveal className="display-huge text-white" delay={0.3}>
                  FORGING
                </TextReveal>
                <TextReveal className="display-huge text-white" delay={0.4}>
                  DIGITAL
                </TextReveal>
                <TextReveal
                  className="display-huge text-[var(--primary-fixed)]"
                  delay={0.5}
                >
                  FUTURES
                </TextReveal>
              </motion.div>
            </div>

            {/* Subtitle + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="col-span-12 md:col-span-6 flex flex-col items-start gap-8 mt-8"
            >
              <p className="text-xl md:text-2xl font-medium tracking-tight text-[var(--on-surface-variant)] max-w-xl">
                Digital Agency / Creative Studio. We build digital products that
                don&apos;t just enter markets — they define them.
              </p>
              <MagneticButton href="#contact" strength={0.3}>
                <span className="group relative inline-flex items-center gap-4 bg-[var(--primary-container)] text-[var(--on-primary-container)] px-10 py-6 border-4 border-black font-black text-xl uppercase hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000] transition-all duration-200">
                  Start a project →
                </span>
              </MagneticButton>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="hidden md:block col-span-12 mt-20"
            >
              <div className="w-full h-[400px] bg-[var(--surface-container-high)] border-4 border-black relative overflow-hidden group">
                <Image
                  src="/assets/hero.png"
                  width={1920}
                  height={800}
                  alt="high-tech workspace"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[var(--primary-container)]/10 mix-blend-multiply pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ============================================ */}
        {/* KINETIC TICKER — Solid green marquee */}
        {/* ============================================ */}
        <section className="bg-[var(--primary-container)] border-y-4 border-black py-4 overflow-hidden">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap font-black text-4xl md:text-6xl text-black uppercase tracking-tighter"
          >
            {Array(10)
              .fill("DESIGN • DEVELOP • DEPLOY • DISRUPT • ")
              .join("")}
          </motion.div>
        </section>

        {/* ============================================ */}
        {/* MANIFESTO — About section with stats */}
        {/* ============================================ */}
        <section
          id="manifesto"
          className="py-32 px-8 bg-[var(--surface)] relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12 relative z-10">
            {/* Left text */}
            <div className="col-span-12 md:col-span-7">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "3rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-[2px] bg-[var(--primary-fixed)] mb-6"
              />
              <h2 className="editorial-label mb-6">Manifesto / 001</h2>
              <TextReveal className="display-medium text-white mb-12">
                We spot digital trends before they permeate the industry. Some
                call it foresight. We call it pattern recognition at scale.
              </TextReveal>
              <MagneticButton strength={0.25}>
                <div className="inline-flex items-center gap-4 font-black text-lg border-b-4 border-[var(--primary-fixed)] pb-2 hover:text-[var(--primary-fixed)] transition-colors uppercase">
                  Explore our philosophy →
                </div>
              </MagneticButton>
            </div>

            {/* Stats grid */}
            <div
              ref={statsRef}
              className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4"
            >
              {[
                { value: 50, suffix: "+", label: "Projects", prefix: "N " },
                { value: 3, suffix: "+", label: "Years", prefix: "" },
                { value: 100, suffix: "%", label: "Satisfaction", prefix: "" },
                { value: 24, suffix: "/7", label: "Support", prefix: "" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[var(--surface-container-low)] p-8 border-4 border-black hover:border-[var(--primary-fixed)] transition-colors"
                >
                  <div className="text-5xl font-black text-[var(--primary-fixed)]">
                    {stat.prefix}
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      inView={statsInView}
                    />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest mt-2">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SERVICES — Core Infrastructure */}
        {/* ============================================ */}
        <section
          id="services"
          className="py-32 px-8 bg-[var(--surface-container-low)]"
        >
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <TextReveal className="display-large">CORE</TextReveal>
                <TextReveal
                  className="display-large text-[var(--primary-fixed)]"
                  delay={0.15}
                >
                  INFRASTRUCTURE
                </TextReveal>
              </div>
              <p className="max-w-md text-[var(--on-surface-variant)] font-medium text-lg italic">
                Vision matters. Velocity wins. We create the infrastructure for
                scale.
              </p>
            </div>

            {/* Service cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-black overflow-hidden">
              {[
                {
                  num: "01",
                  title: "Next-Gen Design",
                  tags: "UI/UX, Branding, Prototyping",
                  icon: "arrow_forward",
                },
                {
                  num: "02",
                  title: "Robust Architecture",
                  tags: "Web, Mobile, API",
                  icon: "layers",
                },
                {
                  num: "03",
                  title: "Intelligent Iteration",
                  tags: "Strategy, Launch, Growth",
                  icon: "bolt",
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`infrastructure-card p-12 bg-[var(--surface)] hover:bg-[var(--surface-container-highest)] transition-colors group ${
                    i < 2
                      ? "border-b-4 md:border-b-0 md:border-r-4 border-black"
                      : ""
                  }`}
                >
                  <div className="text-[var(--primary-fixed)] font-black mb-12">
                    {service.num}
                  </div>
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter group-hover:text-[var(--primary-fixed)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[var(--on-surface-variant)] mb-8 uppercase text-sm font-bold tracking-widest">
                    {service.tags}
                  </p>
                  <span className="material-symbols-outlined text-5xl group-hover:translate-x-4 transition-transform card-icon">
                    {service.icon}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* PORTFOLIO — Selected Work */}
        {/* ============================================ */}
        <section id="works" className="py-32 px-8 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <TextReveal className="display-large">SELECTED</TextReveal>
              <TextReveal
                className="display-large text-[var(--primary-fixed)]"
                delay={0.15}
              >
                WORK
              </TextReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Project 01 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-6 group"
              >
                <Link href="/works#void" className="block">
                  <div className="aspect-[4/5] bg-[var(--surface-container-high)] border-4 border-black overflow-hidden relative">
                    <Image
                      src="/assets/void.png"
                      width={800}
                      height={1000}
                      alt="Void Protocol"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute top-4 left-4 bg-[var(--primary-container)] text-black px-4 py-1 font-black uppercase text-xs">
                      Fintech
                    </div>
                    <div className="absolute inset-0 bg-[var(--primary-container)]/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
                  </div>
                  <div className="flex justify-between items-start mt-6">
                    <div>
                      <h4 className="text-4xl font-black tracking-tighter uppercase group-hover:text-[var(--primary-fixed)] transition-colors">
                        VOID PROTOCOL
                      </h4>
                      <p className="text-[var(--on-surface-variant)] font-medium mt-1">
                        Decentralized Asset Management
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-4xl group-hover:text-[var(--primary-fixed)] transition-colors">
                      north_east
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Project 02 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-6 group mt-0 md:mt-24"
              >
                <Link href="/works#cyber" className="block">
                  <div className="aspect-[4/5] bg-[var(--surface-container-high)] border-4 border-black overflow-hidden relative">
                    <Image
                      src="/assets/cyber.png"
                      width={800}
                      height={1000}
                      alt="Cyber-Skins"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute top-4 left-4 bg-[var(--primary-container)] text-black px-4 py-1 font-black uppercase text-xs">
                      E-Commerce
                    </div>
                    <div className="absolute inset-0 bg-[var(--primary-container)]/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
                  </div>
                  <div className="flex justify-between items-start mt-6">
                    <div>
                      <h4 className="text-4xl font-black tracking-tighter uppercase group-hover:text-[var(--primary-fixed)] transition-colors">
                        CYBER-SKINS
                      </h4>
                      <p className="text-[var(--on-surface-variant)] font-medium mt-1">
                        Next-Gen Apparel Interface
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-4xl group-hover:text-[var(--primary-fixed)] transition-colors">
                      north_east
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* View Archive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20 flex justify-center"
            >
              <MagneticButton href="/works" strength={0.3}>
                <span className="inline-flex items-center gap-4 bg-[var(--surface)] text-white px-12 py-6 border-4 border-white font-black text-xl uppercase hover:bg-white hover:text-black transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000]">
                  View Archive →
                </span>
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* PROCESS — Step-by-step accordion */}
        {/* ============================================ */}
        <section className="py-32 px-8 bg-[var(--surface-container-lowest)] border-y-4 border-black relative overflow-hidden">
          <div className="absolute inset-0 grid-bg -z-10 opacity-20" />
          <div className="kinetic-overlay" />
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Sticky title */}
              <div className="md:col-span-4">
                <div className="sticky top-32">
                  <TextReveal className="display-large">THE</TextReveal>
                  <TextReveal
                    className="display-large text-[var(--primary-fixed)]"
                    delay={0.15}
                  >
                    PROCESS
                  </TextReveal>
                </div>
              </div>

              {/* Steps */}
              <div className="md:col-span-8 flex flex-col">
                {[
                  { step: "Discovery", icon: "search" },
                  { step: "Blueprint", icon: "architecture" },
                  { step: "Execution", icon: "construction" },
                  { step: "Refinement", icon: "auto_fix_high" },
                  { step: "Optimization", icon: "speed" },
                  { step: "Deployment", icon: "rocket_launch" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    className="border-t-4 border-black py-10 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-12">
                      <span className="text-[var(--primary-fixed)] font-black text-2xl">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform group-hover:text-[var(--primary-fixed)]">
                        {item.step}
                      </h3>
                    </div>
                    <span className="material-symbols-outlined text-4xl opacity-0 group-hover:opacity-100 transition-opacity text-[var(--primary-fixed)]">
                      {item.icon}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* BOTTOM CTA — Bold statement */}
        {/* ============================================ */}
        <section className="py-32 px-8 bg-[var(--primary-container)] text-black">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-2/3"
            >
              <h2 className="text-6xl md:text-9xl font-black tracking-[-0.05em] uppercase leading-[0.85]">
                BUILD FAST. <br /> ZERO FRICTION.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-full md:w-1/3 flex flex-col gap-8"
            >
              <p className="text-xl font-bold uppercase tracking-tight">
                Skip the noise and build with a launch-ready team, deep
                resources, and immediate market access from day one.
              </p>
              <div className="h-4 w-24 bg-black" />
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CONTACT — Split layout with form */}
        {/* ============================================ */}
        <section id="contact" className="py-32 px-8 bg-[var(--surface)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
            {/* Left info */}
            <div className="md:col-span-5">
              <TextReveal className="display-large mb-12">
                Get in touch
              </TextReveal>
              <div className="space-y-8">
                <div>
                  <p className="editorial-label mb-2">Electronic Mail</p>
                  <MagneticButton strength={0.2}>
                    <a
                      href="mailto:hello@nuestro.agency"
                      className="text-3xl font-bold hover:text-[var(--primary-fixed)] transition-colors"
                    >
                      hello@nuestro.agency
                    </a>
                  </MagneticButton>
                </div>
                <div>
                  <p className="editorial-label mb-2">Direct Line</p>
                  <MagneticButton strength={0.2}>
                    <a
                      href="tel:+15550000000"
                      className="text-3xl font-bold hover:text-[var(--primary-fixed)] transition-colors"
                    >
                      +1 (555) 000-0000
                    </a>
                  </MagneticButton>
                </div>
                <div className="flex gap-6 mt-12">
                  {["Instagram", "Twitter / X", "LinkedIn"].map((s) => (
                    <MagneticButton key={s} strength={0.3}>
                      <a
                        href="#"
                        className="font-black uppercase tracking-widest hover:text-[var(--primary-fixed)] transition-colors"
                      >
                        {s}
                      </a>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="md:col-span-7 bg-[var(--surface-container-low)] p-12 border-4 border-black">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block font-black uppercase text-xs tracking-widest mb-4">
                    Name / Organization
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder="Who are you?"
                    className="w-full bg-[var(--surface-container-highest)] border-0 p-6 font-bold text-xl focus:ring-4 focus:ring-[var(--secondary)] transition-all outline-none text-white placeholder-white/30"
                  />
                </div>
                <div>
                  <label className="block font-black uppercase text-xs tracking-widest mb-4">
                    Project Scope
                  </label>
                  <textarea
                    name="mission"
                    required
                    placeholder="What are we forging?"
                    rows={4}
                    className="w-full bg-[var(--surface-container-highest)] border-0 p-6 font-bold text-xl focus:ring-4 focus:ring-[var(--secondary)] transition-all outline-none text-white placeholder-white/30 resize-none"
                  />
                </div>
                <MagneticButton strength={0.15}>
                  <motion.button
                    disabled={formStatus === "submitting"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[var(--primary-container)] text-black border-4 border-black py-8 font-black text-2xl uppercase hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#000000] transition-all disabled:opacity-50"
                  >
                    {formStatus === "submitting"
                      ? "TRANSMITTING..."
                      : "INITIALIZE PARTNERSHIP →"}
                  </motion.button>
                </MagneticButton>

                {formStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[var(--neon-green)] text-sm text-center font-mono tracking-wider"
                  >
                    Inquiry received. We&apos;ll be in touch shortly.
                  </motion.p>
                )}
                {formStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm text-center font-mono tracking-wider"
                  >
                    Transmission failed. Please try again.
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================ */}
      {/* FOOTER — Brutalist editorial */}
      {/* ============================================ */}
      <footer className="bg-[#131313] w-full py-20 px-8 border-t-4 border-black relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end">
          <div className="w-full md:w-auto">
            <div className="text-4xl font-black text-white mb-8 uppercase leading-none">
              NUESTRO <br /> AGENCY
            </div>
            <p className="font-black text-[var(--primary-fixed)] uppercase tracking-[0.4em] mb-8">
              Forging the future.
            </p>
            <p className="font-medium uppercase tracking-widest text-xs text-white/60">
              ©{new Date().getFullYear()} NUESTRO AGENCY. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 mt-12 md:mt-0 items-end">
            <div className="flex gap-8 font-medium uppercase tracking-widest text-xs">
              {["Privacy Policy", "Terms of Service"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/60 hover:text-[var(--neon-green)] transition-all active:scale-95"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="flex gap-8 font-medium uppercase tracking-widest text-xs">
              {["LinkedIn", "Instagram"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/60 hover:text-[var(--neon-green)] transition-all active:scale-95"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
