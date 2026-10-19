"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GalleryItem } from "@/content/site";
import ImageWithFallback from "./ImageFallback";

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft") onPrev();
        if (e.key === "ArrowRight") onNext();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [item, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-[var(--umber)]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 select-none"
        >
          {/* Top Header with Close */}
          <div className="flex items-center justify-between text-[var(--paper)] z-20">
            <span className="font-anton text-lg tracking-wider uppercase text-[var(--cream)]">
              MOMENTS ARCHIVE
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close lightbox"
              className="w-12 h-12 rounded-full border border-[var(--paper)]/30 flex items-center justify-center hover:bg-[var(--plum)] transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--paper)]"
            >
              <span className="text-2xl font-light leading-none">✕</span>
            </button>
          </div>

          {/* Center Image Area */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <motion.div
              key={item.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="relative max-w-4xl max-h-[75vh] w-full h-[65vh] flex items-center justify-center"
            >
              <ImageWithFallback
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain"
                fallbackBg="var(--plum)"
                fallbackColor="var(--paper)"
                fallbackText={item.caption}
              />
            </motion.div>

            {/* Left / Right Nav Buttons */}
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous slide"
              className="absolute left-2 sm:left-6 w-14 h-14 rounded-full border border-[var(--paper)]/40 text-[var(--paper)] bg-[var(--umber)]/60 flex items-center justify-center hover:bg-[var(--plum)] transition-all cursor-pointer z-20"
            >
              <span className="text-xl">←</span>
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next slide"
              className="absolute right-2 sm:right-6 w-14 h-14 rounded-full border border-[var(--paper)]/40 text-[var(--paper)] bg-[var(--umber)]/60 flex items-center justify-center hover:bg-[var(--plum)] transition-all cursor-pointer z-20"
            >
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="text-center max-w-xl mx-auto text-[var(--paper)]/90 pb-2">
            <p className="text-sm sm:text-base font-medium">{item.caption}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
