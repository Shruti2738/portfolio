"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", callback);

  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => {
    window.removeEventListener("storage", callback);
    observer.disconnect();
  };
}

function getThemeSnapshot(): boolean {
  return document.documentElement.getAttribute("data-theme") === "night";
}

function getServerSnapshot(): boolean {
  return false;
}

export default function ThemeToggle() {
  const isNight = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerSnapshot
  );

  const toggleTheme = () => {
    const nextNight = !isNight;

    if (nextNight) {
      document.documentElement.setAttribute("data-theme", "night");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    try {
      localStorage.setItem("theme", nextNight ? "night" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      suppressHydrationWarning
      aria-label={
        isNight ? "Switch to day theme" : "Switch to plum night theme"
      }
      className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--umber)]/25 dark:border-[var(--paper)]/30 text-[var(--umber)] dark:text-[var(--paper)] hover:bg-[var(--plum)] hover:text-[var(--paper)] transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--bronze)]"
    >
      {isNight ? (
        <Sun className="w-4 h-4 text-[var(--paper)]" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--umber)]" />
      )}
    </button>
  );
}