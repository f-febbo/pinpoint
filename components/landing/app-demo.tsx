"use client";

import type { ReactNode } from "react";
import { useLoop } from "@/lib/use-loop";
import { Logo } from "./brands";
import { I } from "./icons";
import { Mark } from "./mark";

export type View = "today" | "ask" | "privacy";

const nav: { id: View | "follow" | "people" | "places"; label: string; icon: keyof typeof I }[] = [
  { id: "today", label: "Today", icon: "today" },
  { id: "ask", label: "Ask", icon: "ask" },
  { id: "follow", label: "Follow-ups", icon: "follow" },
  { id: "people", label: "People", icon: "people" },
  { id: "places", label: "Places", icon: "places" },
  { id: "privacy", label: "Privacy", icon: "shield" },
];

function Card({ title, aside, children, className = "" }: { title?: string; aside?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 rounded-2xl border border-border bg-surface p-3.5 sm:p-5 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-[0.95rem] font-medium">{title}</p>
          {aside}
        </div>
      )}
      {children}
    </div>
  );
}

/** The pinpoint app, as a still frame of the real UI. */
export function AppFrame({ view, children, title, meta }: { view: View; children: ReactNode; title: string; meta: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-border bg-bg-2 shadow-[0_40px_120px_-40px_rgba(46,107,255,0.45)]">
      <div className="grid md:grid-cols-[208px_1fr]">
        <aside className="hidden flex-col border-r border-border p-4 md:flex">
          <div className="flex items-center gap-2 px-2 pb-6 pt-1">
            <Mark className="size-5 text-text" />
            <span className="font-logo text-[0.95rem] font-semibold tracking-[-0.02em]">pinpoint</span>
          </div>
          <ul className="space-y-1">
            {nav.map((n) => {
              const Icon = I[n.icon];
              const on = n.id === view;
              return (
                <li
                  key={n.id}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${on ? "bg-surface-2 text-text" : "text-muted"}`}
                >
                  <Icon />
                  {n.label}
                </li>
              );
            })}
          </ul>
          <div className="mt-auto rounded-xl border border-border p-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="relative grid size-2 place-items-center">
                <span className="pulse-ring absolute size-2 rounded-full bg-green" />
                <span className="size-2 rounded-full bg-green" />
              </span>
              Pin connected
            </div>
            <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full w-[82%] rounded-full bg-text/70" />
            </div>
            <p className="mt-1.5 text-xs text-muted">82% battery</p>
          </div>
        </aside>

        <div className="min-w-0 p-3 sm:p-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">{title}</p>
              <p className="mt-1 text-sm text-muted">{meta}</p>
            </div>
            <div className="flex items-center gap-1.5">
              {(["microsoft-outlook", "google-calendar", "microsoft-teams", "slack-icon"] as const).map((f) => (
                <span key={f} className="grid size-8 place-items-center rounded-lg border border-border bg-surface">
                  <Logo file={f} className="size-4" />
                </span>
              ))}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------- Today: where to be ---------- */

const events = [
  { t: "9:30", end: 10, title: "Team standup", where: "Teams", file: "microsoft-teams" as const, start: 9.5 },
  { t: "1:00", end: 14, title: "Design review", where: "Studio 3", file: "microsoft-outlook" as const, start: 13 },
  { t: "2:30", end: 15, title: "Budget review", where: "Hudson 204", file: "google-calendar" as const, start: 14.5 },
  { t: "3:15", end: 16, title: "1:1 with Dana", where: "Teams call", file: "microsoft-teams" as const, start: 15.25, clash: true },
];

export function TodayView() {
  // 8 steps: the clock walks from 1:52 to 2:18, then the leave-now alert lands
  const { ref, step } = useLoop<HTMLDivElement>(8, 1100);
  const minutes = [52, 56, 0, 4, 8, 12, 16, 18][step];
  const hour = minutes >= 50 ? 1 : 2;
  const now = hour + 12 + minutes / 60;
  const leave = step >= 6;
  const toGo = Math.max(0, Math.round((14.5 - now) * 60));
  const done = Math.min(3, Math.floor(step / 2));

  const dayStart = 9;
  const dayEnd = 17;
  const pct = (h: number) => `${((h - dayStart) / (dayEnd - dayStart)) * 100}%`;

  return (
    <div ref={ref}>
      <AppFrame view="today" title="Today" meta={<>Monday, November 16 <span className="text-dim">·</span> {hour}:{String(minutes).padStart(2, "0")} PM</>}>
        <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
          <Card title="Schedule" aside={<span className="text-xs text-muted">3 calendars</span>}>
            {/* day rail */}
            <div className="relative mb-5 h-10 rounded-xl bg-surface-2">
              {events.map((e) => (
                <span
                  key={e.t}
                  className={`absolute inset-y-2 rounded-md ${e.clash ? "bg-rose/70" : now >= e.end ? "bg-dim/60" : "bg-blue"}`}
                  style={{ left: pct(e.start), width: `calc(${pct(e.end)} - ${pct(e.start)} - 2px)` }}
                />
              ))}
              <span
                className="absolute inset-y-0 w-0.5 bg-orange transition-[left] duration-700 ease-out"
                style={{ left: pct(now) }}
              >
                <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-orange" />
              </span>
            </div>
            <ul className="divide-y divide-border">
              {events.map((e) => {
                const past = now >= e.end;
                const next = !past && now < e.start && e.t === "2:30";
                return (
                  <li key={e.t} className={`flex items-center gap-3 py-3 ${past ? "opacity-45" : ""}`}>
                    <span className="w-11 shrink-0 text-sm tabular-nums text-muted">{e.t}</span>
                    <Logo file={e.file} className="size-4" />
                    <span className="min-w-0 flex-1 truncate text-[0.95rem]">
                      {e.title}
                      <span className="text-muted">, {e.where}</span>
                    </span>
                    {next && (
                      <span className="shrink-0 rounded-full bg-blue/15 px-2.5 py-1 text-xs tabular-nums text-blue-soft">{toGo}m</span>
                    )}
                    {e.clash && (
                      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-rose/12 px-2 py-1 text-xs text-rose sm:px-2.5">
                        <I.alert className="size-3.5" />
                        <span className="hidden sm:inline">Clashes with dentist</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>

          <div className="grid gap-4">
            <Card
              className={`transition-colors duration-500 ${leave ? "border-orange/60 bg-[color-mix(in_srgb,var(--color-orange)_10%,var(--color-surface))]" : ""}`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${leave ? "bg-orange text-bg" : "bg-surface-2 text-muted"}`}
                >
                  <I.walk className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-medium">{leave ? "Leave now for Budget review" : `Budget review in ${toGo} min`}</p>
                  <p className="mt-1 text-sm text-muted">Hudson 204, 12 min walk</p>
                </div>
              </div>
              {/* route */}
              <svg viewBox="0 0 300 70" className="mt-4 h-16 w-full" aria-hidden>
                <path d="M10 55 C 70 55, 80 18, 140 22 S 230 50, 290 14" fill="none" stroke="var(--color-border)" strokeWidth="6" strokeLinecap="round" />
                <path
                  d="M10 55 C 70 55, 80 18, 140 22 S 230 50, 290 14"
                  fill="none"
                  stroke="var(--color-orange)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={leave ? 0 : 1 - step / 10}
                  className="transition-[stroke-dashoffset] duration-700"
                />
                <circle cx="10" cy="55" r="6" fill="var(--color-text)" />
                <circle cx="290" cy="14" r="6" fill="var(--color-orange)" />
              </svg>
            </Card>

            <Card title="Due today" aside={<span className="text-xs tabular-nums text-muted">{3 - done} left</span>}>
              <ul className="space-y-2.5">
                {["Send Ortiz the launch deck", "Reply to Dana on the renewal", "Book room for Thursday"].map((t, i) => (
                  <li key={t} className="flex items-center gap-3 text-sm">
                    <span
                      className={`grid size-[18px] shrink-0 place-items-center rounded-md border transition-colors duration-300 ${
                        i < done ? "border-blue bg-blue text-white" : "border-dim"
                      }`}
                    >
                      {i < done && <I.check />}
                    </span>
                    <span className={i < done ? "text-muted line-through" : ""}>{t}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </AppFrame>
    </div>
  );
}

/* ---------- Ask: anything you heard or read ---------- */

const QUESTION = "What did Priya say about the Q1 budget?";
const ANSWER =
  "In today’s design review, Priya suggested keeping headcount flat and moving $40k from events into tooling. Sam agreed. You said you’d update the budget doc by Friday.";

export function AskView() {
  // 0-3 type the question, 4-11 stream the answer, 12-15 hold
  const { ref, step } = useLoop<HTMLDivElement>(16, 420);
  const q = QUESTION.slice(0, Math.min(QUESTION.length, Math.round((step / 3) * QUESTION.length)));
  const words = ANSWER.split(" ");
  const shown = step < 4 ? 0 : Math.min(words.length, Math.round(((step - 3) / 8) * words.length));
  const complete = shown >= words.length;
  const bars = [6, 14, 9, 20, 12, 24, 16, 8, 18, 22, 10, 15, 7, 19, 13, 21, 9, 16, 11, 6, 14, 20, 12, 8];

  return (
    <div ref={ref}>
      <AppFrame view="ask" title="Ask" meta="Searches your pin, calendars, mail and chats">
        <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
          <div className="grid content-start gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-blue/50 bg-surface px-4 py-3.5 shadow-[0_0_0_4px_rgba(46,107,255,0.12)]">
              <I.ask className="size-5 text-blue-soft" />
              <span className="text-[0.95rem]">
                {q}
                {step < 4 && <span className="caret ml-px inline-block h-[1.05em] w-px translate-y-[3px] bg-text" />}
              </span>
            </div>
            <Card className="min-h-[188px]">
              <div className="mb-3 flex items-center gap-2 text-sm text-muted">
                <Mark className="size-4 text-orange" />
                pinpoint
              </div>
              <p className="text-[1.02rem] leading-relaxed">
                {words.slice(0, shown).join(" ")}
                {step >= 4 && !complete && <span className="caret ml-0.5 inline-block size-2 rounded-full bg-orange align-middle" />}
              </p>
              <div className={`mt-4 flex flex-wrap gap-2 transition-opacity duration-500 ${complete ? "opacity-100" : "opacity-0"}`}>
                <span className="flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs">
                  <I.wave className="size-3.5 text-orange" />
                  Heard by your pin, 1:12 PM
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs">
                  <Logo file="slack-icon" className="size-3.5" />
                  #finance, Oct 14
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs">
                  <Logo file="google-drive" className="size-3.5" />
                  Q1 budget, draft 3
                </span>
              </div>
            </Card>
          </div>

          <div className="grid content-start gap-4">
            <Card title="Design review" aside={<span className="text-xs text-muted">1:00 PM, 52 min</span>}>
              <div className="flex h-12 items-center gap-[3px]">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className={`w-full rounded-full transition-colors duration-300 ${i >= 9 && i <= 14 && step >= 4 ? "bg-orange" : "bg-dim/70"}`}
                    style={{ height: `${h * 1.8}px` }}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                <span className="text-text">Priya:</span>{" "}
                <span className={`rounded px-0.5 transition-colors duration-500 ${step >= 4 ? "bg-orange/20 text-text" : ""}`}>
                  Let’s keep headcount flat and put the $40k from events into tooling.
                </span>
              </p>
            </Card>
            <Card className={`transition-all duration-500 ${complete ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
              <div className="flex items-center gap-3 text-sm">
                <span className="grid size-8 place-items-center rounded-lg bg-blue/15 text-blue-soft">
                  <I.follow className="size-4" />
                </span>
                <div>
                  <p>Follow-up added</p>
                  <p className="text-muted">Update the budget doc by Friday</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </AppFrame>
    </div>
  );
}

/* ---------- Privacy: what stays on your devices ---------- */

export function PrivacyView() {
  const { ref, step } = useLoop<HTMLDivElement>(10, 1000);
  const processed = 222 + step * 3; // minutes processed on device today
  const atDoctor = step >= 4 && step <= 8;
  const toggles = [
    { label: "Process on this iPhone", on: true, locked: true },
    { label: "Delete raw audio after 24 hours", on: true },
    { label: "Back up to the cloud", on: false },
    { label: "Pause at the doctor’s office", on: true },
  ];

  return (
    <div ref={ref}>
      <AppFrame view="privacy" title="Privacy" meta="Everything pinpoint knows stays on your devices">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card title="Processed today">
            <p className="text-4xl font-medium tabular-nums tracking-[-0.03em]">
              {Math.floor(processed / 60)}h {String(processed % 60).padStart(2, "0")}m
            </p>
            <p className="mt-1 text-sm text-muted">of audio, on this iPhone</p>
            <div className="mt-5 border-t border-border pt-4">
              <p className="text-4xl font-medium tabular-nums tracking-[-0.03em] text-blue-soft">0 bytes</p>
              <p className="mt-1 text-sm text-muted">sent to the cloud</p>
            </div>
          </Card>

          <Card title="Your pin" aside={<span className={`text-xs ${atDoctor ? "text-orange" : "text-green"}`}>{atDoctor ? "Paused" : "Listening"}</span>}>
            <div className="grid place-items-center py-3">
              <div className="relative grid size-28 place-items-center rounded-full border border-border bg-[radial-gradient(circle_at_35%_30%,#2a3558,#0b1020_70%)] shadow-[inset_0_2px_6px_rgba(255,255,255,0.12),0_20px_40px_-20px_rgba(46,107,255,0.6)]">
                <Mark className={`size-10 ${atDoctor ? "text-dim" : "text-text"}`} animate={!atDoctor} />
                <span className={`absolute bottom-4 size-1.5 rounded-full ${atDoctor ? "bg-orange" : "bg-green"}`} />
              </div>
            </div>
            <p className={`mt-2 text-center text-sm transition-colors ${atDoctor ? "text-text" : "text-muted"}`}>
              {atDoctor ? "You’re at Dr. Lee’s office, so recording is off." : "Light on means it’s listening."}
            </p>
          </Card>

          <Card title="Controls">
            <ul className="space-y-3.5">
              {toggles.map((t) => (
                <li key={t.label} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2">
                    {t.label}
                    {t.locked && <I.lock className="size-3.5 text-muted" />}
                  </span>
                  <span className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${t.on ? "bg-blue" : "bg-surface-2"}`}>
                    <span className={`absolute top-1 size-4 rounded-full bg-white transition-[left] ${t.on ? "left-5" : "left-1"}`} />
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </AppFrame>
    </div>
  );
}
