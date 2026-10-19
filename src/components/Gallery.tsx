"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { SITE_CONTENT, GalleryItem } from "@/content/site";
import RevealLines from "./RevealLines";
import ImageWithFallback from "./ImageFallback";
import Lightbox from "./Lightbox";
import Magnetic from "./Magnetic";

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const galleryItems = SITE_CONTENT.gallery;
  const totalSlides = galleryItems.length;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, onSelect, onScroll]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      scrollNext();
    }
  };

  const currentNumber = selectedIndex + 1;
  const formattedIndex =
    currentNumber < 10 ? `0${currentNumber}` : `${currentNumber}`;
  const formattedTotal =
    totalSlides < 10 ? `0${totalSlides}` : `${totalSlides}`;

  const openLightboxByIndex = (index: number) => {
    const wrappedIndex = (index + totalSlides) % totalSlides;
    setLightboxItem(galleryItems[wrappedIndex]);
  };

  return (
    <section
      id="gallery"
      className="relative w-full bg-[var(--plum)] band-padding border-t border-[var(--paper)]/15 overflow-hidden"
    >
      <div className="content-constraint mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="w-12 h-1 bg-[var(--bronze)] block mb-4" />
          <RevealLines
            as="h2"
            lines={["MOMENTS"]}
            className="display-l text-[var(--paper)] leading-none"
          />
        </div>

        {/* Counter & Arrow Buttons */}
        <div className="flex items-center gap-6">
          <div className="font-anton text-2xl text-[var(--paper)] tracking-widest select-none">
            <span>{formattedIndex}</span>
            <span className="opacity-40"> / {formattedTotal}</span>
          </div>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.25} radius={60}>
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous gallery moment"
                className="w-14 h-14 rounded-full border border-[var(--paper)]/40 text-[var(--paper)] flex items-center justify-center hover:bg-[var(--bronze)] transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--paper)]"
              >
                <span className="text-xl">←</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.25} radius={60}>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next gallery moment"
                className="w-14 h-14 rounded-full border border-[var(--paper)]/40 text-[var(--paper)] flex items-center justify-center hover:bg-[var(--bronze)] transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--paper)]"
              >
                <span className="text-xl">→</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Embla Carousel Full-Bleed Container */}
      <div
        ref={emblaRef}
        data-cursor="drag"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Moments carousel. Use left and right arrow keys to navigate."
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing pl-[clamp(20px,4vw,64px)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
      >
        <div className="flex gap-6 pb-12 pt-4">
          {galleryItems.map((item, idx) => {
            const isActive = selectedIndex === idx;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={item.id}
                className="flex-[0_0_82vw] md:flex-[0_0_62vw] lg:flex-[0_0_48vw] xl:flex-[0_0_38vw] min-w-0"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.92,
                    opacity: isActive ? 1 : 0.55,
                    y: isEven ? 48 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  onClick={() => setLightboxItem(item)}
                  className="relative aspect-[4/5] bg-[var(--umber)] overflow-hidden border border-[var(--paper)]/20 cursor-pointer group"
                >
                  <ImageWithFallback
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fallbackBg="var(--umber)"
                    fallbackColor="var(--paper)"
                    fallbackText={`Slide 0${idx + 1}`}
                  />

                  {/* Caption Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[var(--umber)]/90 via-[var(--umber)]/40 to-transparent">
                    <span className="font-anton text-xs uppercase tracking-widest text-[var(--bronze)] mb-1 block">
                      Moment 0{idx + 1}
                    </span>
                    <p className="font-inter text-sm font-medium text-[var(--paper)] line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar (2px bronze on paper 20% track) */}
      <div className="content-constraint mt-6">
        <div className="w-full h-[2px] bg-[var(--paper)]/20 relative overflow-hidden">
          <motion.div
            className="h-full bg-[var(--bronze)] origin-left"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onPrev={() => {
          if (!lightboxItem) return;
          const curr = galleryItems.findIndex((g) => g.id === lightboxItem.id);
          openLightboxByIndex(curr - 1);
        }}
        onNext={() => {
          if (!lightboxItem) return;
          const curr = galleryItems.findIndex((g) => g.id === lightboxItem.id);
          openLightboxByIndex(curr + 1);
        }}
      />
    </section>
  );
}
