"use client";

import { motion } from "motion/react";
import React from "react";

interface RevealLinesProps {
  children?: React.ReactNode;
  lines?: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "div" | "p";
}

export default function RevealLines({
  children,
  lines,
  className = "",
  delay = 0,
  as: Component = "h2",
}: RevealLinesProps) {
  // If lines array provided directly, use that; otherwise split string or single child
  const lineArray: string[] =
    lines ||
    (typeof children === "string"
      ? children.split("\n").filter(Boolean)
      : Array.isArray(children)
      ? (children as string[])
      : [String(children || "")]);

  return (
    <Component className={`flex flex-col ${className}`}>
      {lineArray.map((line, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden py-[0.05em] -my-[0.05em]"
        >
          <motion.span
            className="inline-block"
            initial={{ transform: "translate3d(0, 105%, 0)" }}
            whileInView={{ transform: "translate3d(0, 0%, 0)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
