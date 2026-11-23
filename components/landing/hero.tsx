"use client";

import { useRef, type CSSProperties } from "react";
import { AsciiField } from "./ascii-field";
import { Logo, type BrandFile } from "./brands";
import { Mark } from "./mark";

type Note = { icon: BrandFile | "pinpoint"; from: string; subject?: string; body: string; time: string };

// what the apps send today
const raw: Note[] = [
  { icon: "microsoft-outlook", from: "Microsoft Outlook", subject: "Updated: Budget Review", body: "When: Mon 2:30 PM–3:30 PM. Where: Hudson 204", time: "now" },
  { icon: "google-gmail", from: "Dana Cole", subject: "Re: Re: Fwd: Q3 Renewal", body: "Hi all, circling back on the thread below. Any update on this?", time: "2m ago" },
  { icon: "google-calendar", from: "Google Calendar", subject: "Design Review", body: "1:00 – 2:00 PM, Studio 3", time: "5m ago" },
  { icon: "microsoft-teams", from: "Sam Okafor", body: "can u send the deck before the board call", time: "9m ago" },
  { icon: "slack-icon", from: "#finance", subject: "Priya Raman", body: "ok final Q1 numbers attached, pls review", time: "14m ago" },
  { icon: "microsoft-outlook", from: "Reminder", subject: "1:1 with Dana", body: "Starts at 3:30 PM", time: "20m ago" },
  { icon: "zoom-icon", from: "Zoom", subject: "Board Prep", body: "Your meeting is starting soon", time: "31m ago" },
];

// what Pinpoint sends instead
const smart: Note[] = [
  { icon: "pinpoint", from: "Leave by 2:18", body: "Budget review moved to Hudson 204, a 12 min walk away.", time: "now" },
  { icon: "pinpoint", from: "Reply to Dana", body: "She’s waited two days for your answer on the Q3 renewal.", time: "2m ago" },
  { icon: "pinpoint", from: "Bring the Budget Doc", body: "Design review starts at 1:00 in Studio 3.", time: "5m ago" },
  { icon: "pinpoint", from: "You Owe Sam the Deck", body: "He needs it before the 4:30 board call.", time: "9m ago" },
  { icon: "pinpoint", from: "Q1 Numbers Are In", body: "Priya needs your review by Friday.", time: "14m ago" },
  { icon: "pinpoint", from: "Clash at 3:30", body: "Your 1:1 with Dana overlaps the dentist. Move it to Tuesday?", time: "20m ago" },
  { icon: "pinpoint", from: "Board Prep Is Ready", body: "Notes from today’s review are attached to the invite.", time: "31m ago" },
];

type Depth = "near" | "mid" | "far";
const depth: Record<Depth, { scale: number; blur: number; opacity: number; secs: number; z: number }> = {
  near: { scale: 1, blur: 0, opacity: 1, secs: 19, z: 3 },
  mid: { scale: 0.86, blur: 1.4, opacity: 0.72, secs: 25, z: 2 },
  far: { scale: 0.72, blur: 3, opacity: 0.45, secs: 33, z: 1 },
};

// lane (x %), depth and start offset for each card in a column
type Lane = { x: number; d: Depth; at: number };
const lanes: Lane[] = [
  { x: 6, d: "near", at: 0 },
  { x: 40, d: "far", at: 0.1 },
  { x: 22, d: "mid", at: 0.26 },
  { x: 36, d: "near", at: 0.42 },
  { x: 0, d: "far", at: 0.58 },
  { x: 14, d: "near", at: 0.72 },
  { x: 32, d: "mid", at: 0.88 },
];
const phoneLanes: Lane[] = lanes.map((l, i) => ({ ...l, x: [0, 4, 2, 6, 0, 3, 5][i] }));

