"use client";

import { useState } from "react";
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

type FormField = "name" | "email" | "message";
type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
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

  const [status, setStatus] = useState<FormStatus>("idle");
  const [copied, setCopied] = useState(false);

  const validateField = (field: FormField, value: string): boolean => {
    let error = "";

    if (field === "name") {
      if (value.trim().length < 2) {
        error = "Enter your name (2 characters or more)";
      }
    }

    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value.trim() || !emailRegex.test(value.trim())) {
        error = "Enter a valid email";
      }
    }

    if (field === "message") {
      if (value.trim().length < 10) {
        error = "Write at least 10 characters";
      } else if (value.length > 2000) {
        error = "Message must be under 2000 characters";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === "";
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formState[field]);
  };

  const handleChange = (
    field: FormField | "company",
    value: string
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));

    if (field !== "company" && touched[field]) {
      validateField(field, value);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONTENT.personal.email);
      setCopied(true);
      showToast("Email copied to clipboard");

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      showToast("Could not copy email. Email: " + SITE_CONTENT.personal.email);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.company.trim() !== "") {
      return;
    }

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    const isNameValid = validateField("name", formState.name);
    const isEmailValid = validateField("email", formState.email);
    const isMessageValid = validateField("message", formState.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    setStatus("sending");
    setErrors((prev) => ({ ...prev, server: "" }));

    const subject = "Portfolio message from " + formState.name;

    const body = [
      "Name: " + formState.name,
      "Email: " + formState.email,
      "",
      "Message:",
      formState.message,
    ].join("\n");

    const mailtoUrl =
      "mailto:" +
      SITE_CONTENT.personal.email +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    try {
      window.location.href = mailtoUrl;

      setStatus("success");
      firePaletteConfetti();
      showToast("Your email app is opening with your message.");

      setFormState({
        name: "",
        email: "",
        message: "",
        company: "",
      });

      setTouched({
        name: false,
        email: false,
        message: false,
      });
    } catch {
      setStatus("error");

      setErrors((prev) => ({
        ...prev,
        server:
          "Could not open your email app. Please email directly to " +
          SITE_CONTENT.personal.email +
          ".",
      }));
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden border-t border-[var(--paper)]/15"
    >
      <div className="grid min-h-[560px] grid-cols-1 lg:grid-cols-12">
        {/* Introduction */}
        <div className="flex flex-col justify-between border-b border-[var(--paper)]/15 bg-[var(--plum)] p-8 sm:p-12 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-16">
          <div>
            <span className="mb-6 block h-1 w-12 bg-[var(--bronze)]" />

            <RevealLines
              as="h2"
              lines={["LET'S BUILD", "SOMETHING."]}
              className="display-l uppercase leading-[0.9] tracking-tight text-[var(--paper)]"
            />
          </div>

          <div className="mt-8 border-t border-[var(--paper)]/20 pt-8">
            <p className="max-w-[28ch] text-sm leading-relaxed text-[var(--paper)]/80 sm:text-base">
              Available for high-impact software engineering, AI vision
              systems, and robotics initiatives.
            </p>
          </div>
        </div>

        {/* Direct channels */}
        <div className="flex flex-col justify-between border-b border-[#35251F]/20 bg-[#F3E9DC] p-8 text-[#35251F] sm:p-12 lg:col-span-3 lg:border-b-0 lg:border-r">
          <div>
            <span className="mb-8 block font-anton text-xl uppercase tracking-wider text-[#8A5B36]">
              Direct Channels
            </span>

            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase text-[#5A463D]">
                  Email
                </span>

                <div className="flex items-center justify-between gap-2">
                  <a
                    href={"mailto:" + SITE_CONTENT.personal.email}
                    className="truncate text-sm font-semibold text-[#35251F] hover:text-[#65405D]"
                  >
                    {SITE_CONTENT.personal.email}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email address"
                    aria-label="Copy email address"
                    className="cursor-pointer rounded border border-[#35251F]/30 p-1.5 text-[#35251F] transition-colors hover:bg-[#65405D] hover:text-white"
                  >
                    {copied ? (
                      <IconCheck className="h-4 w-4 text-green-700" />
                    ) : (
                      <IconCopy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex flex-col gap-2 border-t border-[#35251F]/15 pt-4">
                <span className="text-xs font-semibold uppercase text-[#5A463D]">
                  Professional Network
                </span>

                <a
                  href={SITE_CONTENT.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-sm font-semibold text-[#35251F] hover:text-[#65405D]"
                >
                  <span className="flex items-center gap-2">
                    <IconLinkedIn className="h-4 w-4 text-[#8A5B36]" />
                    <span>LinkedIn</span>
                  </span>

                  <IconArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>

              {/* GitHub */}
              <div className="flex flex-col gap-2 border-t border-[#35251F]/15 pt-4">
                <span className="text-xs font-semibold uppercase text-[#5A463D]">
                  Open Source Code
                </span>

                <a
                  href={SITE_CONTENT.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-sm font-semibold text-[#35251F] hover:text-[#65405D]"
                >
                  <span className="flex items-center gap-2">
                    <IconGitHub className="h-4 w-4 text-[#8A5B36]" />
                    <span>GitHub</span>
                  </span>

                  <IconArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 font-mono text-xs text-[#5A463D]">
            IIITDM KANCHEEPURAM // CHENNAI
          </div>
        </div>

        {/* Contact form */}
        <div className="flex flex-col justify-center bg-[#35251F] p-8 sm:p-12 lg:col-span-5 lg:p-16">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto flex w-full max-w-lg flex-col gap-8"
          >
            {/* Honeypot field */}
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

            {/* Name */}
            <div className="relative pt-4">
              <input
                id="name"
                type="text"
                value={formState.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                required
                autoComplete="name"
                className="peer w-full border-none bg-transparent py-2.5 text-base text-[#F3E9DC] outline-none focus:outline-none"
              />

              <label
                htmlFor="name"
                className={
                  "pointer-events-none absolute left-0 font-medium transition-all duration-300 " +
                  (formState.name
                    ? "top-0 text-xs font-semibold text-[#D0A16B]"
                    : "top-5 text-sm text-[#F3E9DC]/70 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[#D0A16B]")
                }
              >
                Your Name
              </label>

              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F3E9DC]/40" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-[#D0A16B] transition-transform duration-300 peer-focus:scale-x-100" />

              {touched.name && errors.name && (
                <span className="mt-1.5 block text-xs text-[#E8A6A6]">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="relative pt-4">
              <input
                id="email"
                type="email"
                value={formState.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                required
                autoComplete="email"
                className="peer w-full border-none bg-transparent py-2.5 text-base text-[#F3E9DC] outline-none focus:outline-none"
              />

              <label
                htmlFor="email"
                className={
                  "pointer-events-none absolute left-0 font-medium transition-all duration-300 " +
                  (formState.email
                    ? "top-0 text-xs font-semibold text-[#D0A16B]"
                    : "top-5 text-sm text-[#F3E9DC]/70 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[#D0A16B]")
                }
              >
                Email Address
              </label>

              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F3E9DC]/40" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-[#D0A16B] transition-transform duration-300 peer-focus:scale-x-100" />

              {touched.email && errors.email && (
                <span className="mt-1.5 block text-xs text-[#E8A6A6]">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Message */}
            <div className="relative pt-4">
              <textarea
                id="message"
                rows={5}
                value={formState.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                required
                maxLength={2000}
                className="peer w-full resize-none border-none bg-transparent py-2.5 text-base text-[#F3E9DC] outline-none focus:outline-none"
              />

              <label
                htmlFor="message"
                className={
                  "pointer-events-none absolute left-0 font-medium transition-all duration-300 " +
                  (formState.message
                    ? "top-0 text-xs font-semibold text-[#D0A16B]"
                    : "top-5 text-sm text-[#F3E9DC]/70 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[#D0A16B]")
                }
              >
                Project Message
              </label>

              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F3E9DC]/40" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-[#D0A16B] transition-transform duration-300 peer-focus:scale-x-100" />

              <div className="mt-1.5 flex items-center justify-between text-xs text-[#F3E9DC]/70">
                <span>
                  {touched.message && errors.message ? (
                    <span className="text-[#E8A6A6]">{errors.message}</span>
                  ) : null}
                </span>

                <span className="font-mono">
                  {formState.message.length} / 2000
                </span>
              </div>
            </div>

            {/* Server error */}
            {errors.server && (
              <div
                role="alert"
                aria-live="polite"
                className="border border-[#E8A6A6] bg-[#65405D] p-3 text-xs text-[#F3E9DC]"
              >
                {errors.server}
              </div>
            )}

            {/* Submit button */}
            <Magnetic strength={0.15} radius={80} className="w-full">
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                aria-live="polite"
                className={
                  "flex h-[60px] w-full cursor-pointer select-none items-center justify-center font-anton text-lg uppercase tracking-wider transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F3E9DC] " +
                  (status === "success"
                    ? "bg-green-700 text-white"
                    : status === "sending"
                    ? "cursor-wait bg-[#D0A16B]/70 text-[#35251F]"
                    : "bg-[#D0A16B] text-[#35251F] hover:bg-[#F3E9DC] hover:text-[#35251F]")
                }
              >
                {status === "sending" ? (
                  <span className="flex items-center gap-3">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#35251F] border-t-transparent" />
                    <span>Opening email...</span>
                  </span>
                ) : status === "success" ? (
                  <span className="flex items-center gap-2">
                    <IconCheck className="h-5 w-5" />
                    <span>Email app opened</span>
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