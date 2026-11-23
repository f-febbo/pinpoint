"use client";

import { useRef, type CSSProperties } from "react";
import { AsciiField } from "./ascii-field";
import { Logo, type BrandFile } from "./brands";
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

// Each card has its own size and speed. Size sets the depth of field: smaller
// reads as farther away, so it's blurrier, dimmer and slower.
type Lane = { x: number; size: number; secs: number; at: number };
const lanes: Lane[] = [
  { x: 6, size: 1.02, secs: 15, at: 0 },
  { x: 42, size: 0.68, secs: 31, at: 0.08 },
  { x: 20, size: 0.86, secs: 21, at: 0.2 },
  { x: 34, size: 0.97, secs: 17, at: 0.33 },
  { x: 0, size: 0.62, secs: 36, at: 0.45 },
  { x: 26, size: 0.78, secs: 25, at: 0.56 },
  { x: 12, size: 0.93, secs: 18, at: 0.68 },
  { x: 40, size: 0.72, secs: 28, at: 0.8 },
  { x: 4, size: 0.84, secs: 22, at: 0.91 },
];
const phoneLanes: Lane[] = lanes.map((l, i) => ({ ...l, x: [0, 4, 2, 6, 0, 3, 5, 2, 1][i] }));

const focus = (size: number) => ({
  blur: Math.max(0, (0.98 - size) * 9),
  opacity: Math.min(1, 0.3 + ((size - 0.6) / 0.4) * 0.7),
  z: Math.round(size * 10),
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

/** Notifications falling at varied depths of field, accelerating and fading toward the bottom. */
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
        const D = focus(l.size);
        const style = {
          left: side === "left" ? `${l.x}%` : undefined,
          right: side === "right" ? `${l.x}%` : undefined,
          zIndex: D.z,
          animationDuration: `${l.secs}s`,
          animationDelay: `${-l.at * l.secs}s`,
          "--rest": `${10 + l.at * 70}%`,
        } as CSSProperties;
        return (
          <div key={i} className="fall absolute top-0 h-full" style={style}>
            <div
              style={{
                transform: `scale(${l.size})`,
                transformOrigin: side === "left" ? "top left" : "top right",
                filter: D.blur ? `blur(${D.blur}px)` : undefined,
                opacity: D.opacity,
              }}
            >
              <Notification n={notes[i % notes.length]} glass={l.size >= 0.92} />
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
          your day, pinpointed.
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
