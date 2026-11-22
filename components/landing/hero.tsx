"use client";

import { useLoop } from "@/lib/use-loop";
import { integrations, Logo } from "./brands";
import { I } from "./icons";
import { Mark } from "./mark";

/** Midnight to electric blue to cantaloupe, seen through fluted glass. */
function Backdrop() {
  return (
    <div aria-hidden className="grain absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(42%_60%_at_50%_72%,rgba(46,107,255,0.95),rgba(46,107,255,0.25)_55%,transparent_80%),radial-gradient(60%_38%_at_50%_100%,rgba(255,164,102,1),rgba(242,121,58,0.55)_45%,transparent_80%),linear-gradient(180deg,#05060d_0%,#060819_55%,#0a1030_100%)]" />
      {/* the flutes: soft vertical ribs that catch and bend the light */}
      <div
        className="absolute inset-0 opacity-90 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.04) 7px, rgba(0,0,0,0.38) 19px, rgba(255,255,255,0.12) 24px)",
          maskImage: "radial-gradient(70% 85% at 50% 80%, #000 30%, transparent 85%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg/70 to-transparent" />
    </div>
  );
}

/** The pin itself: a glass disc carrying the mark. */
function Pin() {
  return (
    <div className="relative grid size-[148px] place-items-center sm:size-[168px]">
      <div aria-hidden className="absolute -inset-10 rounded-full bg-blue/40 blur-3xl" />
      <div className="relative grid size-full place-items-center rounded-full bg-[radial-gradient(circle_at_32%_26%,rgba(255,255,255,0.55),rgba(255,255,255,0.08)_38%,rgba(10,16,40,0.6)_70%)] p-[3px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.25)]">
        <div className="grid size-full place-items-center rounded-full bg-[radial-gradient(circle_at_40%_30%,#2c3a6e,#0b1026_72%)] shadow-[inset_0_2px_10px_rgba(255,255,255,0.18),inset_0_-12px_24px_rgba(0,0,0,0.6)]">
          <Mark className="size-14 text-text drop-shadow-[0_0_14px_rgba(109,151,255,0.7)] sm:size-16" animate />
        </div>
      </div>
      <span aria-hidden className="absolute bottom-6 right-8 size-2 rounded-full bg-orange shadow-[0_0_10px_2px_rgba(255,164,102,0.8)]" />
    </div>
  );
}

/** Your apps stream in from both sides and pass behind the pin. */
function LogoStream() {
  const row = [...integrations, ...integrations];
  return (
    <div
      className="marquee-wrap absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden"
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)" }}
    >
      <ul className="marquee flex w-max gap-5">
        {row.map((b, i) => (
          <li key={i} className="grid size-14 place-items-center rounded-2xl border border-white/10 bg-bg/50 backdrop-blur-sm sm:size-16">
            <Logo file={b.file} className="size-7 sm:size-8" alt={i < integrations.length ? b.name : ""} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[22px] border border-white/12 bg-bg-2/85 p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
}

function Panels() {
  const { ref, step } = useLoop<HTMLDivElement>(12, 650);
  const leave = step >= 3;
  const q = "When is the budget doc due?";
  const typed = q.slice(0, Math.min(q.length, Math.round((step / 4) * q.length)));
  const answered = step >= 5;
  const saved = step >= 8;
  const bars = [8, 16, 10, 22, 14, 26, 12, 20, 9, 18, 24, 11, 15, 7, 19, 13];

  return (
    <div ref={ref} className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 px-5 sm:grid-cols-3 sm:px-8">
      <Panel className="hidden -rotate-[3deg] sm:block sm:translate-y-6">
        <div className="flex items-start gap-3">
          <span className={`grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${leave ? "bg-orange text-bg" : "bg-surface-2 text-muted"}`}>
            <I.walk className="size-5" />
          </span>
          <div>
            <p className="font-medium">{leave ? "Leave now" : "Budget review in 14 min"}</p>
            <p className="text-sm text-muted">Hudson 204, 12 min walk</p>
          </div>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full rounded-full bg-orange transition-[width] duration-700" style={{ width: `${Math.min(100, 20 + step * 9)}%` }} />
        </div>
      </Panel>

      <Panel>
        <div className="flex items-center gap-3 rounded-xl border border-blue/40 bg-surface px-3.5 py-2.5 text-sm">
          <I.ask className="size-4 text-blue-soft" />
          <span className="truncate">
            {typed}
            {!answered && <span className="caret ml-px inline-block h-[1em] w-px translate-y-[2px] bg-text" />}
          </span>
        </div>
        <p className={`mt-3 text-[0.95rem] leading-snug transition-opacity duration-500 ${answered ? "opacity-100" : "opacity-0"}`}>
          Friday. You told Priya you’d update it in today’s design review.
        </p>
        <p className={`mt-2 flex items-center gap-1.5 text-xs text-muted transition-opacity delay-200 duration-500 ${answered ? "opacity-100" : "opacity-0"}`}>
          <I.wave className="size-3.5 text-orange" />
          Heard by your pin, 1:12 PM
        </p>
      </Panel>

      <Panel className="hidden rotate-[3deg] sm:block sm:translate-y-6">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-green" />
            Listening
          </span>
          <span className="tabular-nums text-muted">1:{String(10 + step).padStart(2, "0")} PM</span>
        </div>
        <div className="mt-3 flex h-9 items-center justify-between">
          {bars.map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-blue-soft/80 transition-[height] duration-500"
              style={{ height: `${Math.max(4, ((h + step * 7 * (i % 3)) % 28) + 4)}px` }}
            />
          ))}
        </div>
        <p className={`mt-3 text-sm transition-colors duration-500 ${saved ? "text-text" : "text-muted"}`}>
          {saved ? "Follow-up added: update the budget doc by Friday" : "Design review, Studio 3"}
        </p>
      </Panel>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" data-stack className="relative flex h-svh min-h-[760px] flex-col overflow-hidden lg:sticky lg:top-0">
      <Backdrop />
      <div data-stack-content className="relative flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-[1100px] px-5 pt-32 text-center sm:px-8 sm:pt-36">
          <h1 className="display rise text-[clamp(2.15rem,8.4vw,6.2rem)]">
            <span className="block whitespace-nowrap">Everything you need.</span>
            <span className="block whitespace-nowrap">Finally in one place.</span>
          </h1>
          <p className="fluid-body rise mx-auto mt-6 max-w-[36rem] leading-relaxed text-text/75" style={{ animationDelay: "120ms" }}>
            pinpoint is a pin you wear and an app you check. It remembers where you need to be, what you said you’d do,
            and everything in between.
          </p>
        </div>

        <div className="rise relative mt-8 grid flex-1 place-items-center" style={{ animationDelay: "240ms" }}>
          <LogoStream />
          <Pin />
        </div>

        <div className="rise relative pb-0" style={{ animationDelay: "360ms" }}>
          <div className="translate-y-6">
            <Panels />
          </div>
        </div>
      </div>
    </section>
  );
}
