"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export interface ToastData {
  id: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Global toast trigger helper
export const showToast = (
  message: string,
  action?: { label: string; onClick: () => void }
) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("portfolio-toast", {
        detail: {
          id: Math.random().toString(36).substring(2, 9),
          message,
          action,
        },
      })
    );
  }
};

export default function Toast() {
  const [toast, setToast] = useState<ToastData | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ToastData>;
      setToast(customEvent.detail);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setToast(null);
      }, 3000);
    };

    window.addEventListener("portfolio-toast", handleToastEvent);

    return () => {
      window.removeEventListener("portfolio-toast", handleToastEvent);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none px-4 w-full max-w-md"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, transform: "translate3d(0, 24px, 0)" }}
            animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
            exit={{ opacity: 0, transform: "translate3d(0, 16px, 0)" }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 24,
            }}
            className="pointer-events-auto flex items-center justify-between gap-4 px-6 py-4 bg-[var(--umber)] text-[var(--paper)] border border-[var(--bronze)] text-sm font-medium shadow-2xl mx-auto"
            style={{ borderRadius: "2px" }}
          >
            <span>{toast.message}</span>
            {toast.action && (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  setToast(null);
                }}
                className="px-3 py-1 bg-[var(--plum)] text-[var(--paper)] text-xs font-semibold uppercase tracking-wider hover:bg-[var(--bronze)] transition-colors cursor-pointer"
                style={{ borderRadius: "999px" }}
              >
                {toast.action.label}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
