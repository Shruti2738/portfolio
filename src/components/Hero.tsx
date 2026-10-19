"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useScroll, useTransform } from "motion/react";
import { SITE_CONTENT, TAGLINE } from "@/content/site";
import Magnetic from "./Magnetic";
import ImageWithFallback from "./ImageFallback";
import {
  IconArrowRight,
  IconDownload,
  IconLinkedIn,
  IconGitHub,
  IconMail,
} from "./Icons";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [pixelGridLit, setPixelGridLit] = useState(false);
  const [pixelActiveStates, setPixelActiveStates] = useState<boolean[]>([
    true, false, true, false, true, false,
  ]);
  const [isDesktop, setIsDesktop] = useState(false);

  // Parallax spring configuration { stiffness: 120, damping: 20 }
  const springConfig = { stiffness: 120, damping: 20 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  // Scroll parallax
  const { scrollY } = useScroll();
  const headlineScrollY = useTransform(scrollY, [0, 800], [0, -120]);
  const photoScrollY = useTransform(scrollY, [0, 800], [0, -40]);
  const scrollCueOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(
        window.innerWidth >= 900 &&
          window.matchMedia("(pointer: fine)").matches &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Pointer parallax handler
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop || !containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const xRel = (e.clientX - (left + width / 2)) / (width / 2);
    const yRel = (e.clientY - (top + height / 2)) / (height / 2);

    mouseX.set(xRel);
    mouseY.set(yRel);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Flickering 3x2 pixel grid
  useEffect(() => {
    if (pixelGridLit) return;
    const interval = setInterval(() => {
      setPixelActiveStates([
        Math.random() > 0.4,
        Math.random() > 0.4,
        Math.random() > 0.4,
        Math.random() > 0.4,
        Math.random() > 0.4,
        Math.random() > 0.4,
      ]);
    }, 600);
    return () => clearInterval(interval);
  }, [pixelGridLit]);

  // Parallax transforms
  // Photo ±14px, plum block ±6px (opposite), bronze block ±20px, headline ±5px
  const headlinePX = useTransform(mouseX, [-1, 1], [-5, 5]);
  const headlinePY = useTransform(mouseY, [-1, 1], [-5, 5]);

  const plumBlockPX = useTransform(mouseX, [-1, 1], [6, -6]);
  const plumBlockPY = useTransform(mouseY, [-1, 1], [6, -6]);

  const photoPX = useTransform(mouseX, [-1, 1], [-14, 14]);
  const photoPY = useTransform(mouseY, [-1, 1], [-14, 14]);

  const bronzeBlockPX = useTransform(mouseX, [-1, 1], [-20, 20]);
  const bronzeBlockPY = useTransform(mouseY, [-1, 1], [-20, 20]);

  // Render interactive letters with 8px spring lift on hover
  const renderInteractiveWord = (word: string, isPaper = false) => {
    return (
      <span className="inline-block whitespace-nowrap">
        {word.split("").map((char, i) => (
          <motion.span
            key={i}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className={`inline-block cursor-default select-none ${
              isPaper ? "text-[var(--paper)]" : "text-[var(--umber)] dark:text-[var(--paper)]"
            }`}
          >
            {char}
          </motion.span>
        ))}
      </span>
    );
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] w-full bg-[var(--band-cream)] overflow-hidden flex flex-col justify-between pt-[72px]"
    >
      <div className="content-constraint relative z-10 w-full flex-1 flex flex-col justify-center py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols desktop) */}
          <motion.div
            style={isDesktop ? { x: headlinePX, y: headlinePY } : undefined}
            className="lg:col-span-7 flex flex-col justify-center items-start text-left z-20"
          >
            {/* Degree & Institution Line with Bronze Bar */}
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-1 bg-[var(--bronze)] block" />
              <span className="font-inter font-semibold text-sm tracking-wider uppercase text-[var(--umber)] dark:text-[var(--paper)]">
                {SITE_CONTENT.personal.degreeLine}
              </span>
            </div>

            {/* Headline with scroll parallax */}
            <motion.div
              style={isDesktop ? { y: headlineScrollY } : undefined}
              className="relative my-2 font-anton uppercase select-none leading-[0.88] tracking-tight"
            >
              {/* Main Headline Layer */}
              <div className="display-xl flex flex-col">
                <span className="overflow-hidden">
                  <motion.span
                    initial={{ transform: "translate3d(0, 105%, 0)" }}
                    animate={{ transform: "translate3d(0, 0%, 0)" }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {renderInteractiveWord("SHRUTI")}
                  </motion.span>
                </span>
                <span className="overflow-hidden">
                  <motion.span
                    initial={{ transform: "translate3d(0, 105%, 0)" }}
                    animate={{ transform: "translate3d(0, 0%, 0)" }}
                    transition={{
                      duration: 0.8,
                      delay: 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {renderInteractiveWord("RAVIKUMAR")}
                  </motion.span>
                </span>
              </div>
            </motion.div>

            {/* Tagline */}
            <p className="mt-6 text-lg sm:text-xl font-normal text-[var(--umber)]/90 dark:text-[var(--paper)]/90 max-w-[34ch] leading-relaxed">
              {TAGLINE}
            </p>

            {/* CTA Buttons Row */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.2} radius={70}>
                <a
                  href="#work"
                  className="h-[52px] px-7 rounded-none bg-[var(--plum)] text-[var(--paper)] text-base font-semibold flex items-center gap-3 hover:bg-[var(--bronze)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)] cursor-pointer"
                >
                  <span>View my work</span>
                  <IconArrowRight className="w-4 h-4" />
                </a>
              </Magnetic>

              <Magnetic strength={0.2} radius={70}>
                <a
                  href={SITE_CONTENT.personal.cvUrl}
                  download
                  className="h-[52px] px-4 text-[var(--umber)] dark:text-[var(--paper)] text-base font-semibold flex items-center gap-2 border-b-2 border-[var(--umber)] dark:border-[var(--paper)] hover:border-[var(--bronze)] hover:text-[var(--bronze)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)] cursor-pointer"
                >
                  <IconDownload className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
              </Magnetic>
            </div>

            {/* Social Links Row */}
            <div className="mt-8 flex items-center gap-3">
              <Magnetic strength={0.25} radius={60}>
                <a
                  href={SITE_CONTENT.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-12 h-12 rounded-full border border-[var(--umber)] dark:border-[var(--paper)]/40 text-[var(--umber)] dark:text-[var(--paper)] flex items-center justify-center hover:bg-[var(--plum)] hover:text-[var(--paper)] hover:border-[var(--plum)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
                >
                  <IconLinkedIn className="w-5 h-5" />
                </a>
              </Magnetic>

              <Magnetic strength={0.25} radius={60}>
                <a
                  href={SITE_CONTENT.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="w-12 h-12 rounded-full border border-[var(--umber)] dark:border-[var(--paper)]/40 text-[var(--umber)] dark:text-[var(--paper)] flex items-center justify-center hover:bg-[var(--plum)] hover:text-[var(--paper)] hover:border-[var(--plum)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
                >
                  <IconGitHub className="w-5 h-5" />
                </a>
              </Magnetic>

              <Magnetic strength={0.25} radius={60}>
                <a
                  href={`mailto:${SITE_CONTENT.personal.email}`}
                  aria-label="Send direct email"
                  className="w-12 h-12 rounded-full border border-[var(--umber)] dark:border-[var(--paper)]/40 text-[var(--umber)] dark:text-[var(--paper)] flex items-center justify-center hover:bg-[var(--plum)] hover:text-[var(--paper)] hover:border-[var(--plum)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
                >
                  <IconMail className="w-5 h-5" />
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Right Column: Headshot & Architectural Blocks (5 cols desktop) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center min-h-[440px] sm:min-h-[540px] lg:min-h-[640px]">
            {/* Offset Bronze Rectangle (peeking lower-right behind Plum block) */}
            <motion.div
              style={
                isDesktop
                  ? { x: bronzeBlockPX, y: bronzeBlockPY }
                  : undefined
              }
              className="absolute right-0 bottom-6 w-[70%] h-[40%] bg-[var(--bronze)] z-0 pointer-events-none"
            />

            {/* Main Plum Block */}
            <motion.div
              style={
                isDesktop
                  ? { x: plumBlockPX, y: plumBlockPY }
                  : undefined
              }
              className="relative w-full max-w-[420px] lg:max-w-none h-[420px] sm:h-[500px] lg:h-[88%] bg-[var(--plum)] z-10 flex flex-col justify-end overflow-visible"
            >
              {/* Thin 3px Mauve Vertical Line on Left Edge */}
              <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-[var(--mauve)]" />

              {/* Crosshair Mark (+) Near Head */}
              <div
                className="absolute top-8 left-8 text-[var(--paper)] font-mono text-2xl font-light select-none pointer-events-none z-30"
                aria-hidden="true"
              >
                +
              </div>

              {/* Cutout Headshot with B&W Grayscale treatment, 118% width bleed */}
              <motion.div
                style={
                  isDesktop
                    ? { x: photoPX, y: photoPY }
                    : { y: photoScrollY }
                }
                className="relative z-20 w-[118%] -left-[9%] flex items-end justify-center pointer-events-none"
              >
                <ImageWithFallback
                  src="/images/headshot.png"
                  alt="Shruti Ravikumar headshot portrait"
                  width={600}
                  height={750}
                  priority
                  className="w-full h-auto object-cover object-bottom select-none"
                  style={{ filter: "none" }}
                  fallbackContent={
                    <div className="w-full h-[400px] sm:h-[480px] bg-[var(--mauve)] flex flex-col items-center justify-center text-[var(--ink)] p-8">
                      <div className="w-24 h-24 rounded-full border-2 border-[var(--ink)] flex items-center justify-center mb-4">
                        <span className="font-anton text-4xl">SR</span>
                      </div>
                      <span className="font-anton text-2xl tracking-wide uppercase">
                        SHRUTI RAVIKUMAR
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider mt-1 opacity-75">
                        IIITDM Kancheepuram
                      </span>
                    </div>
                  }
                />
              </motion.div>

              {/* Bottom-right 3x2 Pixel Readout Grid */}
              <div
                onMouseEnter={() => setPixelGridLit(true)}
                onMouseLeave={() => setPixelGridLit(false)}
                className="absolute bottom-4 right-4 z-30 grid grid-cols-3 gap-1.5 p-2 bg-[var(--umber)]/80 backdrop-blur-sm cursor-pointer"
                title="Telemetry pixel readout"
              >
                {pixelActiveStates.map((active, idx) => (
                  <div
                    key={idx}
                    className={`w-[14px] h-[14px] transition-colors duration-200 ${
                      pixelGridLit || active
                        ? "bg-[var(--bronze)]"
                        : "bg-[var(--cream)]/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Vertical Text on the Far Right Edge */}
            <div
              className="hidden xl:flex absolute -right-12 top-1/2 -translate-y-1/2 rotate-90 origin-center items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[var(--umber)] dark:text-[var(--paper)] opacity-75 select-none pointer-events-none"
              aria-hidden="true"
            >
              <span>Systems that see, think, ship</span>
              <span className="w-14 h-[1px] bg-[var(--umber)] dark:bg-[var(--paper)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-left Animated Scroll Cue */}
      <motion.div
        style={{ opacity: scrollCueOpacity }}
        className="content-constraint w-full pb-6 pt-2 flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-[var(--umber)] dark:text-[var(--paper)] select-none pointer-events-none"
      >
        <div className="w-[1px] h-14 bg-[var(--umber)]/25 dark:bg-[var(--paper)]/30 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full bg-[var(--bronze)] origin-top"
          />
        </div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
