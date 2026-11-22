"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLoop } from "@/lib/use-loop";
import { Logo, type BrandFile } from "@/components/landing/brands";
import { Shell } from "./shell";
import { Avatar, Card, Icon, ease, easeInOut } from "./ui";

const START = 10;
const END = 17;
const pct = (h: number) => ((h - START) / (END - START)) * 100;

type Ev = { title: string; from: number; to: number; tone: string; clash?: boolean };
const lanes: { name: string; file?: BrandFile; events: Ev[] }[] = [
  {
    name: "Outlook",
    file: "microsoft-outlook",
    events: [
      { title: "Vendor Call", from: 10.5, to: 11.5, tone: "sky" },
      { title: "Design Review", from: 13, to: 14, tone: "sky" },
    ],
  },
  {
    name: "Google",
    file: "google-calendar",
    events: [
      { title: "Lunch with Sam", from: 12, to: 13, tone: "mint" },
      { title: "Budget Review", from: 14.5, to: 15.5, tone: "mint" },
    ],
  },
  {
    name: "Teams",
    file: "microsoft-teams",
    events: [
      { title: "Standup", from: 10, to: 10.5, tone: "lilac" },
      { title: "1:1 with Dana", from: 15.5, to: 16.5, tone: "lilac", clash: true },
    ],
  },
  { name: "Personal", events: [{ title: "Dentist", from: 15.75, to: 16.75, tone: "peach", clash: true }] },
];

const toneCls: Record<string, string> = {
  sky: "bg-g-sky/16 text-g-sky before:bg-g-sky",
  mint: "bg-g-mint/16 text-g-mint before:bg-g-mint",
  lilac: "bg-g-lilac/16 text-g-lilac before:bg-g-lilac",
  peach: "bg-g-peach/16 text-g-peach before:bg-g-peach",
};

function Stat({ label, value, sub, children }: { label: string; value: React.ReactNode; sub: React.ReactNode; children?: React.ReactNode }) {
  return (
    <Card className="flex flex-col justify-between !py-4">
      <div className="flex items-start justify-between">
        <p className="text-[13px] text-g-muted">{label}</p>
        {children}
      </div>
      <div className="mt-3">
        <p className="text-[28px] font-medium tabular-nums leading-none tracking-[-0.03em]">{value}</p>
        <p className="mt-2 text-[12px] text-g-muted">{sub}</p>
      </div>
    </Card>
  );
}

const ROUTE = "M30 190 C 70 190, 80 150, 120 140 S 190 150, 210 110 S 250 50, 300 40";

