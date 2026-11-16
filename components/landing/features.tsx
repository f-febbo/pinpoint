"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { SourceGlyph, sourceLabel, type SourceKind } from "./source-glyph";

function FeatureText({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="display text-[clamp(2.6rem,5.6vw,5rem)] font-extrabold">{title}</h3>
      <div className="mt-5 max-w-md space-y-4 text-lg leading-relaxed text-ink-3">{children}</div>
    </div>
  );
}

/* ---------- 1. Find anything ---------- */

const finds: { q: string; kind: SourceKind; where: string; title: string; date: string }[] = [
  { q: "that pricing doc Marisol sent", kind: "mail", where: "Attachment in an email thread", title: "Halden_pricing_rev2.pdf", date: "Nov 3" },
  { q: "the invoice from the printer in March", kind: "finance", where: "Finance app, paid invoices", title: "Northwind Print, invoice #1874", date: "Mar 12" },
  { q: "what Ortiz asked about the deck", kind: "chat", where: "#launch channel, in a reply", title: "“Can I get the deck before the board call?”", date: "Nov 12" },
  { q: "notes from the offsite", kind: "notes", where: "Personal notes, untitled", title: "Untitled note, 14 bullet points", date: "Sep 26" },
];

function FindVisual() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const f = finds[i];
  return (
    <div className="rounded-[18px] border-[1.5px] border-ink bg-[#fcfbf7] p-5 shadow-[5px_5px_0_var(--color-ink)] sm:p-7">
      <p className="text-sm text-stone">Pick something half-remembered</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {finds.map((x, n) => (
          <button
            key={x.q}
            type="button"
            aria-pressed={i === n}
            onClick={() => setI(n)}
            className={`rounded-full border-[1.5px] px-3 py-1.5 text-sm transition-colors ${
              i === n ? "border-ink bg-pin font-semibold" : "border-ink/25 hover:border-ink"
            }`}
          >
            {x.q}
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-xl border-[1.5px] border-ink bg-white px-4 py-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">
        {f.q}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-3 flex items-start gap-3 rounded-xl bg-paper-2 p-4"
          aria-live="polite"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-lg border-[1.5px] border-ink bg-white">
            <SourceGlyph kind={f.kind} className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold">{f.title}</p>
            <p className="text-sm text-stone">
              {sourceLabel[f.kind]}: {f.where}. {f.date}.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------- 2. Stay ahead ---------- */

function AheadVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const on = inView || !!reduce;
  const days = ["Mon 17", "Tue 18", "Wed 19", "Thu 20", "Fri 21"];

  return (
    <div ref={ref} className="space-y-5">
      <div className="max-w-md rounded-2xl rounded-bl-md border-[1.5px] border-ink bg-[#fcfbf7] p-4">
        <p className="flex items-center gap-1.5 text-xs text-stone">
          <SourceGlyph kind="chat" className="size-3.5 text-ink" />
          Lena in #ops, reply 31 of 38
        </p>
        <p className="mt-1.5 leading-relaxed">
          Totally fine on the vendor side. One thing though, finance needs the signed PO{" "}
          <span className="relative whitespace-nowrap">
            <motion.span
              aria-hidden
              className="absolute inset-x-[-2px] inset-y-[1px] origin-left rounded-[3px] bg-pin"
              initial={false}
              animate={{ scaleX: on ? 1 : 0 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative font-semibold">by the 21st</span>
          </span>{" "}
          or it slips to next month. Anyway, did everyone see the new office plants?
        </p>
      </div>

      <div className="rounded-[18px] border-[1.5px] border-ink bg-[#fcfbf7] p-4 shadow-[5px_5px_0_var(--color-ink)] sm:p-5">
        <p className="mb-3 font-semibold">This week</p>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {days.map((d, n) => (
            <div key={d} className="min-h-[124px] rounded-lg border border-line bg-white/70 p-1.5 sm:p-2">
              <p className="text-[0.7rem] font-semibold text-stone sm:text-xs">{d}</p>
              {n === 1 && <p className="mt-1.5 rounded bg-paper-2 px-1 py-0.5 text-[0.65rem] sm:text-xs">Standup</p>}
              {n === 3 && <p className="mt-1.5 rounded bg-paper-2 px-1 py-0.5 text-[0.65rem] sm:text-xs">1:1 Dana</p>}
              {n === 4 && (
                <motion.div
                  initial={false}
                  animate={on ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -24, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: reduce ? 0 : 0.9 }}
                  className="mt-1.5 rounded-md border-[1.5px] border-ink bg-pin p-1 text-[0.65rem] font-semibold leading-tight shadow-[2px_2px_0_var(--color-ink)] sm:p-1.5 sm:text-xs"
                >
                  Signed PO due
                  <span className="mt-0.5 block font-normal">from #ops</span>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 3. Keep your context ---------- */

const trail: { date: string; kind: SourceKind; title: string; body: string }[] = [
  { date: "Sep 3", kind: "mail", title: "The question", body: "Alex asks whether offline mode is in scope for the first release. Nobody answers for a week." },
  { date: "Sep 10", kind: "calendar", title: "The discussion", body: "Scope review. Twenty minutes on offline mode. Concern: it doubles QA time." },
  { date: "Sep 12", kind: "doc", title: "The proposal", body: "Scope v2 moves offline mode to the second release, with a note on why." },
  { date: "Sep 18", kind: "chat", title: "The decision", body: "Priya in #product: “Agreed, offline ships in R2.” Three thumbs up. Done." },
];

function ContextVisual() {
  const [i, setI] = useState(3);
  const reduce = useReducedMotion();
  return (
    <div className="rounded-[18px] border-[1.5px] border-ink bg-[#fcfbf7] p-5 shadow-[5px_5px_0_var(--color-ink)] sm:p-7">
      <p className="text-sm text-stone">Why did offline mode move to the second release?</p>
      <div className="relative mt-6">
        <div aria-hidden className="absolute left-0 right-0 top-[18px] h-[1.5px] bg-ink" />
        <ol className="relative grid grid-cols-4">
          {trail.map((t, n) => (
            <li key={t.date} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setI(n)}
                aria-pressed={i === n}
                aria-label={`${t.date}: ${t.title}`}
                className={`grid size-9 place-items-center rounded-full border-[1.5px] border-ink transition-[background-color,transform] hover:scale-110 ${
                  i === n ? "bg-pin" : "bg-white"
                }`}
              >
                <SourceGlyph kind={t.kind} className="size-4" />
              </button>
              <span className={`mt-2 text-xs sm:text-sm ${i === n ? "font-semibold" : "text-stone"}`}>{t.date}</span>
            </li>
          ))}
        </ol>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-6 min-h-[104px] border-t border-line pt-4"
          aria-live="polite"
        >
          <p className="flex items-center gap-2 text-sm text-stone">
            <SourceGlyph kind={trail[i].kind} className="size-4 text-ink" />
            {sourceLabel[trail[i].kind]}, {trail[i].date}
          </p>
          <p className="mt-1 font-display text-xl font-bold">{trail[i].title}</p>
          <p className="mt-1 text-ink-3">{trail[i].body}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------- 4. Intelligence that stays yours ---------- */

const modes = [
  { id: "device", label: "On this device", desc: "A model runs on your own computer. Your information never leaves it to be processed." },
  { id: "company", label: "On company servers", desc: "Your organization hosts the model inside its own environment, under its own rules." },
  { id: "external", label: "External provider", desc: "Off unless your organization's policy explicitly allows it, and only for what it allows." },
] as const;

function OwnVisual() {
  const [m, setM] = useState<(typeof modes)[number]["id"]>("device");
  const reduce = useReducedMotion();
  const idx = modes.findIndex((x) => x.id === m);
  // where the "processing" marker sits in the diagram (% from left)
  const markerX = [17, 50, 84][idx];

  return (
    <div className="rounded-[18px] border-[1.5px] border-ink bg-[#fcfbf7] p-5 shadow-[5px_5px_0_var(--color-ink)] sm:p-7">
      <fieldset>
        <legend className="text-sm text-stone">Where should AI processing happen?</legend>
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl border-[1.5px] border-ink bg-paper-2 p-1">
          {modes.map((x) => (
            <label
              key={x.id}
              className={`relative cursor-pointer rounded-lg px-2 py-2 text-center text-xs font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink sm:text-sm ${
                m === x.id ? "text-ink" : "text-stone hover:text-ink"
              }`}
            >
              <input type="radio" name="proc" value={x.id} checked={m === x.id} onChange={() => setM(x.id)} className="sr-only" />
              {m === x.id && (
                <motion.span
                  layoutId="proc-pill"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                  className={`absolute inset-0 rounded-lg border-[1.5px] border-ink ${x.id === "external" ? "bg-white" : "bg-pin"}`}
                />
              )}
              <span className="relative">{x.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="relative mt-6 h-[150px]" aria-hidden>
        {/* environment boundary covers device + company */}
        <div className="absolute inset-y-0 left-0 w-[67%] rounded-xl border-[1.5px] border-dashed border-ink" />
        <span className="absolute -top-2.5 left-3 bg-[#fcfbf7] px-1.5 text-xs font-semibold">Your environment</span>
        <div className="absolute inset-y-6 right-0 w-[30%] rounded-xl border-[1.5px] border-line bg-paper-2" />
        {[
          { x: 17, t: "Laptop" },
          { x: 50, t: "Company server" },
          { x: 84, t: "Third party" },
        ].map((n) => (
          <span key={n.t} className="absolute bottom-3 -translate-x-1/2 whitespace-nowrap text-xs text-stone" style={{ left: `${n.x}%` }}>
            {n.t}
          </span>
        ))}
        <motion.div
          className={`absolute top-[46px] grid size-12 -translate-x-1/2 place-items-center rounded-full border-[1.5px] border-ink ${
            m === "external" ? "border-dashed bg-white" : "bg-pin shadow-[3px_3px_0_var(--color-ink)]"
          }`}
          initial={false}
          animate={{ left: `${markerX}%` }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 22 }}
        >
          <span className={`size-3 rounded-full ${m === "external" ? "border-[1.5px] border-ink" : "bg-ink"}`} />
        </motion.div>
      </div>
      <p className="mt-4 min-h-[3em] text-ink-3" aria-live="polite">
        {modes[idx].desc}
      </p>
    </div>
  );
}

/* ---------- section ---------- */

export function Features() {
  return (
    <section id="how-it-works" aria-label="How pinpoint works" className="border-t border-line">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <FeatureText title="Find anything.">
              <p>
                Search everything you&rsquo;ve connected at once. You don&rsquo;t need to remember which app it was in,
                who sent it, or the exact words. Describe it the way you&rsquo;d describe it to a colleague.
              </p>
            </FeatureText>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <FindVisual />
          </div>
        </div>

        <div className="grid gap-10 border-t border-line py-20 sm:py-28 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <AheadVisual />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <FeatureText title="Stay ahead.">
              <p>
                Deadlines hide in reply 31 of a long thread. Promises get made in passing. pinpoint brings dates,
                requests and the things you said you&rsquo;d do up to the surface, before they become late.
              </p>
            </FeatureText>
          </div>
        </div>

        <div className="grid gap-10 border-t border-line py-20 sm:py-28 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <FeatureText title="Keep your context.">
              <p>
                Decisions rarely happen in one place. They start in an email, get argued in a meeting and end in a
                chat. pinpoint keeps the trail together, so you can see how you got here.
              </p>
            </FeatureText>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ContextVisual />
          </div>
        </div>

        <div className="grid gap-10 border-t border-line py-20 sm:py-28 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <OwnVisual />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <FeatureText title="Intelligence that stays yours.">
              <p>
                pinpoint is being designed to run its AI where your information already lives: on your device, or on
                infrastructure your organization controls.
              </p>
              <p>
                <a href="#privacy" className="font-semibold text-ink underline decoration-pin decoration-[3px] underline-offset-4 hover:decoration-ink">
                  How localized inference works
                </a>
              </p>
            </FeatureText>
          </div>
        </div>
      </div>
    </section>
  );
}
