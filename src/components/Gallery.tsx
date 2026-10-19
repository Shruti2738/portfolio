"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { SITE_CONTENT, GalleryItem } from "@/content/site";
import RevealLines from "./RevealLines";
import ImageWithFallback from "./ImageFallback";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const lastPointerX = useRef<number | null>(null);
  const movementAccumulator = useRef(0);

  const galleryItems = SITE_CONTENT.gallery;
  const totalSlides = galleryItems.length;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const progress = Math.max(
      0,
      Math.min(1, emblaApi.scrollProgress())
    );

    setScrollProgress(progress);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onSelect);

    onSelect();
    onScroll();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, onScroll]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !emblaApi) return;

    const currentX = event.clientX;

    if (lastPointerX.current === null) {
      lastPointerX.current = currentX;
      return;
    }

    const delta = currentX - lastPointerX.current;
    lastPointerX.current = currentX;
    movementAccumulator.current += delta;

    const threshold = 55;

    if (movementAccumulator.current >= threshold) {
      emblaApi.scrollNext();
      movementAccumulator.current = 0;
    } else if (movementAccumulator.current <= -threshold) {
      emblaApi.scrollPrev();
      movementAccumulator.current = 0;
    }
  };

  const handlePointerLeave = () => {
    lastPointerX.current = null;
    movementAccumulator.current = 0;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!emblaApi) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      emblaApi.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      emblaApi.scrollNext();
    }
  };

  const openLightboxByIndex = (index: number) => {
    if (!totalSlides) return;

    const wrappedIndex = (index + totalSlides) % totalSlides;
    setLightboxItem(galleryItems[wrappedIndex]);
  };

  const formattedIndex = String(selectedIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalSlides).padStart(2, "0");

  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden border-t border-[var(--paper)]/15 bg-[var(--plum)] band-padding"
    >
      <div className="content-constraint mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[var(--bronze)]">
            Gallery
          </p>
          <span className="mb-4 block h-1 w-12 bg-[var(--bronze)]" />
          <RevealLines
            as="h2"
            lines={["MOMENTS"]}
            className="display-l leading-none text-[var(--paper)]"
          />
          <p className="mt-4 text-sm text-[var(--paper)]/60">
            Move your cursor horizontally to explore.
          </p>
        </div>

        <div
          className="select-none font-anton text-2xl tracking-widest text-[var(--paper)]"
          aria-live="polite"
          aria-label={`Image ${selectedIndex + 1} of ${totalSlides}`}
        >
          <span>{formattedIndex}</span>
          <span className="opacity-40"> / {formattedTotal}</span>
        </div>
      </div>

      <div
        ref={emblaRef}
        data-cursor="drag"
        tabIndex={0}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onKeyDown={handleKeyDown}
        aria-label="Gallery carousel. Move the mouse horizontally or use the arrow keys to navigate."
        className="w-full cursor-grab overflow-hidden pl-[clamp(20px,4vw,64px)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)] active:cursor-grabbing"
      >
        <div className="flex gap-6 pb-12 pt-4">
          {galleryItems.map((item, index) => {
            const isActive = selectedIndex === index;
            const isOffset = index % 2 === 1;

            return (
              <div
                key={item.id}
                className="min-w-0 flex-[0_0_82vw] md:flex-[0_0_62vw] lg:flex-[0_0_48vw] xl:flex-[0_0_38vw]"
              >
                <motion.button
                  type="button"
                  animate={{
                    scale: isActive ? 1 : 0.94,
                    opacity: isActive ? 1 : 0.68,
                    y: isOffset ? 32 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 24,
                  }}
                  onClick={() => setLightboxItem(item)}
                  aria-label={`Open gallery image ${index + 1}`}
                  className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden border border-[var(--paper)]/20 bg-[var(--umber)] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
                >
                  <ImageWithFallback
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 82vw, (max-width: 1024px) 62vw, 48vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    fallbackBg="var(--umber)"
                    fallbackColor="var(--paper)"
                  />
                  <span className="pointer-events-none absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-[var(--paper)]/50 bg-[var(--umber)]/40 text-lg text-[var(--paper)] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    ↗
                  </span>
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="content-constraint mt-4">
        <div
          className="relative h-[2px] w-full overflow-hidden bg-[var(--paper)]/20"
          role="progressbar"
          aria-label="Gallery position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scrollProgress * 100)}
        >
          <motion.div
            className="h-full origin-left bg-[var(--bronze)]"
            style={{ scaleX: scrollProgress }}
          />
        </div>
      </div>

      <Lightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onPrev={() => {
          if (!lightboxItem) return;
          const currentIndex = galleryItems.findIndex(
            (item) => item.id === lightboxItem.id
          );
          openLightboxByIndex(currentIndex - 1);
        }}
        onNext={() => {
          if (!lightboxItem) return;
          const currentIndex = galleryItems.findIndex(
            (item) => item.id === lightboxItem.id
          );
          openLightboxByIndex(currentIndex + 1);
        }}
      />
    </section>
  );
}