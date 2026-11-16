"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";
import { FragmentCard, type Fragment } from "./fragment-card";
import { PinIcon } from "./pin-icon";

const fragments: Fragment[] = [
  { id: "invoice", kind: "finance", title: "Invoice #2291 is overdue", detail: "$4,800, Northwind Print", tag: "Overdue", urgent: true },
  { id: "vendor", kind: "mail", title: "Re: Q3 vendor renewal", detail: "Dana: can you confirm by Friday?", tag: "Reply by Fri", urgent: true },
  { id: "budget", kind: "calendar", title: "Budget review moved to 2:30", detail: "Room 4B, with Priya and Sam", tag: "Today", urgent: true },
  { id: "deck", kind: "chat", title: "“Did Ortiz get the deck?”", detail: "#launch, 4 days ago", tag: "Follow up" },
  { id: "redlines", kind: "mail", title: "Contract redlines attached", detail: "From legal, unread", tag: "Review" },
  { id: "pricing", kind: "doc", title: "Pricing_v4_final_FINAL", middle: true, detail: "Last opened 3 weeks ago", tag: "Found" },
  { id: "kickoff", kind: "notes", title: "Kickoff notes: owners TBD", detail: "Shared folder, no owner", tag: "Later" },
];

type Pos = { x: number; y: number; r: number };

// card centers in % of the field
const scatterWide: Record<string, Pos> = {
  vendor: { x: 25, y: 11, r: -7 },
  budget: { x: 76, y: 9, r: 5 },
  pricing: { x: 83, y: 38, r: 8 },
  deck: { x: 17, y: 41, r: -4 },
  invoice: { x: 78, y: 74, r: -6 },
  kickoff: { x: 20, y: 76, r: 6 },
  redlines: { x: 52, y: 93, r: -3 },
};
const scatterNarrow: Record<string, Pos> = {
  vendor: { x: 32, y: 6, r: -6 },
  budget: { x: 70, y: 17, r: 5 },
  pricing: { x: 70, y: 70, r: 7 },
  deck: { x: 28, y: 28, r: -4 },
  invoice: { x: 72, y: 88, r: -6 },
  kickoff: { x: 28, y: 78, r: 5 },
  redlines: { x: 34, y: 95, r: -3 },
};

export function Hero() {
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 640px)", true);
  const [autoSorted, setAutoSorted] = useState(false);
  const [choice, setChoice] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(0);
  const touched = choice !== null;
  // with reduced motion, start sorted; otherwise the intro sorts it
  const organized = choice ?? (reduce ? true : autoSorted);

  // One orchestrated moment: shortly after load, the pin pulls everything into order.
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => {
      setAutoSorted(true);
      setPulse((p) => p + 1);
    }, 1700);
    return () => clearTimeout(t);
  }, [reduce]);

  const toggle = () => {
    setChoice(!organized);
    setPulse((p) => p + 1);
  };

  const scatter = wide ? scatterWide : scatterNarrow;
  const pin = organized
    ? wide
      ? { x: 21, y: 50, w: 32 }
      : { x: 50, y: 11, w: 30 }
    : wide
      ? { x: 50, y: 50, w: 36 }
      : { x: 50, y: 50, w: 50 };

  const place = (id: string, i: number): Pos => {
    if (organized) {
      return wide ? { x: 67, y: 9.5 + i * 13.5, r: 0 } : { x: 50, y: 29 + i * 10.4, r: 0 };
    }
    const s = scatter[id];
    // hovering the pin tugs the scattered pieces toward it
    const pull = hovered ? 0.12 : 0;
    return { x: s.x + (pin.x - s.x) * pull, y: s.y + (pin.y - s.y) * pull, r: s.r * (1 - pull * 2) };
  };

  const line = {
    hidden: { y: "105%" },
    show: (i: number) => ({ y: "0%", transition: { delay: 0.1 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }),
  };

  return (
    <section id="top" className="relative overflow-hidden pt-24 sm:pt-28">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pb-28">
        <div className="flex flex-col justify-center lg:col-span-6 lg:pr-4">
          <h1 className="display text-[clamp(3.3rem,8.4vw,6.4rem)] font-extrabold">
            {["Everything", "you need.", "Finally in", "one place."].map((t, i) => (
              <span key={t} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  variants={line}
                  initial={reduce ? false : "hidden"}
                  animate="show"
                  custom={i}
                >
                  {t}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="fluid-body mt-8 max-w-[34rem] leading-relaxed text-ink-3"
          >
            Your work lives across dozens of apps. pinpoint brings it together, helps you find what matters, and keeps
            your information where it belongs.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#product"
              className="rounded-full border-[1.5px] border-ink bg-pin px-6 py-3.5 font-semibold shadow-[3px_3px_0_var(--color-ink)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_5px_0_var(--color-ink)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--color-ink)]"
            >
              Explore pinpoint
            </a>
            <a
              href="#how-it-works"
              className="rounded-full px-5 py-3.5 font-semibold ul"
            >
              How it works
            </a>
          </motion.div>
        </div>

        {/* the field */}
        <div className="lg:col-span-6">
          <div className="relative h-[700px] rounded-[20px] sm:h-[600px] border-[1.5px] border-ink bg-paper-2">
            {/* faint survey grid gives the field a sense of place */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-[20px] opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                backgroundPosition: "-1px -1px",
              }}
            />

            {/* leader lines from the pin to the sorted stack */}
            {wide && (
              <svg aria-hidden className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {fragments.map((f, i) => (
                  <motion.path
                    key={f.id}
                    d={`M 33 46 C 41 46, 40 ${9.5 + i * 13.5}, 47.5 ${9.5 + i * 13.5}`}
                    fill="none"
                    stroke="var(--color-ink)"
                    strokeWidth="1.25"
                    vectorEffect="non-scaling-stroke"
                    initial={false}
                    animate={{ opacity: organized ? (f.urgent ? 0.9 : 0.35) : 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.6, delay: organized ? 0.45 + i * 0.05 : 0 }}
                  />
                ))}
              </svg>
            )}

            {fragments.map((f, i) => {
              const p = place(f.id, i);
              return (
                <motion.div
                  key={f.id}
                  className="absolute w-[13rem] sm:w-[15rem]"
                  style={{ x: "-50%", y: "-50%" }}
                  initial={false}
                  animate={{ left: `${p.x}%`, top: `${p.y}%`, rotate: p.r }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 120, damping: 17, delay: organized ? i * 0.055 : (6 - i) * 0.03 }
                  }
                >
                  <FragmentCard f={f} showTag={organized} />
                </motion.div>
              );
            })}

            <motion.button
              type="button"
              onClick={toggle}
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={() => setHovered(false)}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
              aria-pressed={organized}
              aria-label={organized ? "Scatter the information again" : "Pull everything into one place"}
              className="absolute z-10 cursor-pointer rounded-full"
              style={{ x: "-50%", y: "-50%" }}
              initial={false}
              animate={{ left: `${pin.x}%`, top: `${pin.y}%`, width: `${pin.w}%` }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 20 }}
            >
              <PinIcon hovered={hovered} locked={organized} pulseKey={pulse} className="w-full" />
            </motion.button>
          </div>
          <p aria-live="polite" className="mt-3 text-sm text-stone">
            {organized
              ? "Seven things from six apps, ordered by what needs you first."
              : touched
                ? "Scattered again. Press the pin to bring it back together."
                : "Seven things, six apps. Press the pin."}
          </p>
        </div>
      </div>
    </section>
  );
}
