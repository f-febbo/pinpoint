"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AskView } from "@/components/app/ask";
import { ScaleFit } from "@/components/app/scale-fit";
import { SettingsView } from "@/components/app/settings";
import { TodayView } from "@/components/app/today";
import { ease } from "@/components/app/ui";
import { Logo, type BrandFile } from "./brands";
import { Mark } from "./mark";

/** Midnight to electric blue to cantaloupe, seen through fluted glass. */
function Backdrop() {
  return (
    <div aria-hidden className="grain absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(45%_60%_at_62%_78%,rgba(46,107,255,0.9),rgba(46,107,255,0.22)_55%,transparent_80%),radial-gradient(60%_38%_at_50%_104%,rgba(255,164,102,0.95),rgba(242,121,58,0.45)_45%,transparent_80%),linear-gradient(180deg,#05060d_0%,#060819_55%,#0a1030_100%)]" />
      <div
        className="absolute inset-0 opacity-90 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.04) 7px, rgba(0,0,0,0.38) 19px, rgba(255,255,255,0.12) 24px)",
          maskImage: "radial-gradient(75% 85% at 55% 80%, #000 30%, transparent 85%)",
        }}
      />
    </div>
  );
}

/** Placeholder until the photo is supplied: a phone mid-capture. */
function PhoneArt() {
  return (
    <div className="relative mx-auto h-[400px] w-[200px] -rotate-6">
      <div aria-hidden className="absolute -inset-12 rounded-full bg-blue/30 blur-3xl" />
      <div className="relative h-full rounded-[38px] border border-white/20 bg-[linear-gradient(160deg,#20263d,#0b0e1c)] p-2.5 shadow-[0_2px_4px_rgba(0,0,0,0.4),0_40px_80px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)]">
        <div className="flex h-full flex-col items-center rounded-[30px] bg-[#0b0d16] px-5 pt-10">
          <span className="h-5 w-20 rounded-full bg-black" />
          <p className="mt-10 text-sm text-muted">Listening</p>
          <div className="mt-6 flex h-16 items-center gap-[4px]">
            {[10, 22, 34, 18, 40, 26, 14, 30, 20, 12].map((h, i) => (
              <motion.span
                key={i}
                className="w-[4px] rounded-full bg-blue-soft"
                animate={{ height: [h, h * 0.45, h] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
              />
            ))}
          </div>
          <p className="mt-6 text-center text-[13px] leading-snug text-text/80">“Push the budget review to 2:30.”</p>
          <span className="mt-auto mb-8 grid size-14 place-items-center rounded-full bg-orange text-bg">
            <Mark className="size-6" />
          </span>
        </div>
      </div>
    </div>
  );
}

type Chip = { icon: BrandFile | "voice"; text: string };
const rows: Chip[][] = [
  [
    { icon: "voice", text: "“Push the review to 2:30”" },
    { icon: "voice", text: "“I’ll send the deck tonight”" },
    { icon: "voice", text: "“Dentist at 3 tomorrow”" },
    { icon: "voice", text: "“Remind me to call Dana”" },
  ],
  [
    { icon: "microsoft-outlook", text: "Design Review, 1:00 PM" },
    { icon: "google-calendar", text: "Budget Review, 2:30 PM" },
    { icon: "google-gmail", text: "Re: Q3 Renewal" },
    { icon: "microsoft-teams", text: "1:1 with Dana" },
  ],
  [
    { icon: "slack-icon", text: "#finance: Q1 numbers" },
    { icon: "google-drive", text: "Q1 Budget, Draft 3" },
    { icon: "notion-icon", text: "Launch Plan" },
    { icon: "zoom-icon", text: "Board Prep, 4:00 PM" },
  ],
];

function ChipEl({ c }: { c: Chip }) {
  return (
    <li className="flex shrink-0 items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] py-1.5 pl-2 pr-3.5 text-[13px] whitespace-nowrap backdrop-blur-sm">
      {c.icon === "voice" ? (
        <span className="grid size-5 place-items-center rounded-full bg-orange/90 text-bg">
          <Mark className="size-3" />
        </span>
      ) : (
        <Logo file={c.icon} className="size-5" />
      )}
      {c.text}
    </li>
  );
}

/** Three streams of what you say, schedule and read, converging and fanning into the app. */
function Streams() {
  return (
    <div className="relative h-full">
      <div
        className="absolute inset-y-0 left-0 right-[38%] flex flex-col justify-center gap-7"
        style={{ maskImage: "linear-gradient(90deg, transparent 0%, #000 22%, #000 70%, transparent 100%)" }}
      >
        {rows.map((r, i) => (
          <ul key={i} className="marquee-right flex w-max gap-3" style={{ animationDuration: `${26 + i * 6}s` }}>
            {[...r, ...r, ...r, ...r].map((c, j) => (
              <ChipEl key={j} c={c} />
            ))}
          </ul>
        ))}
      </div>
      <svg className="absolute inset-y-0 right-0 h-full w-[52%]" viewBox="0 0 200 300" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="stream" x1="0" x2="1">
            <stop offset="0" stopColor="#6d97ff" stopOpacity="0" />
            <stop offset="0.35" stopColor="#6d97ff" />
            <stop offset="1" stopColor="#ffa466" />
          </linearGradient>
        </defs>
        {[
          "M0 88 C 50 88, 70 150, 100 150",
          "M0 150 L 100 150",
          "M0 212 C 50 212, 70 150, 100 150",
          "M100 150 C 140 150, 160 60, 200 60",
          "M100 150 L 200 150",
          "M100 150 C 140 150, 160 240, 200 240",
        ].map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="url(#stream)" strokeOpacity="0.25" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <path
              d={d}
              fill="none"
              stroke="url(#stream)"
              strokeWidth="2"
              strokeDasharray="6 14"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="flow"
              style={{ animationDelay: `${i * -0.2}s` }}
            />
          </g>
        ))}
        <circle cx="100" cy="150" r="3" fill="#eef1f8" />
      </svg>
      <div aria-hidden className="absolute left-[74%] top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/50 blur-2xl" />
    </div>
  );
}

