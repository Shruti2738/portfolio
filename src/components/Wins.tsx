"use client";

import { useState } from "react";
import { motion } from "motion/react";
import ImageWithFallback from "./ImageFallback";
import RevealLines from "./RevealLines";
import { SITE_CONTENT } from "@/content/site";

export default function Wins() {
  const [featuredHovered, setFeaturedHovered] = useState(false);

  const achievements = SITE_CONTENT.achievements;
  const decodeSih = achievements.find((a) => a.id === "decode-sih")!;
  const adu = achievements.find((a) => a.id === "adu")!;
  const optifarm = achievements.find((a) => a.id === "optifarm")!;
  const bigCode = achievements.find((a) => a.id === "big-code")!;
  const participation = achievements.find((a) => a.id === "participation")!;

  return (
    <section
      id="wins"
      className="relative w-full bg-[var(--band-olive)] band-padding border-t border-[var(--paper)]/15"
    >
      <div className="content-constraint">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Title Column (4 cols, sticky on desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-[120px] mb-8 lg:mb-0">
            <span className="w-12 h-1 bg-[var(--paper)] block mb-4" />
            <RevealLines
              as="h2"
              lines={["ACHIEVEMENTS"]}
              className="display-l text-[var(--paper)] leading-none"
            />
            <p className="mt-4 text-base text-[var(--paper)]/80 max-w-[32ch]">
              Hackathons, national competitions, and recognized engineering solutions.
            </p>
          </div>

          {/* Right Deck Column (8 cols, stacking sticky card deck) */}
          <div className="lg:col-span-8 flex flex-col gap-8 lg:gap-10">
            {/* Card 1: Featured DECODE SIH 2026 (tall, --plum, --paper text) */}
            <div
              onMouseEnter={() => setFeaturedHovered(true)}
              onMouseLeave={() => setFeaturedHovered(false)}
              style={{ top: "120px" }}
              className="lg:sticky relative bg-[var(--plum)] text-[var(--paper)] p-6 sm:p-10 border border-[var(--paper)]/15 transition-transform duration-300 overflow-hidden"
            >
              {/* Bronze Corner Triangle on Hover */}
              <div
                className={`absolute top-0 right-0 w-0 h-0 border-t-[36px] border-t-[var(--bronze)] border-l-[36px] border-l-transparent transition-opacity duration-300 pointer-events-none z-20 ${
                  featuredHovered ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Photo Left 45% (md: 5 cols) */}
                <div className="md:col-span-5 relative aspect-[4/3] overflow-hidden bg-[var(--umber)]">
                  <motion.div
                    animate={{ scale: featuredHovered ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={decodeSih.image || "/images/decode-sih.jpg"}
                      alt="DECODE SIH 2026 first place presentation"
                      fill
                      className="object-cover"
                      fallbackBg="var(--umber)"
                      fallbackColor="var(--paper)"
                      fallbackText="DECODE SIH 2026"
                    />
                  </motion.div>
                </div>

                {/* Text Right (md: 7 cols) */}
                <div className="md:col-span-7 flex flex-col items-start">
                  <div className="inline-block px-3 py-1 bg-[var(--bronze)] text-[var(--paper)] text-xs font-semibold uppercase tracking-wider mb-4 rounded-full">
                    {decodeSih.highlightChip}
                  </div>
                  <h3 className="font-anton text-3xl sm:text-4xl uppercase tracking-tight text-[var(--paper)] leading-tight">
                    {decodeSih.title}
                  </h3>
                  <span className="font-inter font-semibold text-base text-[var(--cream)] mt-1">
                    {decodeSih.event}
                  </span>
                  <p className="mt-3 text-sm text-[var(--paper)]/85 leading-relaxed">
                    {decodeSih.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Abu Dhabi University (--cream, --umber text) */}
            <div
              style={{ top: "140px" }}
              className="lg:sticky relative bg-[var(--cream)] text-[var(--umber)] p-6 sm:p-10 border border-[var(--umber)]/15 transition-transform duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Text Left (md: 7 cols) */}
                <div className="md:col-span-7 flex flex-col items-start order-2 md:order-1">
                  <span className="font-inter font-semibold text-xs uppercase tracking-widest text-[var(--bronze)] mb-1">
                    Academic Competition
                  </span>
                  <h3 className="font-anton text-3xl sm:text-4xl uppercase tracking-tight text-[var(--umber)]">
                    {adu.title}
                  </h3>

                  <div className="mt-6 flex flex-col gap-3 w-full">
                    {adu.subItems?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3 bg-[var(--umber)]/8 border-l-2 border-[var(--bronze)]"
                      >
                        <span className="font-inter font-semibold text-sm text-[var(--umber)]">
                          {item.label}
                        </span>
                        <span className="font-mono text-xs font-bold text-[var(--plum)] bg-[var(--paper)] px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                          {item.prize}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photo Right (md: 5 cols) */}
                <div className="md:col-span-5 relative aspect-[4/3] overflow-hidden bg-[var(--umber)] order-1 md:order-2">
                  <ImageWithFallback
                    src={adu.image || "/images/adu.jpg"}
                    alt="Abu Dhabi University competition award"
                    fill
                    className="object-cover"
                    fallbackBg="var(--bronze)"
                    fallbackColor="var(--paper)"
                    fallbackText="ADU Competition"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Schneider Electric (--mauve, --ink text) */}
            <div
              style={{ top: "160px" }}
              className="lg:sticky relative bg-[var(--mauve)] text-[var(--ink)] p-6 sm:p-10 border border-[var(--ink)]/15 transition-transform duration-300"
            >
              <div className="flex flex-col items-start">
                <span className="font-inter font-semibold text-xs uppercase tracking-widest text-[var(--ink)]/70 mb-2">
                  Hackathon Challenge
                </span>
                <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-tight text-[var(--ink)] mb-2">
                  {optifarm.title}
                </h3>
                <span className="font-inter font-semibold text-sm text-[var(--ink)]/80 mb-4">
                  {optifarm.event}
                </span>
                <p className="text-base sm:text-lg leading-relaxed text-[var(--ink)]">
                  {optifarm.description}
                </p>
              </div>
            </div>

            {/* Card 4: Google The Big Code 2026 (--bronze, --ink text) */}
            <div
              style={{ top: "180px" }}
              className="lg:sticky relative bg-[var(--bronze)] text-[var(--ink)] p-6 sm:p-10 border border-[var(--ink)]/20 transition-transform duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-inter font-semibold text-xs uppercase tracking-widest text-[var(--ink)]/70 mb-1 block">
                    Competitive Programming
                  </span>
                  <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-tight text-[var(--ink)]">
                    {bigCode.title}
                  </h3>
                </div>
                <div className="px-5 py-2.5 bg-[var(--ink)] text-[var(--paper)] font-anton text-lg tracking-wide uppercase self-start sm:self-auto rounded-none">
                  {bigCode.description}
                </div>
              </div>
            </div>

            {/* Card 5: Participation Chips (--umber, --paper text) */}
            <div
              style={{ top: "200px" }}
              className="lg:sticky relative bg-[var(--band-umber)] text-[var(--paper)] p-6 sm:p-10 border border-[var(--paper)]/15 transition-transform duration-300"
            >
              <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-tight text-[var(--paper)] mb-2">
                Hackathon Cohorts & Challenges
              </h3>
              <p className="text-sm text-[var(--paper)]/75 mb-6">
                Active participant in intensive engineering marathons and competitive programming arenas.
              </p>

              {/* Cloud of Pill Chips with 4px lift and color inversion on hover */}
              <div className="flex flex-wrap gap-3">
                {participation.pills?.map((pill, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    className="px-4 py-2 rounded-full border border-[var(--paper)]/30 text-sm font-semibold text-[var(--paper)] bg-transparent hover:bg-[var(--paper)] hover:text-[var(--umber)] hover:border-[var(--paper)] transition-colors duration-200 cursor-default select-none"
                  >
                    {pill}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
