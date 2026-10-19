"use client";

import { useState, useRef, useEffect } from "react";
import { SITE_CONTENT } from "@/content/site";
import RevealLines from "./RevealLines";
import Magnetic from "./Magnetic";
import { showToast } from "./Toast";
import { firePaletteConfetti } from "./Confetti";
import {
  IconLinkedIn,
  IconGitHub,
  IconArrowUpRight,
  IconCopy,
  IconCheck,
} from "./Icons";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
    server: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [copied, setCopied] = useState(false);
  const renderTimestamp = useRef(0);

  useEffect(() => {
    renderTimestamp.current = Date.now();
  }, []);

  const validateField = (field: "name" | "email" | "message", value: string) => {
    let error = "";
    if (field === "name") {
      if (!value.trim() || value.trim().length < 2) {
        error = "Enter your name (2 characters or more)";
      }
    } else if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim() || !emailRegex.test(value)) {
        error = "Enter a valid email";
      }
    } else if (field === "message") {
      if (!value.trim() || value.trim().length < 10) {
        error = "Write at least 10 characters";
      } else if (value.length > 2000) {
        error = "Message must be under 2000 characters";
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === "";
  };

  const handleBlur = (field: "name" | "email" | "message") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formState[field]);
  };

  const handleChange = (
    field: "name" | "email" | "message" | "company",
    value: string
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (touched[field as keyof typeof touched]) {
      validateField(field as "name" | "email" | "message", value);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONTENT.personal.email);
      setCopied(true);
      showToast("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("shrutirj307@gmail.com");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, message: true });
    const isNameValid = validateField("name", formState.name);
    const isEmailValid = validateField("email", formState.email);
    const isMessageValid = validateField("message", formState.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    setStatus("sending");
    setErrors((prev) => ({ ...prev, server: "" }));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          company: formState.company,
          ts: renderTimestamp.current,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        firePaletteConfetti();
        showToast("Sent. I'll reply soon.");
        setFormState({ name: "", email: "", message: "", company: "" });
        setTouched({ name: false, email: false, message: false });
      } else {
        setStatus("error");
        setErrors((prev) => ({
          ...prev,
          server: data.error || "Failed to deliver message. Please try again or email directly.",
        }));
      }
    } catch {
      setStatus("error");
      setErrors((prev) => ({
        ...prev,
        server: "Network error occurred. Please email directly to shrutirj307@gmail.com.",
      }));
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full border-t border-[var(--paper)]/15 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
        {/* Block 1: Left 4 Cols (--plum, --paper text) */}
        <div className="lg:col-span-4 bg-[var(--plum)] p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--paper)]/15">
          <div>
            <span className="w-12 h-1 bg-[var(--bronze)] block mb-6" />
            <RevealLines
              as="h2"
              lines={["LET'S BUILD", "SOMETHING."]}
              className="display-l text-[var(--paper)] leading-[0.9] tracking-tight uppercase"
            />
          </div>

          <div className="mt-8 pt-8 border-t border-[var(--paper)]/20">
            <p className="text-sm sm:text-base leading-relaxed text-[var(--paper)]/80 max-w-[28ch]">
              Available for high-impact software engineering, AI vision systems, and robotics initiatives.
            </p>
          </div>
        </div>

        {/* Block 2: Middle 3 Cols (--cream, --umber text) */}
        <div className="lg:col-span-3 bg-[var(--band-cream)] p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--umber)]/20">
          <div>
            <span className="font-anton text-xl uppercase tracking-wider text-[var(--bronze)] mb-8 block">
              Direct Channels
            </span>

            <div className="flex flex-col gap-6">
              {/* Email Row with Copy Ghost Button */}
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase font-semibold text-[var(--umber)]/60">
                  Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${SITE_CONTENT.personal.email}`}
                    className="font-inter font-semibold text-sm text-[var(--umber)] hover:text-[var(--plum)] truncate"
                  >
                    {SITE_CONTENT.personal.email}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email address"
                    aria-label="Copy email address"
                    className="p-1.5 rounded border border-[var(--umber)]/30 text-[var(--umber)] hover:bg-[var(--plum)] hover:text-[var(--paper)] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <IconCheck className="w-4 h-4 text-green-700" />
                    ) : (
                      <IconCopy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* LinkedIn Row with Sliding Arrow */}
              <div className="flex flex-col gap-2 pt-4 border-t border-[var(--umber)]/15">
                <span className="text-xs uppercase font-semibold text-[var(--umber)]/60">
                  Professional Network
                </span>
                <a
                  href={SITE_CONTENT.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between font-inter font-semibold text-sm text-[var(--umber)] hover:text-[var(--plum)]"
                >
                  <span className="flex items-center gap-2">
                    <IconLinkedIn className="w-4 h-4 text-[var(--bronze)]" />
                    <span>LinkedIn</span>
                  </span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                    <IconArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              </div>

              {/* GitHub Row with Sliding Arrow */}
              <div className="flex flex-col gap-2 pt-4 border-t border-[var(--umber)]/15">
                <span className="text-xs uppercase font-semibold text-[var(--umber)]/60">
                  Open Source Code
                </span>
                <a
                  href={SITE_CONTENT.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between font-inter font-semibold text-sm text-[var(--umber)] hover:text-[var(--plum)]"
                >
                  <span className="flex items-center gap-2">
                    <IconGitHub className="w-4 h-4 text-[var(--bronze)]" />
                    <span>GitHub</span>
                  </span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                    <IconArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs font-mono text-[var(--umber)]/60">
            IIITDM KANCHEEPURAM // CHENNAI
          </div>
        </div>

        {/* Block 3: Right 5 Cols (--umber, --paper text) Form */}
        <div className="lg:col-span-5 bg-[var(--band-umber)] p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-8 w-full max-w-lg mx-auto"
          >
            {/* Honeypot field (hidden from view) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company-field">Company</label>
              <input
                id="company-field"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={formState.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
            </div>

            {/* Field: Name with floating label and animated underline */}
            <div className="relative pt-4">
              <input
                id="name"
                type="text"
                value={formState.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                required
                className="peer w-full bg-transparent py-2.5 text-base text-[var(--paper)] border-none outline-none focus:outline-none"
              />
              <label
                htmlFor="name"
                className={`absolute left-0 pointer-events-none transition-all duration-300 font-medium ${
                  formState.name
                    ? "top-0 text-xs text-[var(--bronze)] font-semibold"
                    : "top-5 text-sm text-[var(--paper)]/60 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--bronze)] peer-focus:font-semibold"
                }`}
              >
                Your Name
              </label>

              {/* Base Underline */}
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--paper)]/40" />
              {/* Focus Underline animating from left */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--bronze)] origin-left scale-x-0 transition-transform duration-350 peer-focus:scale-x-100" />

              {touched.name && errors.name && (
                <span className="text-xs text-[var(--mauve)] mt-1.5 block">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Field: Email */}
            <div className="relative pt-4">
              <input
                id="email"
                type="email"
                value={formState.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                required
                className="peer w-full bg-transparent py-2.5 text-base text-[var(--paper)] border-none outline-none focus:outline-none"
              />
              <label
                htmlFor="email"
                className={`absolute left-0 pointer-events-none transition-all duration-300 font-medium ${
                  formState.email
                    ? "top-0 text-xs text-[var(--bronze)] font-semibold"
                    : "top-5 text-sm text-[var(--paper)]/60 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--bronze)] peer-focus:font-semibold"
                }`}
              >
                Email Address
              </label>

              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--paper)]/40" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--bronze)] origin-left scale-x-0 transition-transform duration-350 peer-focus:scale-x-100" />

              {touched.email && errors.email && (
                <span className="text-xs text-[var(--mauve)] mt-1.5 block">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Field: Message */}
            <div className="relative pt-4">
              <textarea
                id="message"
                rows={5}
                value={formState.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                required
                maxLength={2000}
                className="peer w-full bg-transparent py-2.5 text-base text-[var(--paper)] border-none outline-none resize-none focus:outline-none"
              />
              <label
                htmlFor="message"
                className={`absolute left-0 pointer-events-none transition-all duration-300 font-medium ${
                  formState.message
                    ? "top-0 text-xs text-[var(--bronze)] font-semibold"
                    : "top-5 text-sm text-[var(--paper)]/60 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--bronze)] peer-focus:font-semibold"
                }`}
              >
                Project Message
              </label>

              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--paper)]/40" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--bronze)] origin-left scale-x-0 transition-transform duration-350 peer-focus:scale-x-100" />

              <div className="flex justify-between items-center mt-1.5 text-xs text-[var(--paper)]/60">
                <span>
                  {touched.message && errors.message ? (
                    <span className="text-[var(--mauve)]">{errors.message}</span>
                  ) : null}
                </span>
                <span className="font-mono">
                  {formState.message.length} / 2000
                </span>
              </div>
            </div>

            {/* Server Error Message */}
            {errors.server && (
              <div
                role="alert"
                aria-live="polite"
                className="p-3 bg-[var(--plum)] text-[var(--paper)] border border-[var(--mauve)] text-xs"
              >
                {errors.server}
              </div>
            )}

            {/* Magnetic Submit Button (60px high, full width, bronze fill with ink text) */}
            <Magnetic strength={0.15} radius={80} className="w-full">
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                aria-live="polite"
                className={`w-full h-[60px] font-anton text-lg uppercase tracking-wider flex items-center justify-center transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--paper)] cursor-pointer select-none ${
                  status === "success"
                    ? "bg-green-700 text-white"
                    : status === "sending"
                    ? "bg-[var(--bronze)]/70 text-[var(--ink)] cursor-wait"
                    : "bg-[var(--bronze)] text-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--umber)]"
                }`}
              >
                {status === "sending" ? (
                  <span className="flex items-center gap-3">
                    <span className="w-4 h-4 border-2 border-[var(--ink)] border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </span>
                ) : status === "success" ? (
                  <span className="flex items-center gap-2">
                    <IconCheck className="w-5 h-5" />
                    <span>Sent. I&apos;ll reply soon.</span>
                  </span>
                ) : (
                  <span>Send message</span>
                )}
              </button>
            </Magnetic>
          </form>
        </div>
      </div>
    </section>
  );
}
