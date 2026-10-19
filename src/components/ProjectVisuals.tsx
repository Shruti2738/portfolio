"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

// Visual 1: Dependency Patcher (Detect -> Validate -> Patch -> PR loop)
export function VisualCvePatcher() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const nodes = [
    { label: "Detect", x: 40, y: 40 },
    { label: "Validate", x: 180, y: 40 },
    { label: "Patch", x: 180, y: 140 },
    { label: "PR", x: 40, y: 140 },
  ];

  return (
    <div
      ref={ref}
      className="relative w-full h-[180px] sm:h-[200px] flex items-center justify-center select-none"
    >
      <svg className="w-full h-full max-w-[280px]" viewBox="0 0 240 180" aria-hidden="true">
        {/* Connecting Lines */}
        <path
          d="M 60 50 L 160 50 L 160 130 L 60 130 Z"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="opacity-40"
        />

        {/* Moving dot along the loop */}
        {isInView && (
          <motion.circle
            r="4"
            fill="var(--bronze)"
            animate={{
              cx: [60, 160, 160, 60, 60],
              cy: [50, 50, 130, 130, 50],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Nodes */}
        {nodes.map((n) => {
          const isPr = n.label === "PR";
          return (
            <g key={n.label} transform={`translate(${n.x}, ${n.y})`}>
              <rect
                x="-30"
                y="-14"
                width="60"
                height="28"
                rx="2"
                fill="var(--umber)"
                stroke="var(--bronze)"
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="var(--paper)"
                fontSize="11"
                fontWeight="600"
                fontFamily="sans-serif"
              >
                {n.label}
              </text>
              {/* PR Pulsing ring */}
              {isPr && isInView && (
                <motion.rect
                  x="-32"
                  y="-16"
                  width="64"
                  height="32"
                  rx="3"
                  fill="none"
                  stroke="var(--bronze)"
                  strokeWidth="2"
                  animate={{
                    opacity: [0.8, 0, 0.8],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Visual 2: AURA (AI Traffic System with moving bounding boxes on stylized road)
export function VisualAura() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <div
      ref={ref}
      className="relative w-full h-[180px] sm:h-[200px] bg-[var(--umber)]/70 overflow-hidden border border-[var(--bronze)]/30 flex items-center justify-center select-none"
    >
      <span className="absolute top-2 right-2 text-[10px] uppercase font-mono tracking-widest text-[var(--paper)]/50">
        Illustrative
      </span>

      {/* Road markings */}
      <div className="absolute inset-x-0 h-10 border-y border-dashed border-[var(--paper)]/25 flex items-center justify-around">
        <div className="w-8 h-1 bg-[var(--paper)]/20" />
        <div className="w-8 h-1 bg-[var(--paper)]/20" />
        <div className="w-8 h-1 bg-[var(--paper)]/20" />
        <div className="w-8 h-1 bg-[var(--paper)]/20" />
      </div>

      {isInView && (
        <>
          {/* Car bounding box */}
          <motion.div
            animate={{ x: [-80, 260] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-7 left-0 border border-green-400/80 bg-green-400/10 px-2 py-0.5"
          >
            <span className="text-[10px] font-mono font-bold text-green-300 block">
              car 0.94
            </span>
          </motion.div>

          {/* Cyclist bounding box */}
          <motion.div
            animate={{ x: [260, -80] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
            className="absolute bottom-6 left-0 border border-cyan-400/80 bg-cyan-400/10 px-2 py-0.5"
          >
            <span className="text-[10px] font-mono font-bold text-cyan-300 block">
              cyclist 0.88
            </span>
          </motion.div>

          {/* Emergency Ambulance flashing bronze */}
          <motion.div
            animate={{
              x: [-100, 280],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute top-12 left-0 border-2 border-[var(--bronze)] bg-[var(--plum)]/80 px-2 py-1 shadow-md"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-[11px] font-mono font-black text-[var(--paper)] flex items-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--bronze)]" />
              ambulance 0.99
            </motion.span>
          </motion.div>
        </>
      )}
    </div>
  );
}

// Visual 3: UpTimeX (Heartbeat latency chart + spike + status flip)
export function VisualUpTimeX() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [status, setStatus] = useState<"Healthy" | "Recovering">("Healthy");

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setStatus("Recovering");
      setTimeout(() => {
        setStatus("Healthy");
      }, 1800);
    }, 4000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[180px] sm:h-[200px] flex flex-col justify-between p-4 select-none"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase text-[var(--paper)]/70">
          Latency Telemetry
        </span>
        <span
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border transition-colors ${
            status === "Healthy"
              ? "bg-green-950/40 border-green-500/60 text-green-300"
              : "bg-[var(--bronze)]/40 border-[var(--bronze)] text-[var(--paper)] animate-pulse"
          }`}
        >
          {status}
        </span>
      </div>

      <svg className="w-full h-24 overflow-visible" viewBox="0 0 300 80">
        {/* Baseline grid */}
        <line x1="0" y1="60" x2="300" y2="60" stroke="var(--paper)" strokeOpacity="0.15" />
        <line x1="0" y1="30" x2="300" y2="30" stroke="var(--paper)" strokeOpacity="0.1" />

        {/* PathLength drawing heartbeat line */}
        {isInView && (
          <motion.path
            d="M 0 55 L 40 55 L 55 45 L 70 65 L 85 55 L 130 55 L 145 20 L 160 70 L 175 55 L 220 55 L 235 50 L 250 55 L 300 55"
            fill="none"
            stroke="var(--paper)"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
          />
        )}

        {/* Dynamic spike in bronze */}
        {status === "Recovering" && (
          <motion.circle
            cx="145"
            cy="20"
            r="4"
            fill="var(--bronze)"
            animate={{ scale: [1, 2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </svg>

      <div className="flex justify-between text-[11px] font-mono text-[var(--paper)]/50">
        <span>0ms</span>
        <span>24ms avg</span>
        <span>99.9% uptime</span>
      </div>
    </div>
  );
}

// Visual 4: PitWall Analytics (3 overlapping lap-time curves + scrubber)
export function VisualPitWall() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [scrubberX, setScrubberX] = useState(150);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(20, Math.min(e.clientX - rect.left, rect.width - 20));
    setScrubberX(x);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[180px] sm:h-[200px] flex flex-col justify-between p-4 cursor-crosshair select-none"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase text-[var(--ink)]/80 font-bold">
          Lap Delta Comparison
        </span>
        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[var(--ink)] text-[var(--paper)]">
          In progress
        </span>
      </div>

      <svg className="w-full h-24 overflow-visible" viewBox="0 0 300 80">
        {/* Lap Line 1 (Dark Ink) */}
        {isInView && (
          <motion.path
            d="M 10 65 Q 80 20 150 45 T 290 30"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {/* Lap Line 2 (Bronze) */}
        {isInView && (
          <motion.path
            d="M 10 70 Q 75 35 150 30 T 290 20"
            fill="none"
            stroke="var(--bronze)"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {/* Lap Line 3 (Paper/Light) */}
        {isInView && (
          <motion.path
            d="M 10 55 Q 85 50 150 55 T 290 40"
            fill="none"
            stroke="var(--paper)"
            strokeWidth="2"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {/* Interactive Pointer Scrubber */}
        <line
          x1={scrubberX}
          y1="5"
          x2={scrubberX}
          y2="75"
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <circle cx={scrubberX} cy="38" r="3" fill="var(--ink)" />
      </svg>

      <div className="flex justify-between text-[11px] font-mono text-[var(--ink)]/80 font-medium">
        <span>Sector 1</span>
        <span>Sector 2</span>
        <span>Sector 3: -0.142s</span>
      </div>
    </div>
  );
}

// Visual 5: Dashing Raptor — shows bot.png image with SVG sensor overlay
export function VisualDashingRaptor() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [imgError, setImgError] = useState(false);

  return (
    <div
      ref={ref}
      className="relative w-full h-[180px] sm:h-[200px] flex items-center justify-center select-none overflow-hidden"
    >
      {!imgError ? (
        /* Bot photo */
        <div className="relative w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/bot.png"
            alt="Dashing Raptor mBot ranger robot"
            className="w-full h-full object-contain object-center"
            onError={() => setImgError(true)}
          />
          {/* Animated sensor-sweep overlay that sits on top of photo */}
          {isInView && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 200 120"
              aria-hidden="true"
            >
              <motion.path
                d="M 100 100 L 60 30 L 140 30 Z"
                fill="var(--bronze)"
                fillOpacity="0.18"
                stroke="var(--bronze)"
                strokeWidth="1"
                strokeOpacity="0.4"
                animate={{ scaleX: [1, 1.2, 1] }}
                style={{ originX: "100px", originY: "100px" }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="100"
                cy="100"
                r="5"
                fill="var(--bronze)"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <text x="104" y="15" fill="var(--paper)" fontSize="9" fontFamily="monospace" opacity="0.8">
                Dashing Raptor
              </text>
            </svg>
          )}
        </div>
      ) : (
        /* Fallback SVG animation if image fails to load */
        <svg className="w-full h-full max-w-[360px]" viewBox="0 0 360 140" aria-hidden="true">
          <line x1="20" y1="70" x2="340" y2="70" stroke="var(--paper)" strokeOpacity="0.25" strokeWidth="2" />
          {isInView && (
            <motion.circle
              cy="70" r="7" fill="var(--bronze)"
              animate={{ cx: [280, 210, 280] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {isInView && (
            <motion.g
              animate={{ x: [100, 140, 100], y: [0, -14, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.path
                d="M 50 70 L 110 35 L 110 105 Z"
                fill="var(--paper)" fillOpacity="0.18"
                animate={{ rotate: [-35, 35, -35] }}
                style={{ originX: "50px", originY: "70px" }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <rect x="10" y="50" width="40" height="40" rx="4" fill="var(--umber)" stroke="var(--bronze)" strokeWidth="2" />
              <rect x="15" y="44" width="30" height="6" rx="2" fill="var(--paper)" />
              <rect x="15" y="90" width="30" height="6" rx="2" fill="var(--paper)" />
              <circle cx="45" cy="62" r="3" fill="var(--bronze)" />
              <circle cx="45" cy="78" r="3" fill="var(--bronze)" />
            </motion.g>
          )}
        </svg>
      )}
    </div>
  );
}