const views: { id: string; el: ReactNode }[] = [
  { id: "today", el: <TodayView group="hero" /> },
  { id: "ask", el: <AskView group="hero" /> },
  { id: "settings", el: <SettingsView group="hero" /> },
];

/** One product demo that cycles through the app, crossfading between screens. */
function Demo() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting) id = setInterval(() => setI((n) => (n + 1) % views.length), 8000);
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, []);

  return (
    <div ref={ref} className="relative min-w-0">
      <ScaleFit width={1440} scrollBelow={0} reserveHeight={470}>
        <div className="grid">
          <AnimatePresence initial={false}>
            <motion.div
              key={views[i].id}
              className="col-start-1 row-start-1"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.4, ease } }}
              transition={{ duration: 0.5, ease }}
            >
              {views[i].el}
            </motion.div>
          </AnimatePresence>
        </div>
      </ScaleFit>
    </div>
  );
}

export function Hero({ photo }: { photo: string | null }) {
  return (
    <section id="top" data-stack className="relative flex min-h-[780px] flex-col overflow-hidden lg:sticky lg:top-0 lg:h-svh">
      <Backdrop />
      <div data-stack-content className="relative flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-[1100px] px-5 pt-28 text-center sm:px-8 sm:pt-32">
          <h1 className="display rise text-[clamp(2.15rem,6.4vw,5.6rem)]">
            <span className="block sm:whitespace-nowrap">Everything You Need.</span>
            <span className="block sm:whitespace-nowrap">Finally in One Place.</span>
          </h1>
          <p className="fluid-body rise mx-auto mt-6 max-w-[34rem] leading-relaxed text-text/75" style={{ animationDelay: "120ms" }}>
            A pin you wear and an app you check. Pinpoint remembers where you need to be and what you promised.
          </p>
        </div>

        <div className="rise relative mx-auto mt-10 grid w-full max-w-[1440px] flex-1 items-center gap-0 px-5 pb-10 sm:px-8 lg:mt-6 lg:grid-cols-[0.62fr_0.95fr_1.6fr]" style={{ animationDelay: "240ms" }}>
          <div className="hidden h-full items-end justify-center lg:flex">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt="A person speaking a reminder into their phone"
                className="h-full max-h-[520px] w-auto object-contain object-bottom"
                style={{ maskImage: "linear-gradient(180deg, #000 75%, transparent), linear-gradient(90deg, #000 80%, transparent)", maskComposite: "intersect" }}
              />
            ) : (
              <PhoneArt />
            )}
          </div>
          <div className="hidden h-[300px] lg:block">
            <Streams />
          </div>
          <div className="hidden lg:block">
            <Demo />
          </div>

          {/* phones: the capture moment, with one stream of what it picks up */}
          <div className="flex flex-col items-center gap-8 lg:hidden">
            <div className="origin-top scale-[0.8]">
              <PhoneArt />
            </div>
            <div
              className="-mt-16 w-screen overflow-hidden"
              style={{ maskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)" }}
            >
              <ul className="marquee-right flex w-max gap-3">
                {[...rows[1], ...rows[0], ...rows[2], ...rows[1], ...rows[0], ...rows[2]].map((c, j) => (
                  <ChipEl key={j} c={c} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
