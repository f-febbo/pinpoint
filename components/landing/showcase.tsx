"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { AskPanel, FollowupsPanel, HistoryPanel, SearchPanel, TodayPanel } from "./showcase-panels";
import { SourceGlyph, sourceLabel, type SourceKind } from "./source-glyph";
import { Wordmark } from "./wordmark";

const tabs = [
  { id: "search", label: "Search", blurb: "One search box for every connected app.", Panel: SearchPanel },
  { id: "today", label: "Today", blurb: "A daily overview of what changed and what's coming.", Panel: TodayPanel },
  { id: "followups", label: "Follow-ups", blurb: "Promises and requests, pulled out of your threads.", Panel: FollowupsPanel },
  { id: "history", label: "History", blurb: "A searchable record of what happened, and where.", Panel: HistoryPanel },
  { id: "ask", label: "Ask", blurb: "Questions answered from your own information, with sources.", Panel: AskPanel },
] as const;

const sources: { kind: SourceKind; synced: string }[] = [
  { kind: "mail", synced: "2 min ago" },
  { kind: "calendar", synced: "2 min ago" },
  { kind: "chat", synced: "just now" },
  { kind: "doc", synced: "6 min ago" },
  { kind: "finance", synced: "1 hr ago" },
  { kind: "notes", synced: "12 min ago" },
];

export function Showcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const { Panel } = tabs[active];

  return (
    <section id="product" aria-labelledby="product-title" className="border-t border-line bg-paper-2 py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="product-title" className="display text-[clamp(2.5rem,6vw,5.2rem)] font-extrabold lg:col-span-8">
            pinpoint isn&rsquo;t another app to check.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-ink-3 lg:col-span-4 lg:pb-2">
            It&rsquo;s a way to make sense of the ones you already use. Here&rsquo;s a look at what that could feel
            like on a Monday morning.
          </p>
        </div>

        {/* tabs */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Product views"
            onKeyDown={onKey}
            className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0"
          >
            {tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${t.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors ${
                  active === i ? "text-ink" : "text-stone hover:text-ink"
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="tab-pill"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 -z-0 rounded-full border-[1.5px] border-ink bg-pin"
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
          <p className="text-sm text-stone">{tabs[active].blurb}</p>
        </div>

        {/* the mockup */}
        <div className="mt-5 overflow-hidden rounded-[18px] border-[1.5px] border-ink bg-[#fcfbf7] shadow-[6px_6px_0_var(--color-ink)]">
          <div className="flex items-center gap-4 border-b-[1.5px] border-ink px-4 py-3 sm:px-5">
            <span className="text-xl leading-none">
              <Wordmark />
            </span>
            <span className="hidden flex-1 items-center gap-2 rounded-lg bg-paper-2 px-3 py-1.5 text-sm text-stone sm:flex">
              <svg viewBox="0 0 20 20" className="size-3.5" aria-hidden>
                <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M13 13l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Search or ask anything
            </span>
            <span className="ml-auto grid size-8 place-items-center rounded-full border-[1.5px] border-ink bg-pin-soft text-xs font-bold sm:ml-0">
              JM
            </span>
          </div>

          <div className="grid md:grid-cols-[210px_1fr]">
            <aside className="hidden border-r-[1.5px] border-ink p-4 md:block" aria-label="Mockup sidebar">
              <ul className="space-y-0.5">
                {tabs.map((t, i) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setActive(i)}
                      className={`w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                        active === i ? "bg-ink font-semibold text-paper" : "hover:bg-paper-2"
                      }`}
                    >
                      {t.label === "Ask" ? "Ask pinpoint" : t.label}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mb-2 mt-7 px-3 text-xs font-semibold text-stone">Connected (sample)</p>
              <ul className="space-y-1">
                {sources.map((s) => (
                  <li key={s.kind} className="flex items-center gap-2 px-3 py-1 text-sm">
                    <SourceGlyph kind={s.kind} className="size-4" />
                    <span className="flex-1">{sourceLabel[s.kind]}</span>
                    <span className="size-1.5 rounded-full bg-[#3b9a5a]" title={`Synced ${s.synced}`} />
                  </li>
                ))}
              </ul>
            </aside>

            <div
              role="tabpanel"
              id={`panel-${tabs[active].id}`}
              aria-labelledby={`tab-${tabs[active].id}`}
              className="min-h-[560px] p-4 sm:p-7"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={tabs[active].id}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <Panel />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <p className="mt-5 text-sm text-stone">
          Concept mockup with sample data. pinpoint is in development, and no real accounts or apps are connected here.
        </p>
      </div>
    </section>
  );
}
