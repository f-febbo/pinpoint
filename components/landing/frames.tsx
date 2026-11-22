import type { ReactNode } from "react";
import { BrandIcon, type Brand } from "./brands";
import { Acr } from "./text";

/**
 * A full-screen frame. On large screens each frame sticks to the top and the
 * next one slides up over it, so only one example is ever on screen.
 */
export function Frame({
  id,
  n,
  title,
  body,
  points,
  tone = "light",
  children,
}: {
  id: string;
  n: string;
  title: string;
  body: ReactNode;
  points: ReactNode[];
  tone?: "light" | "mist" | "dark";
  children: ReactNode;
}) {
  const bg = { light: "bg-paper text-ink", mist: "bg-mist text-ink", dark: "bg-ink text-paper on-dark" }[tone];
  const sub = tone === "dark" ? "text-sage-light" : "text-moss";
  const rule = tone === "dark" ? "border-line-dark" : "border-line";
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative flex min-h-svh items-center overflow-hidden rounded-t-[32px] shadow-[0_-24px_60px_rgba(15,23,20,0.08)] lg:sticky lg:top-0 lg:h-svh ${bg}`}
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-0">
        <div className="lg:col-span-5">
          <p className="label text-copper">{n} / 03</p>
          <h2 id={`${id}-title`} className="headline trim mt-8 text-[clamp(2.8rem,5.6vw,5.2rem)]">
            {title}
            <span className="pt">.</span>
          </h2>
          <p className={`fluid-body mt-8 max-w-[26rem] leading-relaxed ${sub}`}>{body}</p>
          <ul className={`mt-10 max-w-[26rem] border-t ${rule}`}>
            {points.map((p, i) => (
              <li key={i} className={`border-b py-3.5 ${rule}`}>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">{children}</div>
      </div>
    </section>
  );
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[24px] border border-line bg-card p-5 shadow-[0_30px_80px_-40px_rgba(15,23,20,0.35)] sm:p-8 ${className}`}>{children}</div>;
}

function Src({ brand, className = "size-4" }: { brand: Brand; className?: string }) {
  return <BrandIcon brand={brand} className={`${className} shrink-0 text-moss`} />;
}

/* ---------- 01: where to be ---------- */