export function TodayView({ group = "today" }: { group?: string }) {
  const { ref, step } = useLoop<HTMLDivElement>(12, 1000);
  const mins = Math.min(78, 50 + step * 4); // 1:50 PM → 2:18 PM
  const now = 13 + mins / 60;
  const clock = `${mins >= 60 ? 2 : 1}:${String(mins % 60).padStart(2, "0")} PM`;
  const toGo = Math.max(0, Math.round((14.5 - now) * 60));
  const leave = mins >= 78;
  const done = Math.min(3, Math.max(0, step - 2) >> 1);
  const heard = Math.min(3, 1 + (step >> 2));

  const tasks: { t: string; file: BrandFile; due: string }[] = [
    { t: "Send Ortiz the launch deck", file: "slack-icon", due: "Promised Tue" },
    { t: "Reply to Dana on the renewal", file: "google-gmail", due: "Due today" },
    { t: "Book a room for Thursday", file: "microsoft-outlook", due: "Due today" },
    { t: "Update the Q1 budget doc", file: "google-drive", due: "Due Fri" },
  ];
  const captures = [
    { time: "1:12 PM", who: "Priya Raman", text: "Let’s keep headcount flat and move the $40k to tooling.", tag: "Decision", tone: "text-g-lilac bg-g-lilac/14" },
    { time: "1:31 PM", who: "Sam Okafor", text: "Can you send the deck before the board call?", tag: "Follow-Up", tone: "text-g-peach bg-g-peach/14" },
    { time: "1:46 PM", who: "Dana Cole", text: "Thursday at 10 works for the renewal walkthrough.", tag: "Date", tone: "text-g-sky bg-g-sky/14" },
  ];

  return (
    <div ref={ref}>
      <Shell view="today" group={group} title="Good Afternoon, Jordan" meta={<>Monday, November 16 · {clock}</>}>
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
          <div className="grid grid-cols-4 gap-4">
            <Stat label="Next Up" value={leave ? "Leave Now" : `${toGo} min`} sub="Budget Review, Hudson 204">
              <span className={`grid size-8 place-items-center rounded-full transition-colors duration-300 ${leave ? "bg-g-peach text-g-bg" : "bg-white/[0.06] text-g-muted"}`}>
                <Icon.walk />
              </span>
            </Stat>
            <Stat label="Meetings Today" value="6" sub="3h 45m booked across 3 calendars">
              <div className="flex h-8 items-end gap-[3px]">
                {[3, 5, 2, 6, 4, 7, 3].map((h, i) => (
                  <span key={i} className={`w-1.5 rounded-full ${i === 4 ? "bg-g-sky" : "bg-white/15"}`} style={{ height: h * 4 }} />
                ))}
              </div>
            </Stat>
            <Stat label="Follow-Ups" value={<>{4 - done}<span className="text-g-dim"> / 4</span></>} sub="Pulled from today’s conversations">
              <div className="flex -space-x-1.5">
                {["Priya Raman", "Sam Okafor", "Dana Cole"].map((n) => (
                  <span key={n} className="rounded-full ring-2 ring-g-card">
                    <Avatar name={n} size="size-7" />
                  </span>
                ))}
              </div>
            </Stat>
            <Stat label="Heard Today" value="3h 12m" sub="4 conversations saved">
              <div className="flex h-8 items-center gap-[2px]">
                {[4, 9, 6, 12, 8, 14, 5, 10, 7, 11].map((h, i) => (
                  <span key={i} className="w-[3px] rounded-full bg-g-peach/70" style={{ height: h * 2 }} />
                ))}
              </div>
            </Stat>
          </div>

          <div className="grid min-h-0 grid-cols-[2.3fr_1fr] gap-4">
            <Card title="Schedule" aside={<span className="text-[12px] text-g-muted">10 AM to 5 PM</span>}>
              <div className="relative">
                {/* hour grid */}
                <div className="ml-[36px] flex justify-between pb-2 text-[11px] tabular-nums text-g-dim">
                  {["10", "11", "12", "1", "2", "3", "4", "5"].map((h) => (
                    <span key={h} className="w-0 whitespace-nowrap text-center">{h}</span>
                  ))}
                </div>
                <div className="space-y-2">
                  {lanes.map((lane) => (
                    <div key={lane.name} className="flex items-center gap-3">
                      <span className="grid w-6 shrink-0 place-items-center" title={lane.name}>
                        {lane.file ? <Logo file={lane.file} tone="app" className="size-4" alt={lane.name} /> : <Icon.people className="size-4 text-g-muted" />}
                      </span>
                      <div className="relative h-9 flex-1 rounded-[10px] bg-white/[0.025]">
                        {lane.events.map((e) => (
                          <span
                            key={e.title}
                            className={`absolute inset-y-1 flex items-center overflow-hidden rounded-[7px] pl-3 pr-1.5 text-[12px] font-medium before:absolute before:inset-y-1.5 before:left-1 before:w-[3px] before:rounded-full ${toneCls[e.tone]} ${
                              e.clash ? "ring-1 ring-g-rose/70" : ""
                            } ${now >= e.to ? "opacity-40" : ""}`}
                            style={{ left: `${pct(e.from)}%`, width: `calc(${pct(e.to) - pct(e.from)}% - 3px)` }}
                          >
                            <span className="truncate">{e.title}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {/* now line */}
                <div className="pointer-events-none absolute bottom-0 left-[36px] right-0 top-6">
                  <motion.div
                    className="absolute inset-y-0 w-px bg-g-peach"
                    initial={false}
                    animate={{ left: `${pct(now)}%` }}
                    transition={{ duration: 0.6, ease: easeInOut }}
                  >
                    <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-g-peach" />
                  </motion.div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-[14px] border border-g-rose/25 bg-g-rose/[0.07] px-4 py-2.5">
                <Icon.alert className="size-[18px] text-g-rose" />
                <p className="flex-1 text-[13px]">
                  <span className="font-medium">1:1 with Dana</span>
                  <span className="text-g-muted"> overlaps your dentist appointment. Move it to Tuesday?</span>
                </p>
                <span className="press rounded-[9px] bg-g-text px-3 py-1.5 text-[12px] font-medium text-g-bg">Move</span>
                <span className="press rounded-[9px] border border-white/10 px-3 py-1.5 text-[12px] text-g-muted">Keep</span>
              </div>
            </Card>

            <Card
              title="Getting There"
              aside={<span className="text-[12px] tabular-nums text-g-muted">Hudson 204</span>}
              className={`flex flex-col transition-[border-color,box-shadow] duration-300 ${leave ? "!border-g-peach/50 shadow-[0_0_0_4px_rgba(246,185,138,0.08)]" : ""}`}
            >
              <div className="relative flex-1 overflow-hidden rounded-[12px] bg-[#202024]">
                <svg viewBox="0 0 330 230" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
                  {/* blocks and parks */}
                  {[
                    [10, 10, 80, 60], [100, 10, 70, 45], [180, 10, 60, 25], [250, 70, 70, 50], [10, 80, 60, 50], [140, 170, 90, 50], [250, 140, 70, 80], [10, 150, 110, 70],
                  ].map(([x, y, w, h], i) => (
                    <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill="#26262b" />
                  ))}
                  <rect x="90" y="70" width="70" height="55" rx="8" fill="var(--color-g-mint)" fillOpacity="0.13" />
                  <path d="M0 135 H330 M240 0 V230 M95 0 V230 M0 62 H330" stroke="#2f2f35" strokeWidth="7" />
                  <path d={ROUTE} fill="none" stroke="#3a3a41" strokeWidth="6" strokeLinecap="round" />
                  <motion.path
                    d={ROUTE}
                    fill="none"
                    stroke="var(--color-g-peach)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={false}
                    animate={{ pathLength: leave ? 1 : 0.15 + step * 0.06 }}
                    transition={{ duration: 0.6, ease }}
                  />
                  <circle cx="30" cy="190" r="7" fill="var(--color-g-text)" />
                  <circle cx="30" cy="190" r="12" fill="var(--color-g-text)" fillOpacity="0.15" />
                  <circle cx="300" cy="40" r="7" fill="var(--color-g-peach)" />
                </svg>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-[20px] font-medium tracking-[-0.02em]">{leave ? "Leave Now" : "Leave by 2:18 PM"}</p>
                  <p className="mt-0.5 text-[12px] text-g-muted">12 min walk, arrive 2:30 PM</p>
                </div>
                <span className="press flex items-center gap-1.5 rounded-[10px] bg-g-text px-3 py-2 text-[12px] font-medium text-g-bg">
                  <Icon.walk className="size-3.5" />
                  Start Route
                </span>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card title="Due Today" aside={<span className="text-[12px] tabular-nums text-g-muted">{4 - done} open</span>}>
              <ul className="space-y-1">
                {tasks.map((t, i) => {
                  const ticked = i < done;
                  return (
                    <li key={t.t} className="flex items-center gap-3 rounded-[10px] px-1 py-1.5 text-[13px]">
                      <span className={`grid size-[18px] shrink-0 place-items-center rounded-[6px] border transition-colors duration-200 ${ticked ? "border-g-sky bg-g-sky text-g-bg" : "border-white/20"}`}>
                        <AnimatePresence>
                          {ticked && (
                            <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2, ease }}>
                              <Icon.check />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      <span className={`flex-1 transition-colors duration-200 ${ticked ? "text-g-dim line-through" : ""}`}>{t.t}</span>
                      <Logo file={t.file} tone="app" className="size-3.5" />
                      <span className="w-20 text-right text-[12px] text-g-dim">{t.due}</span>
                    </li>
                  );
                })}
              </ul>
            </Card>

            <Card title="Heard Today" aside={<span className="flex items-center gap-1.5 text-[12px] text-g-muted"><Icon.mic className="size-3.5" />From your pin</span>}>
              <ul className="space-y-2">
                <AnimatePresence initial={false}>
                  {captures.slice(0, heard).reverse().map((c) => (
                    <motion.li
                      key={c.time}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="flex items-start gap-3 text-[13px]"
                    >
                      <Avatar name={c.who} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate">“{c.text}”</p>
                        <p className="mt-0.5 text-[12px] text-g-dim">
                          {c.who.split(" ")[0]}, {c.time}
                        </p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${c.tone}`}>{c.tag}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </Card>
          </div>
        </div>
      </Shell>
    </div>
  );
}
