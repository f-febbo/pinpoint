"use client";

import { useRef, useState, type CSSProperties } from "react";
import { AsciiField } from "./ascii-field";
import { integrations, Logo, type BrandFile } from "./brands";
import { Mark } from "./mark";

type Note = { icon: BrandFile | "pinpoint"; from: string; subject?: string; body: string; time: string };

// what the apps send today, and what Pinpoint sends instead (same index = same event)
const raw: Note[] = [
  { icon: "microsoft-outlook", from: "Microsoft Outlook", subject: "Updated: Budget Review", body: "When: Mon 2:30 PM–3:30 PM (UTC-05:00). Where: Hudson 204", time: "now" },
  { icon: "google-gmail", from: "Dana Cole", subject: "Re: Re: Fwd: Q3 Renewal", body: "Hi all, just circling back on the thread below. Any update?", time: "2m ago" },
  { icon: "microsoft-teams", from: "Sam Okafor", body: "can u send the deck before the board call 🙏", time: "4m ago" },
  { icon: "google-calendar", from: "Design Review", body: "1:00 – 2:00 PM, Studio 3", time: "6m ago" },
  { icon: "slack-icon", from: "#finance", subject: "Priya Raman", body: "final Q1 numbers attached, pls review when u get a sec", time: "11m ago" },
  { icon: "google-gmail", from: "Gmail", subject: "4 new messages", body: "Northwind Print, LinkedIn, Dana Cole, and 1 more", time: "15m ago" },
  { icon: "microsoft-outlook", from: "Reminder", subject: "1:1 with Dana", body: "3:30 PM, Microsoft Teams Meeting", time: "22m ago" },
  { icon: "notion-icon", from: "Jordan mentioned you", subject: "Launch Plan", body: "@you can you own the timeline for this?", time: "28m ago" },
  { icon: "zoom-icon", from: "Zoom", subject: "Board Prep", body: "Your meeting is starting soon", time: "34m ago" },
];

const smart: Note[] = [
  { icon: "pinpoint", from: "Leave by 2:18", body: "Budget review moved to Hudson 204, a 12 min walk away.", time: "now" },
  { icon: "pinpoint", from: "Dana Is Waiting on You", body: "She asked for your Q3 renewal answer two days ago.", time: "2m ago" },
  { icon: "pinpoint", from: "Send Sam the Deck", body: "He needs it before the 4:30 board call.", time: "4m ago" },
  { icon: "pinpoint", from: "Bring the Budget Doc", body: "Design review picks up where Friday’s call left off.", time: "6m ago" },
  { icon: "pinpoint", from: "Review Q1 by Friday", body: "Priya shared the final numbers in #finance.", time: "11m ago" },
  { icon: "pinpoint", from: "One Email Matters", body: "Northwind’s invoice #2291 is 9 days overdue.", time: "15m ago" },
  { icon: "pinpoint", from: "Clash at 3:30", body: "Your 1:1 with Dana overlaps the dentist. Move it to Tuesday?", time: "22m ago" },
  { icon: "pinpoint", from: "New Task From Jordan", body: "Own the launch plan timeline, due next Wednesday.", time: "28m ago" },
  { icon: "pinpoint", from: "Board Prep in 10 Min", body: "Notes from today’s budget review are attached.", time: "34m ago" },
];

// Each side falls at its own pace, so the two never move in step. Within a side
// every card shares the same timing, so cards never slide over one another;
// they zigzag left and right, and size sets the depth of field.
type Slot = { x: number; size: number; at: number };
type Track = { secs: number; slots: Slot[] };
const leftTrack: Track = {
  secs: 26,
  slots: [
    { x: 4, size: 1, at: 0 },
    { x: 44, size: 0.84, at: 0.2 },
    { x: 18, size: 0.93, at: 0.4 },
    { x: 48, size: 0.8, at: 0.6 },
    { x: 0, size: 0.89, at: 0.8 },
  ],
};
const rightTrack: Track = {
  secs: 31,
  slots: [
    { x: 40, size: 0.88, at: 0.1 },
    { x: 2, size: 1, at: 0.3 },
    { x: 48, size: 0.82, at: 0.5 },
    { x: 14, size: 0.95, at: 0.7 },
    { x: 30, size: 0.86, at: 0.9 },
  ],
};
const phoneTrack: Track = {
  secs: 24,
  slots: [
    { x: 0, size: 1, at: 0 },
    { x: 6, size: 0.86, at: 0.25 },
    { x: 2, size: 0.93, at: 0.5 },
    { x: 7, size: 0.84, at: 0.75 },
  ],
};

