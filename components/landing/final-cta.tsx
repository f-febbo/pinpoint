"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { Wordmark } from "./wordmark";

/**
 * Early-access form. No backend is connected yet, so submitting is a preview:
 * nothing is sent or stored. To go live, POST `email` to your waitlist endpoint
 * inside `onSubmit` and only show a success state once it responds OK.
 */
export function FinalCta() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "invalid" | "preview">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState("invalid");
      return;
    }
    // TODO: connect to a waitlist endpoint here.
    setState("preview");
  };

  return (
    <section id="early-access" aria-labelledby="cta-title" className="border-y-[1.5px] border-ink bg-pin">
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28">
        <h2 id="cta-title" className="display text-[clamp(3.4rem,14vw,10rem)] font-extrabold leading-[0.88]">
          Less searching.
          <br />
          More doing.
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          <p className="max-w-md text-xl leading-relaxed lg:col-span-5 lg:pt-8">
            Your work is already connected. Your information should be too.
          </p>
          <form onSubmit={onSubmit} noValidate className="lg:col-span-6 lg:col-start-7" aria-describedby="cta-status">
            <label htmlFor="cta-email" className="mb-2 block font-semibold">
              Work email
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="cta-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state !== "idle") setState("idle");
                }}
                aria-invalid={state === "invalid"}
                placeholder="you@company.com"
                className="min-w-0 flex-1 rounded-full border-[1.5px] border-ink bg-[#fffaf0] px-5 py-3.5 text-lg outline-none placeholder:text-stone focus-visible:shadow-[0_0_0_3px_var(--color-ink)]"
              />
              <button
                type="submit"
                className="rounded-full border-[1.5px] border-ink bg-ink px-7 py-3.5 text-lg font-semibold text-paper shadow-[3px_3px_0_#fffaf0] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_5px_0_#fffaf0] active:translate-y-px active:shadow-none"
              >
                Get early access
              </button>
            </div>
            <div id="cta-status" aria-live="polite" className="mt-3 min-h-[3rem] text-[0.95rem]">
              <AnimatePresence mode="wait">
                {state === "invalid" && (
                  <motion.p key="inv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-semibold">
                    Enter an email address like name@company.com.
                  </motion.p>
                )}
                {state === "preview" && (
                  <motion.p
                    key="prev"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border-[1.5px] border-dashed border-ink px-4 py-3"
                  >
                    <strong>Preview only.</strong> Early access sign-ups aren&rsquo;t open yet, so {email} wasn&rsquo;t
                    sent or saved anywhere.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

const footerLinks = [
  { href: "#product", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#privacy", label: "Privacy" },
  { href: "#about", label: "About" },
  { href: "#early-access", label: "Get early access" },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1320px] px-5 pb-10 pt-16 sm:px-8">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <a href="#top" className="text-[clamp(4rem,12vw,8rem)] leading-[0.8]" aria-label="Back to top">
          <Wordmark />
        </a>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-ink-3 underline-offset-4 hover:text-ink hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mt-12 border-t border-line pt-6 text-sm text-stone">© 2026 pinpoint. Built with care, still in development.</p>
    </footer>
  );
}
