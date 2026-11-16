"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { SourceGlyph, sourceLabel, type SourceKind } from "./source-glyph";

/* ---------- shared bits ---------- */

function Mark({ children }: { children: ReactNode }) {
  return <mark className="rounded-[3px] bg-pin-soft px-0.5 text-ink">{children}</mark>;
}

function Source({ kind, where }: { kind: SourceKind; where?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-stone">
      <SourceGlyph kind={kind} className="size-3.5 text-ink" />
      <span className="font-medium text-ink-3">{sourceLabel[kind]}</span>
      {where && <span>{where}</span>}
    </span>
  );
}

function PanelTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
      <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{children}</h3>
      {aside && <div className="text-sm text-stone">{aside}</div>}
    </div>
  );
}

/* ---------- Search ---------- */

const QUERY = "Find the conversation where we discussed next quarter's budget.";

export function SearchPanel() {
  const reduce = useReducedMotion();
  const [typedRaw, setTyped] = useState(0);
  const typed = reduce ? QUERY.length : typedRaw;

  useEffect(() => {
    if (reduce) return;
    let n = 0;
    const id = setInterval(() => {
      n += 2;
      setTyped(Math.min(n, QUERY.length));
      if (n >= QUERY.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [reduce]);

  const ready = typed >= QUERY.length;

  return (
    <div>
      <div className="flex items-center gap-3 rounded-xl border-[1.5px] border-ink bg-white px-4 py-3">
        <svg viewBox="0 0 20 20" className="size-4 shrink-0" aria-hidden>
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M13 13l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="min-h-[1.5em] text-[0.95rem]">
          {QUERY.slice(0, typed)}
          {!ready && <span className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-ink" />}
        </p>
      </div>

      <AnimatePresence>
        {ready && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4"
          >
            <p className="mb-3 text-sm text-stone">Best match, plus 3 related items from 3 other sources</p>
            <article className="rounded-xl border-[1.5px] border-ink bg-white p-4 shadow-[3px_3px_0_var(--color-ink)] sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Source kind="chat" where="#finance-planning" />
                <time className="text-xs text-stone" dateTime="2026-10-14T16:12">
                  Tue, Oct 14, 4:12 PM
                </time>
              </div>
              <h4 className="mt-2 font-semibold">Thread with Priya Raman and Sam Okafor</h4>
              <dl className="mt-3 space-y-2 text-sm leading-relaxed">
                <div className="flex gap-2">
                  <dt className="w-12 shrink-0 font-semibold">Priya</dt>
                  <dd>
                    For <Mark>Q1</Mark> I&rsquo;d keep headcount flat and move the $40k from events into tooling.
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-12 shrink-0 font-semibold">Sam</dt>
                  <dd>Agree. Let&rsquo;s lock it before the planning sync on Thursday.</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-12 shrink-0 font-semibold">You</dt>
                  <dd>
                    Works for me. I&rsquo;ll update the <Mark>budget</Mark> doc tonight.
                  </dd>
                </div>
              </dl>
              <p className="mt-4 border-t border-line pt-3 text-xs text-stone">
                Why this matched: it discusses next quarter&rsquo;s spending and comes two days before the Q1 planning
                sync.
              </p>
            </article>

            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                { kind: "calendar" as const, title: "Q1 planning sync", meta: "Thu, Oct 16" },
                { kind: "doc" as const, title: "Q1 Budget, draft 3", meta: "Edited Oct 15 by you" },
                { kind: "mail" as const, title: "Re: Q1 numbers", meta: "Priya, Oct 13" },
              ].map((r) => (
                <li key={r.title} className="rounded-lg border border-line bg-white/70 p-3">
                  <Source kind={r.kind} />
                  <p className="mt-1 text-sm font-semibold">{r.title}</p>
                  <p className="text-xs text-stone">{r.meta}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Today ---------- */

export function TodayPanel() {
  const schedule = [
    { time: "9:30", title: "Team standup", note: "15 min" },
    { time: "11:00", title: "Design review: onboarding", note: "Figma file updated last night" },
    {
      time: "2:30",
      title: "Budget review",
      note: "Moved from 1:00. Bring: Q1 Budget, draft 3 and Priya's thread from Oct 14.",
      hot: true,
    },
  ];
  return (
    <div>
      <PanelTitle aside="Monday, November 16">Good morning.</PanelTitle>
      <p className="-mt-2 mb-5 max-w-xl text-[0.95rem] text-ink-3">
        3 meetings, 2 replies you owe, and 1 deadline this week. The budget review moved, so your afternoon is tighter
        than it looked yesterday.
      </p>
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <ol className="relative space-y-3 border-l-[1.5px] border-ink pl-5">
          {schedule.map((s) => (
            <li key={s.time} className="relative">
              <span
                className={`absolute -left-[27px] top-1.5 size-3 rounded-full border-[1.5px] border-ink ${s.hot ? "bg-pin" : "bg-paper"}`}
              />
              <p className="text-xs font-semibold text-stone">{s.time}</p>
              <p className="font-semibold">{s.title}</p>
              <p className="text-sm text-stone">{s.note}</p>
            </li>
          ))}
        </ol>
        <div className="rounded-xl border-[1.5px] border-ink bg-white p-4">
          <p className="font-semibold">Worth a look before noon</p>
          <ul className="mt-3 space-y-3 text-sm">
            <li>
              <Source kind="mail" />
              <p>Dana is waiting on the vendor renewal. She asked for Friday.</p>
            </li>
            <li>
              <Source kind="finance" />
              <p>Invoice #2291 to Northwind Print is 9 days overdue.</p>
            </li>
            <li>
              <Source kind="chat" />
              <p>Ortiz still hasn&rsquo;t received the launch deck.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Follow-ups ---------- */

type Follow = { id: string; kind: SourceKind; text: string; age: string; mine: boolean };
const follows: Follow[] = [
  { id: "f1", kind: "mail", text: "Confirm the Q3 vendor renewal with Dana", age: "Asked 2 days ago", mine: true },
  { id: "f2", kind: "chat", text: "Send Ortiz the launch deck", age: "Asked 4 days ago", mine: true },
  { id: "f3", kind: "mail", text: "Get back to Alex on the contract timeline", age: "You promised 6 days ago", mine: true },
  { id: "f4", kind: "doc", text: "Legal to return contract redlines", age: "Requested Nov 10", mine: false },
  { id: "f5", kind: "calendar", text: "Marisol to share revised pricing", age: "From the Oct 30 call", mine: false },
];

export function FollowupsPanel() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const open = follows.filter((f) => f.mine && !done[f.id]).length;

  const group = (mine: boolean) => (
    <ul className="space-y-2">
      {follows
        .filter((f) => f.mine === mine)
        .map((f) => {
          const checked = !!done[f.id];
          return (
            <li key={f.id}>
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border-[1.5px] p-3 transition-colors ${
                  checked ? "border-line bg-transparent" : "border-ink bg-white hover:bg-pin-soft/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setDone((d) => ({ ...d, [f.id]: !d[f.id] }))}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-[1.5px] border-ink transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 ${
                    checked ? "bg-ink" : "bg-paper"
                  }`}
                >
                  {checked && (
                    <svg viewBox="0 0 12 12" className="size-3">
                      <path d="M2.5 6.5l2.2 2L9.5 3.5" stroke="var(--color-pin)" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block font-medium ${checked ? "text-stone line-through" : ""}`}>{f.text}</span>
                  <span className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-stone">
                    <Source kind={f.kind} />
                    <span>{f.age}</span>
                  </span>
                </span>
              </label>
            </li>
          );
        })}
    </ul>
  );

  return (
    <div>
      <PanelTitle aside={<span aria-live="polite">{open === 0 ? "All clear on your side" : `${open} open on your side`}</span>}>
        Follow-ups
      </PanelTitle>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold">Waiting on you</p>
          {group(true)}
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Waiting on others</p>
          {group(false)}
        </div>
      </div>
    </div>
  );
}

/* ---------- History ---------- */

const history: { day: string; kind: SourceKind; text: string; time: string }[] = [
  { day: "Today", kind: "calendar", text: "Budget review moved to 2:30", time: "8:02 AM" },
  { day: "Today", kind: "mail", text: "Dana replied: Re: Q3 vendor renewal", time: "7:41 AM" },
  { day: "Yesterday", kind: "doc", text: "You edited Q1 Budget, draft 3", time: "9:15 PM" },
  { day: "Yesterday", kind: "chat", text: "Ortiz asked about the launch deck in #launch", time: "3:20 PM" },
  { day: "Yesterday", kind: "finance", text: "Invoice #2291 passed its due date", time: "12:00 AM" },
  { day: "Oct 30", kind: "calendar", text: "Call with Marisol: pricing for the Halden account", time: "10:00 AM" },
  { day: "Oct 30", kind: "notes", text: "Notes saved: Halden pricing call", time: "10:48 AM" },
  { day: "Oct 14", kind: "chat", text: "Priya, Sam and you discussed the Q1 budget", time: "4:12 PM" },
];

export function HistoryPanel() {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<SourceKind | "all">("all");
  const rows = useMemo(
    () =>
      history.filter(
        (h) => (kind === "all" || h.kind === kind) && h.text.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [q, kind],
  );
  const days = [...new Set(rows.map((r) => r.day))];
  const kinds: (SourceKind | "all")[] = ["all", "mail", "calendar", "doc", "chat", "finance", "notes"];

  return (
    <div>
      <PanelTitle>Activity history</PanelTitle>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-xl border-[1.5px] border-ink bg-white px-3 py-2 focus-within:shadow-[0_0_0_2px_var(--color-ink)]">
          <span className="sr-only">Filter history</span>
          <svg viewBox="0 0 20 20" className="size-4 shrink-0" aria-hidden>
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M13 13l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try “pricing” or “budget”"
            className="w-full bg-transparent text-sm outline-none placeholder:text-stone focus-visible:outline-none"
          />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Filter by source">
        {kinds.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
            className={`rounded-full border-[1.5px] px-3 py-1 text-xs font-medium transition-colors ${
              kind === k ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
            }`}
          >
            {k === "all" ? "Everything" : sourceLabel[k]}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-4" aria-live="polite">
        {days.length === 0 && (
          <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-stone">
            Nothing in the sample history matches that. Try “pricing”.
          </p>
        )}
        {days.map((d) => (
          <div key={d}>
            <p className="mb-1 text-xs font-semibold text-stone">{d}</p>
            <ul className="divide-y divide-line rounded-xl border border-line bg-white/70">
              {rows
                .filter((r) => r.day === d)
                .map((r) => (
                  <li key={r.text} className="flex items-center gap-3 px-3 py-2.5 text-sm">
                    <SourceGlyph kind={r.kind} className="size-4 shrink-0" />
                    <span className="flex-1">{r.text}</span>
                    <span className="shrink-0 text-xs text-stone">{r.time}</span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Ask ---------- */

const qa = [
  {
    q: "What did we decide about Halden pricing?",
    a: (
      <>
        On the Oct 30 call, you and Marisol agreed to hold the current rate for Halden through March, in exchange for
        a two-year renewal <Cite n={1} />. Marisol said she&rsquo;d send revised pricing, and that hasn&rsquo;t arrived
        yet <Cite n={2} />.
      </>
    ),
    sources: [
      { kind: "notes" as const, title: "Notes: Halden pricing call", meta: "Oct 30" },
      { kind: "calendar" as const, title: "Call with Marisol", meta: "Oct 30, 10:00 AM" },
    ],
  },
  {
    q: "What am I behind on this week?",
    a: (
      <>
        Three things are waiting on you. Dana needs the vendor renewal confirmed by Friday <Cite n={1} />, Ortiz is
        still waiting on the launch deck <Cite n={2} />, and you told Alex you&rsquo;d follow up on the contract
        timeline six days ago <Cite n={3} />.
      </>
    ),
    sources: [
      { kind: "mail" as const, title: "Re: Q3 vendor renewal", meta: "Dana, Nov 14" },
      { kind: "chat" as const, title: "#launch", meta: "Ortiz, Nov 12" },
      { kind: "mail" as const, title: "Re: Contract timeline", meta: "You, Nov 10" },
    ],
  },
  {
    q: "Summarize the Q1 budget discussion.",
    a: (
      <>
        Headcount stays flat in Q1, and $40k moves from events into tooling <Cite n={1} />. The team agreed to lock it
        before the Oct 16 planning sync <Cite n={2} />, and you updated the budget doc the night before{" "}
        <Cite n={3} />.
      </>
    ),
    sources: [
      { kind: "chat" as const, title: "#finance-planning", meta: "Oct 14" },
      { kind: "calendar" as const, title: "Q1 planning sync", meta: "Oct 16" },
      { kind: "doc" as const, title: "Q1 Budget, draft 3", meta: "Oct 15" },
    ],
  },
];

function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 inline-grid size-[1.15rem] -translate-y-0.5 place-items-center rounded-full border border-ink bg-pin text-[0.62rem] font-bold not-italic">
      {n}
    </sup>
  );
}

export function AskPanel() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [thinking, setThinking] = useState(false);

  const pick = (n: number) => {
    setI(n);
    if (reduce) return;
    setThinking(true);
    setTimeout(() => setThinking(false), 700);
  };

  const cur = qa[i];
  return (
    <div>
      <PanelTitle>Ask pinpoint</PanelTitle>
      <div className="flex flex-wrap gap-2">
        {qa.map((x, n) => (
          <button
            key={x.q}
            type="button"
            aria-pressed={i === n}
            onClick={() => pick(n)}
            className={`rounded-full border-[1.5px] px-3 py-1.5 text-left text-sm transition-colors ${
              i === n ? "border-ink bg-ink text-paper" : "border-ink/30 hover:border-ink"
            }`}
          >
            {x.q}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3" aria-live="polite">
        <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-sm text-paper">
          {cur.q}
        </div>
        <AnimatePresence mode="wait">
          {thinking ? (
            <motion.p
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-stone"
            >
              Reading {cur.sources.length} sources…
            </motion.p>
          ) : (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-[92%] rounded-2xl rounded-bl-md border-[1.5px] border-ink bg-white px-4 py-3"
            >
              <p className="text-[0.95rem] leading-relaxed">{cur.a}</p>
              <ol className="mt-3 space-y-1 border-t border-line pt-3">
                {cur.sources.map((s, n) => (
                  <li key={s.title} className="flex items-center gap-2 text-xs">
                    <span className="grid size-4 place-items-center rounded-full border border-ink bg-pin text-[0.6rem] font-bold">
                      {n + 1}
                    </span>
                    <SourceGlyph kind={s.kind} className="size-3.5" />
                    <span className="font-medium">{s.title}</span>
                    <span className="text-stone">{s.meta}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
