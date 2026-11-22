"use client";

import { useEffect, useState } from "react";
import { Mark } from "./mark";
import { Wordmark } from "./wordmark";

const links = [
  { href: "#where", label: "Schedule" },
  { href: "#ask", label: "Ask" },
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled || open ? "border-b border-white/8 bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-[1.3rem]" aria-label="pinpoint home">
          <Mark className="size-7" animate />
          <Wordmark />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2 text-[0.95rem] text-text/75 transition-colors hover:text-text">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#feedback"
            className="rounded-full bg-text px-5 py-2.5 text-[0.95rem] font-medium text-bg transition-colors hover:bg-white"
          >
            Give feedback
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 20 20" className="size-5" aria-hidden stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 7h14M3 13h14" />}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <ul id="mobile-menu" className="border-t border-white/8 px-5 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-white/8 py-4 text-lg">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
