"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./wordmark";

const links = [
  { href: "#where", label: "Where to be" },
  { href: "#find", label: "Find anything" },
  { href: "#privacy", label: "Privacy" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1280px] items-center justify-between"
      >
        <a
          href="#top"
          aria-label="pinpoint home"
          className={`rounded-full px-5 py-3 text-[1.05rem] transition-[background-color,box-shadow] duration-300 ${
            scrolled || open ? "bg-card/95 shadow-[0_0_0_1px_var(--color-line)] backdrop-blur-md" : ""
          }`}
        >
          <Wordmark />
        </a>

        <div className="flex items-center gap-1 rounded-full bg-card/95 p-1 shadow-[0_0_0_1px_var(--color-line)] backdrop-blur-md">
          <ul className="hidden items-center md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="label block rounded-full px-4 py-2.5 text-moss transition-colors hover:bg-mist hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#feedback" className="label rounded-full bg-ink px-4 py-2.5 text-paper transition-colors hover:bg-moss">
            Give feedback
          </a>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 20 20" className="size-4" aria-hidden stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 7h14M3 13h14" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="mx-auto mt-2 max-w-[1280px] rounded-3xl bg-card p-2 shadow-[0_0_0_1px_var(--color-line)] md:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3.5 text-lg font-light hover:bg-mist">
                  {l.label.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
