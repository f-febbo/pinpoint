"use client";

import { useEffect, useState } from "react";
import { Mark } from "./mark";
import { Wordmark } from "./wordmark";

const links = [
  { href: "#where", label: "Schedule" },
  { href: "#ask", label: "Ask" },
  { href: "#privacy", label: "Privacy" },
];

/** A soft dark glow behind nav text, so it stays readable over anything without a bar. */
function Halo() {
  return <span aria-hidden className="pointer-events-none absolute -inset-x-9 -inset-y-5 -z-10 rounded-full bg-bg/95 blur-lg" />;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  // transparent over the hero, solid once you've scrolled past it
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), { rootMargin: "-72px 0px 0px 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid ? "border-white/[0.08] bg-bg" : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="isolate flex h-[72px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#top" className="relative flex items-center gap-2.5 text-[1.3rem] text-white" aria-label="pinpoint home">
          <Halo />
          <Mark className="size-7" />
          <Wordmark />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          <Halo />
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2 text-[0.95rem] text-white transition-opacity hover:opacity-70">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="relative flex items-center gap-2">
          <Halo />
          <a href="#feedback" className="press text-[0.95rem] font-medium text-white transition-opacity hover:opacity-70">
            Give Feedback
          </a>
          <button
            type="button"
            className="press grid size-10 place-items-center rounded-full text-white md:hidden"
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
        <ul id="mobile-menu" className="mx-3 rounded-[20px] border border-white/[0.08] bg-bg/90 px-5 pb-2 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-white/[0.08] py-4 text-lg text-white last:border-0">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
