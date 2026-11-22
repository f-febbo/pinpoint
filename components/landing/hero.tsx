"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ease } from "@/components/app/ui";
import { integrations, Logo, type BrandFile } from "./brands";
import { Mark } from "./mark";

/** Midnight to electric blue to cantaloupe, seen through fluted glass. */
function Backdrop() {
  return (
    <div aria-hidden className="grain absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(34%_55%_at_74%_72%,rgba(46,107,255,0.75),rgba(46,107,255,0.18)_55%,transparent_80%),radial-gradient(55%_38%_at_45%_104%,rgba(255,164,102,0.85),rgba(242,121,58,0.4)_45%,transparent_80%),linear-gradient(180deg,#05060d_0%,#060819_55%,#0a1030_100%)]" />
      <div
        className="absolute inset-0 opacity-90 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.04) 7px, rgba(0,0,0,0.38) 19px, rgba(255,255,255,0.12) 24px)",
          maskImage: "radial-gradient(50% 85% at 74% 80%, #000 30%, transparent 85%)",
        }}
      />
    </div>
  );
}

/* ---------- the flow: your apps arc out of the phone into Pinpoint ---------- */

const FLOW_W = 340;
const FLOW_H = 460;
const TARGET = { x: 292, y: 230 };

// start points around the phone and hand, each with its own arc into the icon
const starts = [
  { x: 6, y: 120, lift: -70 },
  { x: 30, y: 60, lift: -40 },
  { x: 14, y: 200, lift: -30 },
  { x: 40, y: 300, lift: 50 },
  { x: 8, y: 380, lift: 70 },
  { x: 52, y: 150, lift: -60 },
  { x: 26, y: 250, lift: 30 },
  { x: 60, y: 410, lift: 60 },
  { x: 48, y: 20, lift: -20 },
];
const arc = (s: (typeof starts)[number]) =>
  `M ${s.x} ${s.y} C ${s.x + 110} ${s.y + s.lift}, ${TARGET.x - 110} ${TARGET.y + (s.y - TARGET.y) * 0.25}, ${TARGET.x} ${TARGET.y}`;

