"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggle from "./ThemeToggle";
import Magnetic from "./Magnetic";
import { SITE_CONTENT } from "@/content/site";
import { IconLinkedIn, IconGitHub, IconMail } from "./Icons";

interface NavLink {
  label: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Achievements", href: "#wins", id: "wins" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("work");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Blur backdrop after 40px
      setScrolled(currentScrollY > 40);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current && !mobileMenuOpen) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = ["hero", "work", "about", "wins", "skills", "gallery", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Lock body scroll and trap focus on mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-[72px] z-[9000] transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "backdrop-blur-[14px] bg-[var(--band-cream)]/85 dark:bg-[var(--band-plum)]/85 border-b border-[var(--umber)]/20"
            : "bg-transparent"
        }`}
      >
        <div className="content-constraint h-full flex items-center justify-between">
          {/* Brand Left */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-3 text-[var(--umber)] dark:text-[var(--paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)] group"
          >
            <span className="font-anton text-2xl tracking-tight transition-transform duration-300 group-hover:scale-105">
              SR
            </span>
            <span className="hidden lg:inline text-xs font-semibold tracking-wider uppercase opacity-80 border-l border-[var(--umber)]/30 dark:border-[var(--paper)]/30 pl-3">
              {SITE_CONTENT.personal.name}
            </span>
          </a>

          {/* Center Links (Desktop >= 900px) */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-8 text-sm font-semibold text-[var(--umber)] dark:text-[var(--paper)]"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative py-2 transition-colors duration-200 hover:text-[var(--plum)] dark:hover:text-[var(--mauve)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--bronze)]"
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 24,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />

            {/* Let's talk Pill CTA */}
            <Magnetic strength={0.2} radius={60} className="hidden sm:inline-block">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="h-[44px] px-6 rounded-full bg-[var(--plum)] text-[var(--paper)] text-sm font-semibold flex items-center justify-center hover:bg-[var(--bronze)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
              >
                Let&apos;s talk
              </a>
            </Magnetic>

            {/* Hamburger Button (< 900px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)] cursor-pointer z-[9999]"
            >
              <span
                className={`w-6 h-[2px] bg-[var(--umber)] dark:bg-[var(--paper)] transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""
                }`}
              />
              <span
                className={`w-6 h-[2px] bg-[var(--umber)] dark:bg-[var(--paper)] transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-0" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{
              clipPath: "circle(0% at calc(100% - 40px) 36px)",
            }}
            animate={{
              clipPath: "circle(150% at calc(100% - 40px) 36px)",
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{
              clipPath: "circle(0% at calc(100% - 40px) 36px)",
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            }}
            className="fixed inset-0 z-[8999] bg-[var(--plum)] text-[var(--paper)] flex flex-col justify-between p-8 pt-24"
          >
            <nav className="flex flex-col gap-4 mt-6">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, transform: "translate3d(-20px, 0, 0)" }}
                  animate={{
                    opacity: 1,
                    transform: "translate3d(0, 0, 0)",
                    transition: {
                      delay: 0.15 + idx * 0.06,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  className="font-anton text-5xl uppercase tracking-tight hover:text-[var(--cream)] transition-colors py-1"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Social Icons at bottom */}
            <div className="pt-8 border-t border-[var(--paper)]/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <a
                  href={SITE_CONTENT.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-12 h-12 rounded-full border border-[var(--paper)]/40 flex items-center justify-center hover:bg-[var(--paper)] hover:text-[var(--plum)] transition-all"
                >
                  <IconLinkedIn className="w-5 h-5" />
                </a>
                <a
                  href={SITE_CONTENT.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="w-12 h-12 rounded-full border border-[var(--paper)]/40 flex items-center justify-center hover:bg-[var(--paper)] hover:text-[var(--plum)] transition-all"
                >
                  <IconGitHub className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${SITE_CONTENT.personal.email}`}
                  aria-label="Send email"
                  className="w-12 h-12 rounded-full border border-[var(--paper)]/40 flex items-center justify-center hover:bg-[var(--paper)] hover:text-[var(--plum)] transition-all"
                >
                  <IconMail className="w-5 h-5" />
                </a>
              </div>
              <span className="text-xs text-[var(--paper)]/60 font-mono">
                SR // 2026
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