function Today() {
  const rows: {
    time: string;
    title: string;
    place?: string;
    brand: Brand;
    state: "done" | "now" | "next" | "clash";
    note?: string;
  }[] = [
    { time: "9:30", title: "Team standup", brand: "teams", state: "done" },
    { time: "1:00", title: "Design review", place: "Studio 3", brand: "outlook", state: "now", note: "Now, ends in 25 min" },
    { time: "2:30", title: "Budget review", place: "Hudson 204", brand: "googleCalendar", state: "next", note: "Leave by 2:18, a 12 min walk" },
    { time: "3:15", title: "1:1 with Dana", place: "Teams call", brand: "teams", state: "clash", note: "Overlaps your dentist appointment" },
  ];
  return (
    <Panel>
      <div className="flex items-center justify-between border-b border-line pb-5">
        <div>
          <p className="text-xl">Today</p>
          <p className="text-sm text-moss">Monday, November 16</p>
        </div>
        <div className="flex items-center gap-2" aria-label="From Outlook, Google Calendar and Teams">
          <Src brand="outlook" />
          <Src brand="googleCalendar" />
          <Src brand="teams" />
        </div>
      </div>
      <ol className="relative mt-6 space-y-6 pl-7">
        <span aria-hidden className="absolute bottom-3 left-[6px] top-3 w-px bg-sage" />
        {rows.map((r) => (
          <li key={r.time} className={`relative ${r.state === "done" ? "opacity-45" : ""}`}>
            <span
              aria-hidden
              className={`absolute -left-7 top-[0.4rem] size-[13px] rounded-full border ${
                r.state === "now" ? "border-copper bg-copper" : "border-sage bg-card"
              }`}
            />
            {r.state === "now" && <span aria-hidden className="ping absolute -left-7 top-[0.4rem] size-[13px] rounded-full bg-copper" />}
            <div className="flex gap-4">
              <span className="w-12 shrink-0 pt-px tabular-nums text-moss">{r.time}</span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2.5 text-lg">
                  <Src brand={r.brand} />
                  <span className="line-clamp-1">
                    {r.title}
                    {r.place && <span className="text-moss">, {r.place}</span>}
                  </span>
                </p>
                {r.note && (
                  <p
                    className={`mt-1.5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${
                      r.state === "now"
                        ? "text-copper"
                        : r.state === "next"
                          ? "bg-ink text-paper"
                          : "bg-[color-mix(in_srgb,var(--color-copper)_14%,transparent)] text-ink"
                    } ${r.state === "now" ? "px-0" : ""}`}
                  >
                    {r.state === "clash" && <span className="size-1.5 rounded-full bg-copper" />}
                    {r.note}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

/* ---------- 02: find anything ---------- */

function Find() {
  return (
    <Panel>
      <div className="flex items-center gap-3 rounded-full border border-line bg-paper px-5 py-3.5">
        <svg viewBox="0 0 20 20" className="size-4 shrink-0 text-moss" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M13 13l4 4" strokeLinecap="round" />
        </svg>
        <span className="text-lg">where did we land on the q1 budget?</span>
      </div>

      <div className="mt-6 rounded-2xl bg-mist p-5">
        <p className="text-lg leading-snug">
          Keep headcount flat and move $40k from events to tooling. Priya and Sam agreed on Oct 14, and you updated the
          budget doc the next day.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {[
            { b: "slack" as const, t: "#finance, Oct 14" },
            { b: "googleDrive" as const, t: "Q1 budget, draft 3" },
          ].map((c) => (
            <span key={c.t} className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5">
              <Src brand={c.b} className="size-3.5" />
              {c.t}
            </span>
          ))}
        </div>
      </div>

      <ul className="mt-4 divide-y divide-line">
        {[
          { b: "gmail" as const, t: "Re: Q1 numbers", m: "Oct 13" },
          { b: "googleCalendar" as const, t: "Q1 planning sync", m: "Oct 16" },
          { b: "notion" as const, t: "Planning notes, Q1", m: "Oct 9" },
        ].map((r) => (
          <li key={r.t} className="flex items-center gap-3 py-3">
            <Src brand={r.b} />
            <span className="line-clamp-1 flex-1">{r.t}</span>
            <span className="tabular-nums text-moss">{r.m}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ---------- 03: private by design ---------- */

function Device() {
  return (
    <figure>
      <div className="relative rounded-[24px] border border-sage/50 p-5 pt-10 sm:p-8 sm:pt-12">
        <span className="label absolute -top-2.5 left-6 bg-ink px-2 text-sage">Your device</span>
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center sm:gap-3">
          {["Your apps", "On‑device model", "You"].map((t, i) => (
            <div key={t} className="contents">
              <div
                className={`rounded-2xl px-2 py-6 text-sm sm:px-3 sm:text-lg ${
                  i === 1 ? "bg-paper text-ink" : "border border-line-dark bg-ink-2"
                }`}
              >
                {t}
              </div>
              {i < 2 && <span aria-hidden className="h-px w-4 bg-sage sm:w-8" />}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-line-dark px-5 py-4 text-sage">
        <svg viewBox="0 0 20 20" className="size-4 shrink-0" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="10" cy="10" r="7" />
          <path d="M5 15L15 5" />
        </svg>
        <span>
          Third-party <Acr>AI</Acr> is off by default. An organization can allow it on purpose.
        </span>
      </div>
      <figcaption className="sr-only">Your apps, the model and you all stay on your device. Third-party AI is off by default.</figcaption>
    </figure>
  );
}

export function Frames() {
  return (
    <>
      <Frame
        id="where"
        n="01"
        title="always know where to be"
        body="Work and personal calendars on one timeline, so the day stops surprising you."
        points={["When to leave, with travel time", "A heads-up when two plans collide", "The room or call link, right there"]}
      >
        <Today />
      </Frame>
      <Frame
        id="find"
        n="02"
        tone="mist"
        title="find anything"
        body="Ask the way you’d ask a colleague. pinpoint answers from every app at once, and shows where it found it."
        points={["Mail, chat, docs and calendars", "Answers with their sources", "No need to remember which app"]}
      >
        <Find />
      </Frame>
      <Frame
        id="privacy"
        n="03"
        tone="dark"
        title="private by design"
        body={
          <>
            pinpoint runs its <Acr>AI</Acr> on your device or your company’s own servers. Your information isn’t sent to
            someone else’s model to be useful.
          </>
        }
        points={["Only sees what you can already see", "Runs where your data lives", "Outside models only by choice"]}
      >
        <Device />
      </Frame>
    </>
  );
}