function Flow() {
  return (
    <div className="relative shrink-0" style={{ width: FLOW_W, height: FLOW_H }} aria-hidden>
      <svg className="absolute inset-0" width={FLOW_W} height={FLOW_H}>
        <defs>
          <linearGradient id="arc-fade" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="1" stopColor="#6d97ff" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {starts.map((s, i) => (
          <path key={i} d={arc(s)} fill="none" stroke="url(#arc-fade)" strokeWidth="1" strokeDasharray="2 6" />
        ))}
      </svg>

      {starts.map((s, i) => {
        const brand = integrations[i % integrations.length];
        return (
          <span
            key={i}
            className="flow-logo absolute left-0 top-0 grid size-10 place-items-center rounded-[12px] border border-white/15 bg-white/[0.08] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md"
            style={{ offsetPath: `path("${arc(s)}")`, animationDelay: `${i * -0.42}s` }}
          >
            <Logo file={brand.file} className="size-5" />
          </span>
        );
      })}

      {/* Pinpoint, where everything lands */}
      <div className="absolute grid size-[88px] -translate-x-1/2 -translate-y-1/2 place-items-center" style={{ left: TARGET.x, top: TARGET.y }}>
        <span className="pulse-ring absolute inset-2 rounded-full bg-blue-soft/40" />
        <div className="absolute -inset-6 rounded-full bg-blue/40 blur-2xl" />
        <div className="relative grid size-full place-items-center rounded-full bg-[radial-gradient(circle_at_32%_26%,rgba(255,255,255,0.5),rgba(255,255,255,0.06)_40%,rgba(10,16,40,0.6)_72%)] p-[2px] shadow-[0_20px_40px_-14px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.22)]">
          <div className="grid size-full place-items-center rounded-full bg-[radial-gradient(circle_at_40%_30%,#2c3a6e,#0b1026_72%)] shadow-[inset_0_2px_8px_rgba(255,255,255,0.18),inset_0_-10px_20px_rgba(0,0,0,0.6)]">
            <Mark className="size-9 text-white drop-shadow-[0_0_12px_rgba(109,151,255,0.7)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- the feed: what Pinpoint tells you, as it happens ---------- */

type Note = { title: string; body: string; src: BrandFile | null };
const pool: Note[] = [
  { title: "Leave Now for Budget Review", body: "Hudson 204 is a 12 min walk, so head out by 2:18.", src: "google-calendar" },
  { title: "You Told Ortiz You’d Send the Deck", body: "Heard at 1:31 PM, so I’ll remind you at 5.", src: null },
  { title: "Calendar Clash at 3:30", body: "Your 1:1 with Dana overlaps the dentist.", src: "microsoft-teams" },
  { title: "Decision Saved", body: "Headcount stays flat and $40k moves to tooling.", src: null },
  { title: "Dana Confirmed Thursday at 10", body: "The renewal walkthrough is now in Outlook.", src: "microsoft-outlook" },
  { title: "Budget Doc Updated", body: "Priya edited Q1 Budget, Draft 3 in Drive.", src: "google-drive" },
  { title: "Reply Waiting", body: "Dana is still waiting on your Q3 renewal answer.", src: "google-gmail" },
  { title: "Board Prep Moved to 4:30", body: "The Zoom link and your notes are ready.", src: "zoom-icon" },
  { title: "New in #finance", body: "Sam shared the final Q1 numbers.", src: "slack-icon" },
];

function Notification({ n, age }: { n: Note; age: number }) {
  return (
    <div className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-[rgba(36,38,48,0.72)] p-3 pr-3.5 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_12px_32px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <span className="grid size-[38px] shrink-0 place-items-center rounded-[9px] bg-[#05060d] shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
        <Mark className="size-5 text-white" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-baseline justify-between gap-3">
          <p className="min-w-0 truncate text-[14px] font-semibold text-white">{n.title}</p>
          <span className="shrink-0 text-[12px] tabular-nums text-white/50">{age === 0 ? "now" : `${age}m ago`}</span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-[13.5px] leading-snug text-white/80">{n.body}</p>
      </div>
      {n.src && (
        <span className="grid size-9 shrink-0 place-items-center self-center rounded-[10px] bg-white/[0.07]">
          <Logo file={n.src} className="size-5" />
        </span>
      )}
    </div>
  );
}

function Feed() {
  const [items, setItems] = useState(() => [3, 2, 1, 0].map((i) => ({ id: i, n: pool[i] })));
  const ref = useRef<HTMLDivElement>(null);
  const next = useRef(4);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting)
        id = setInterval(() => {
          const k = next.current++;
          setItems((list) => [{ id: k, n: pool[k % pool.length] }, ...list].slice(0, 5));
        }, 1700);
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-[420px] w-full max-w-[440px] overflow-hidden"
      style={{ maskImage: "linear-gradient(180deg, #000 72%, transparent)" }}
    >
      <ul className="space-y-2.5 pt-1">
        <AnimatePresence initial={false}>
          {items.map((it, i) => (
            <motion.li
              key={it.id}
              layout
              initial={{ opacity: 0, x: -28, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2, ease } }}
              transition={{ duration: 0.45, ease }}
            >
              <Notification n={it.n} age={Math.floor(i / 2)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export function Hero({ photo }: { photo: string | null }) {
  return (
    <section id="top" data-stack className="relative flex min-h-[820px] flex-col overflow-hidden lg:sticky lg:top-0 lg:h-svh">
      <Backdrop />
      <div data-stack-content className="relative flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-[1100px] px-5 pt-28 text-center sm:px-8 sm:pt-32">
          <h1 className="display rise text-[clamp(2.15rem,6.2vw,5.4rem)]">
            <span className="block sm:whitespace-nowrap">Everything You Need.</span>
            <span className="block sm:whitespace-nowrap">Finally in One Place.</span>
          </h1>
          <p className="fluid-body rise mx-auto mt-6 max-w-[34rem] leading-relaxed text-white" style={{ animationDelay: "120ms" }}>
            Pinpoint is a pin you wear that remembers where you need to be and what you promised.
          </p>
        </div>

        {/* desktop: photo → flow into Pinpoint → live notifications */}
        <div className="rise relative mx-auto mt-auto hidden w-full max-w-[1440px] items-center px-8 pb-6 lg:flex" style={{ animationDelay: "240ms" }}>
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt="A woman wearing a Pinpoint pin, speaking a reminder into her phone"
              className="-ml-8 h-[460px] w-auto shrink-0 object-cover"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, #000 20%, #000 88%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 14%, #000 80%, transparent 100%)",
                maskComposite: "intersect",
              }}
            />
          )}
          <div className={photo ? "-ml-[150px]" : "ml-auto"}>
            <Flow />
          </div>
          <div className={photo ? "ml-6 flex flex-1 justify-center" : "ml-10 mr-auto flex w-[440px] justify-center"}>
            <Feed />
          </div>
        </div>

        {/* phones: photo, then the feed */}
        <div className="rise relative mt-8 flex flex-col items-center gap-6 px-5 pb-10 lg:hidden" style={{ animationDelay: "240ms" }}>
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt="A woman wearing a Pinpoint pin, speaking a reminder into her phone"
              className="h-[260px] w-full object-cover object-[70%_30%]"
              style={{ maskImage: "linear-gradient(180deg, #000 70%, transparent)" }}
            />
          )}
          <div className={photo ? "-mt-16 w-full" : "w-full"}>
            <Feed />
          </div>
        </div>
      </div>
    </section>
  );
}