const focus = (size: number) => ({
  blur: Math.max(0, (0.98 - size) * 9),
  opacity: Math.min(1, 0.45 + ((size - 0.78) / 0.22) * 0.55),
});

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
        <span className="grid size-[38px] shrink-0 place-items-center rounded-[9px] bg-white">
          <Logo file={n.icon} tone="original" className="size-6" />
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

/** Notifications falling at varied depths of field, picking up speed and fading toward the bottom. */
function Cascade({ notes, side, track }: { notes: Note[]; side: "left" | "right"; track: Track }) {
  // each time a slot loops back to the top it takes the next unused notification,
  // so the cards on screen are always different
  const [shown, setShown] = useState(() => track.slots.map((_, i) => i));
  const next = useRef(track.slots.length);
  return (
    <div
      className="relative h-full overflow-hidden"
      style={{
        maskImage: `linear-gradient(180deg, transparent 0%, #000 7%, #000 58%, transparent 96%), linear-gradient(${
          side === "left" ? "90deg" : "270deg"
        }, #000 90%, transparent 100%)`,
        maskComposite: "intersect",
      }}
    >
      {track.slots.map((l, i) => {
        const D = focus(l.size);
        const style = {
          left: side === "left" ? `${l.x}%` : undefined,
          right: side === "right" ? `${l.x}%` : undefined,
          zIndex: Math.round(l.size * 10),
          animationDuration: `${track.secs}s`,
          animationDelay: `${-l.at * track.secs}s`,
          "--rest": `${8 + l.at * 72}%`,
        } as CSSProperties;
        return (
          <div
            key={i}
            className="fall absolute top-0 h-full"
            style={style}
            onAnimationIteration={() => {
              const k = next.current++;
              setShown((v) => v.map((c, j) => (j === i ? k : c)));
            }}
          >
            <div
              style={{
                transform: `scale(${l.size})`,
                transformOrigin: side === "left" ? "top left" : "top right",
                filter: D.blur ? `blur(${D.blur}px)` : undefined,
                opacity: D.opacity,
              }}
            >
              <Notification n={notes[shown[i] % notes.length]} glass={l.size >= 0.92} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Compatible() {
  return (
    <div className="relative flex flex-col items-center gap-3">
      <span aria-hidden className="absolute -inset-x-8 -inset-y-5 -z-10 rounded-full bg-bg/70 blur-xl" />
      <p className="text-[13px] font-medium text-white/80">Compatible With</p>
      <ul className="flex items-center justify-center gap-3.5 sm:gap-5">
        {integrations.map((b) => (
          <li key={b.file} title={b.name}>
            <Logo file={b.file} alt={b.name} className="size-6 sm:size-8" />
          </li>
        ))}
      </ul>
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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(5,6,13,0.85),transparent_70%)]"
      />

      <div data-stack-content className="relative isolate flex flex-1 flex-col">
        {/* desktop: the two cascades run the full height, from the menu bar down, close in on the pin */}
        <div className="absolute inset-0 -z-10 hidden lg:grid lg:grid-cols-[1fr_272px_1fr]">
          <Cascade notes={raw} side="left" track={leftTrack} />
          <div />
          <Cascade notes={smart} side="right" track={rightTrack} />
        </div>

        <div className="relative mx-auto pt-32 sm:pt-36">
          <span aria-hidden className="absolute inset-x-[-6%] bottom-[-18%] top-[28%] -z-10 rounded-full bg-bg/70 blur-2xl" />
          <h1 id="hero-title" className="display rise px-5 text-center text-[clamp(2.6rem,6.4vw,5.8rem)]">
            your day, pinpointed.
          </h1>
        </div>

        <div className="mt-8 flex flex-col items-center gap-8 lg:mt-12 lg:gap-9">
          <div ref={pin} className="size-[180px] rounded-full lg:size-[232px]" aria-hidden />
          <span className="sr-only">
            Pinpoint turns the notifications your apps send into ones that tell you what to do next.
          </span>
          <Compatible />
        </div>

        {/* phones: just what Pinpoint sends */}
        <div className="relative mt-4 min-h-[300px] flex-1 lg:hidden">
          <div className="absolute inset-0 flex justify-center">
            <div className="relative h-full w-[340px]">
              <Cascade notes={smart} side="left" track={phoneTrack} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