function Notification({ n, glass }: { n: Note; glass: boolean }) {
  return (
    <div
      className={`flex w-[320px] items-start gap-3 rounded-[22px] border border-white/[0.14] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_-16px_rgba(0,0,0,0.7)] ${
        glass ? "bg-white/[0.12] backdrop-blur-2xl backdrop-saturate-150" : "bg-[rgba(40,46,66,0.72)]"
      }`}
    >
      {n.icon === "pinpoint" ? (
        <span className="grid size-[38px] shrink-0 place-items-center rounded-[9px] bg-bg shadow-[0_0_0_1px_rgba(255,255,255,0.14)]">
          <Mark className="size-5 text-white" />
        </span>
      ) : (
        <span className="grid size-[38px] shrink-0 place-items-center rounded-[9px] bg-white/[0.92]">
          <Logo file={n.icon} className="size-6" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-[14px] font-semibold text-white">{n.from}</p>
          <span className="shrink-0 text-[12px] tabular-nums text-white/55">{n.time}</span>
        </div>
        {n.subject && <p className="truncate text-[14px] font-medium text-white/95">{n.subject}</p>}
        <p className="line-clamp-2 text-[14px] leading-snug text-white/80">{n.body}</p>
      </div>
    </div>
  );
}

/** Notifications falling at three depths of field, fading out toward the bottom. */
function Cascade({ notes, side, set = lanes }: { notes: Note[]; side: "left" | "right"; set?: Lane[] }) {
  return (
    <div
      className="relative h-full overflow-hidden"
      style={{
        maskImage: `linear-gradient(180deg, transparent 0%, #000 12%, #000 55%, transparent 96%), linear-gradient(${
          side === "left" ? "90deg" : "270deg"
        }, #000 86%, transparent 100%)`,
        maskComposite: "intersect",
      }}
    >
      {set.map((l, i) => {
        const D = depth[l.d];
        const style = {
          left: side === "left" ? `${l.x}%` : undefined,
          right: side === "right" ? `${l.x}%` : undefined,
          zIndex: D.z,
          animationDuration: `${D.secs}s`,
          animationDelay: `${-l.at * D.secs}s`,
          "--rest": `${10 + l.at * 70}%`,
        } as CSSProperties;
        return (
          <div key={i} className="fall absolute top-0 h-full" style={style}>
            <div
              style={{
                transform: `scale(${D.scale})`,
                transformOrigin: side === "left" ? "top left" : "top right",
                filter: D.blur ? `blur(${D.blur}px)` : undefined,
                opacity: D.opacity,
              }}
            >
              <Notification n={notes[i % notes.length]} glass={l.d === "near"} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Hero() {
  const pin = useRef<HTMLDivElement>(null);
  return (
    <section
      id="top"
      data-stack
      aria-labelledby="hero-title"
      className="relative flex h-svh min-h-[720px] flex-col overflow-hidden bg-bg lg:sticky lg:top-0"
    >
      <AsciiField anchor={pin} />
      {/* keep the title calm and the edges dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(5,6,13,0.85),transparent_70%),radial-gradient(130%_90%_at_50%_60%,transparent_60%,rgba(5,6,13,0.45))]"
      />

      <div data-stack-content className="relative flex flex-1 flex-col">
        <h1 id="hero-title" className="display rise px-5 pt-32 text-center text-[clamp(2.6rem,6.4vw,5.8rem)] sm:pt-36">
          Your Day, Pinpointed.
        </h1>

        <div className="relative mt-6 grid flex-1 grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-1">
          <div className="hidden lg:block">
            <Cascade notes={raw} side="left" />
          </div>
          <div className="grid place-items-center px-10 py-4 lg:py-0">
            <div ref={pin} className="size-[180px] rounded-full lg:size-[240px]" aria-hidden />
            <span className="sr-only">
              Pinpoint turns the notifications your apps send into ones that tell you what to do next.
            </span>
          </div>
          <div className="hidden lg:block">
            <Cascade notes={smart} side="right" />
          </div>
          {/* phones: just what Pinpoint sends */}
          <div className="relative min-h-[300px] lg:hidden">
            <div className="absolute inset-0 flex justify-center">
              <div className="relative h-full w-[340px]">
                <Cascade notes={smart} side="left" set={phoneLanes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
