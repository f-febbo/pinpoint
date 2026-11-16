"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { SourceGlyph, sourceLabel, type SourceKind } from "./source-glyph";

type Item = {
  kind: SourceKind;
  title: string;
  detail: string;
  caption?: string;
  resolved?: string;
  from: { x: number; y: number; r: number };
  to: { x: number; y: number };
  noise?: boolean;
};

const items: Item[] = [
  {
    kind: "mail",
    title: "Re: Contract timeline",
    detail: "You, last Tuesday: “Let me check and get back to you.”",
    caption: "The email you meant to follow up on.",
    resolved: "Waiting on you for 6 days",
    from: { x: 30, y: 16, r: -8 },
    to: { x: 50, y: 24 },
  },
  {
    kind: "doc",
    title: "Onboarding plan, draft 2",
    detail: "Saved somewhere. Probably.",
    caption: "The document you know you saved somewhere.",
    resolved: "Found in the team drive",
    from: { x: 73, y: 30, r: 6 },
    to: { x: 50, y: 43.5 },
  },
  {
    kind: "chat",
    title: "“…so can we get it by the 21st?”",
    detail: "#ops thread, 38 replies in",
    caption: "The deadline buried in a message.",
    resolved: "Due Friday, Nov 21",
    from: { x: 30, y: 60, r: 5 },
    to: { x: 50, y: 63 },
  },
  {
    kind: "calendar",
    title: "Call with Marisol, Oct 30",
    detail: "What did we agree on pricing?",
    caption: "The conversation you can't quite remember.",
    resolved: "Notes and decision linked",
    from: { x: 72, y: 76, r: -7 },
    to: { x: 50, y: 82.5 },
  },
  {
    kind: "mail",
    title: "Newsletter: 12 unread",
    detail: "Promotions",
    noise: true,
    from: { x: 66, y: 52, r: 11 },
    to: { x: 86, y: 52 },
  },
  {
    kind: "notes",
    title: "Standup notes, Mon",
    detail: "Nothing new",
    noise: true,
    from: { x: 24, y: 90, r: -4 },
    to: { x: 14, y: 92 },
  },
];

// scroll choreography (fractions of the section's scroll)
const GATHER = [0.3, 0.72];

function Piece({ item, i, p }: { item: Item; i: number; p: MotionValue<number> }) {
  const start = GATHER[0] + i * 0.025;
  const end = GATHER[1] + i * 0.02;
  const left = useTransform(p, [start, end], [`${item.from.x}%`, `${item.to.x}%`]);
  const top = useTransform(p, [start, end], [`${item.from.y}%`, `${item.to.y}%`]);
  const rotate = useTransform(p, [0, start, end], [item.from.r * 1.4, item.from.r, 0]);
  const opacity = useTransform(p, [start, end], [1, item.noise ? 0.18 : 1]);
  const scale = useTransform(p, [start, end], [1, item.noise ? 0.85 : 1]);
  const tag = useTransform(p, [end - 0.04, end + 0.06], [0, 1]);

  return (
    <motion.div
      className="absolute w-[14.5rem] sm:w-[19rem]"
      style={{ left, top, rotate, opacity, scale, x: "-50%", y: "-50%" }}
    >
      <div className="rounded-[10px] border-[1.5px] border-ink bg-card px-3.5 py-3 shadow-[3px_3px_0_var(--color-ink)]">
        <div className="flex items-center gap-1.5 text-xs text-stone">
          <SourceGlyph kind={item.kind} className="size-3.5 text-ink" />
          {sourceLabel[item.kind]}
        </div>
        <p className="mt-1 truncate text-sm font-semibold sm:text-[0.95rem]">{item.title}</p>
        <p className="hidden truncate text-xs text-stone sm:block sm:text-sm">{item.detail}</p>
        {item.resolved && (
          <motion.p
            style={{ opacity: tag }}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-lime px-2 py-0.5 text-[0.7rem] font-semibold sm:text-xs"
          >
            <span className="size-1.5 rounded-full bg-ink" />
            {item.resolved}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

function Caption({ text, i, p }: { text: string; i: number; p: MotionValue<number> }) {
  const at = 0.06 + i * 0.06;
  const opacity = useTransform(p, [at, at + 0.06], [0.25, 1]);
  const x = useTransform(p, [at, at + 0.06], [-8, 0]);
  return (
    <motion.li style={{ opacity, x }} className="border-t border-line py-3 text-lg leading-snug sm:text-xl">
      {text}
    </motion.li>
  );
}

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const done = useMotionValue(1);
  const p = reduce ? done : scrollYProgress;

  const panel = useTransform(p, [0.55, 0.75], [0, 1]);
  const panelScale = useTransform(p, [0.55, 0.75], [0.96, 1]);
  const closing = useTransform(p, [0.78, 0.88], [0, 1]);

  return (
    <section aria-labelledby="problem-title" className="border-t border-line">
      <div ref={ref} className={reduce ? "" : "h-[300vh]"}>
        <div className={`${reduce ? "" : "sticky top-0 h-svh"} overflow-hidden`}>
          <div className="mx-auto grid h-full max-w-[1320px] grid-rows-[auto_1fr] gap-4 px-5 pb-6 pt-20 sm:px-8 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-6 lg:pb-0 lg:pt-16">
            <div className="lg:col-span-5">
              <h2 id="problem-title" className="display text-balance text-[clamp(2.3rem,4.6vw,4.2rem)] font-extrabold">
                Your information is everywhere. Your attention shouldn&rsquo;t be.
              </h2>
              <ul className="mt-6 hidden max-w-md sm:block lg:mt-10">
                {items
                  .filter((it) => it.caption)
                  .map((it, i) => (
                    <Caption key={it.caption} text={it.caption!} i={i} p={p} />
                  ))}
              </ul>
              <motion.p style={{ opacity: closing }} className="mt-4 hidden max-w-md text-stone sm:block lg:mt-6">
                Four things, four apps, one place to see them. pinpoint keeps the thread so you don&rsquo;t have to.
              </motion.p>
            </div>

            <div className="relative min-h-[420px] lg:col-span-7 lg:h-[600px]">
              <motion.div
                aria-hidden
                style={{ opacity: panel, scale: panelScale }}
                className="absolute inset-x-[4%] inset-y-[4%] rounded-[20px] border-[1.5px] border-ink bg-paper-2 sm:inset-x-[16%]"
              >
                <div className="flex items-center justify-between border-b-[1.5px] border-ink px-4 py-2.5">
                  <span className="font-display text-lg font-bold">Needs you</span>
                  <span className="grid size-7 place-items-center rounded-full border-[1.5px] border-ink bg-lime text-sm font-bold">
                    4
                  </span>
                </div>
              </motion.div>
              {items.map((it, i) => (
                <Piece key={it.title} item={it} i={i} p={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
