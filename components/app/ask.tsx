"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLoop } from "@/lib/use-loop";
import { Logo } from "@/components/landing/brands";
import { Mark } from "@/components/landing/mark";
import { Shell } from "./shell";
import { Avatar, Card, Icon, ease } from "./ui";

const QUESTION = "What did Priya say about the Q1 budget?";
const ANSWER =
  "In today’s design review, Priya suggested keeping headcount flat and moving $40k from events into tooling. Sam agreed, and you said you’d update the budget doc by Friday.";

const BARS = Array.from({ length: 72 }, (_, i) => 6 + Math.round(Math.abs(Math.sin(i * 0.55) * 22 + Math.sin(i * 1.7) * 9)));
const HIGHLIGHT = [30, 41]; // bars that hold Priya's line

const transcript = [
  { who: "Sam Okafor", t: "12:41", text: "We’re over on events again this quarter." },
  { who: "Priya Raman", t: "12:42", text: "Let’s keep headcount flat and put the $40k from events into tooling.", key: true },
  { who: "Jordan Miles", t: "12:43", text: "Works for me. I’ll update the budget doc by Friday." },
];

export function AskView({ group = "ask" }: { group?: string }) {
  // 0-3 type, 4-11 stream, 12-17 settle and hold
  const { ref, step } = useLoop<HTMLDivElement>(18, 380);
  const q = QUESTION.slice(0, Math.min(QUESTION.length, Math.round((step / 3) * QUESTION.length)));
  const words = ANSWER.split(" ");
  const shown = step < 4 ? 0 : Math.min(words.length, Math.round(((step - 3) / 8) * words.length));
  const complete = shown >= words.length;
  const playhead = step < 4 ? 0.2 : Math.min(0.58, 0.2 + (step - 4) * 0.05);

  const sources = [
    { icon: <Icon.wave className="size-3.5 text-g-peach" />, label: "Heard by Pinpoint, 1:12 PM" },
    { icon: <Logo file="slack-icon" tone="app" className="size-3.5" />, label: "#finance, Oct 14" },
    { icon: <Logo file="google-drive" tone="app" className="size-3.5" />, label: "Q1 Budget, Draft 3" },
  ];

  return (
    <div ref={ref}>
      <Shell view="ask" group={group} title="Ask Pinpoint" meta="Searches your pin, calendars, mail and chats">
        <div className="grid h-full grid-cols-[1.2fr_1fr] gap-4">
          <div className="flex min-h-0 flex-col gap-4">
            <div className="flex justify-end">
              <div className="flex max-w-[80%] items-center gap-3">
                <p className="rounded-[18px] rounded-br-[6px] bg-white/[0.08] px-4 py-3 text-[15px]">
                  {q}
                  {step < 4 && <span className="caret ml-px inline-block h-[1.05em] w-px translate-y-[3px] bg-g-text" />}
                </p>
                <Avatar name="Jordan Miles" size="size-8" />
              </div>
            </div>

            <Card className="relative">
              <div className="mb-3 flex items-center gap-2">
                <Mark className="size-5 text-g-text" />
                <span className="font-logo text-[15px] font-semibold tracking-[-0.02em]">pinpoint</span>
              </div>
              <p className="min-h-[96px] text-[16px] leading-relaxed">
                {words.slice(0, shown).join(" ")}
                {step >= 4 && !complete && <span className="caret ml-1 inline-block size-2 rounded-full bg-g-peach align-middle" />}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {sources.map((s, i) => (
                  <motion.li
                    key={s.label}
                    initial={false}
                    animate={complete ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                    transition={{ duration: 0.25, ease, delay: complete ? i * 0.03 : 0 }}
                    className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[12px]"
                  >
                    {s.icon}
                    {s.label}
                  </motion.li>
                ))}
              </ul>
            </Card>

            <AnimatePresence>
              {complete && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.16 } }}
                  transition={{ duration: 0.3, ease, delay: 0.15 }}
                  className="g-card flex items-center gap-3 rounded-[16px] px-4 py-3"
                >
                  <span className="relative grid size-8 place-items-center rounded-[10px] bg-g-mint/15 text-g-mint">
                    <motion.span
                      className="absolute inset-0 rounded-[10px] bg-g-mint/30"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.7, ease, delay: 0.3 }}
                    />
                    <Icon.check className="size-3.5" />
                  </span>
                  <p className="flex-1 text-[13px]">
                    Follow-Up Added<span className="text-g-muted">: Update the budget doc by Friday</span>
                  </p>
                  <Logo file="google-drive" tone="app" className="size-4" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-auto flex items-center gap-3 rounded-[16px] border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-g-dim">
              <Icon.ask className="size-4" />
              <span className="flex-1">Ask about anything you heard, read or scheduled</span>
              <span className="grid size-8 place-items-center rounded-full bg-g-text text-g-bg">
                <Icon.mic className="size-4" />
              </span>
            </div>
          </div>

          <Card
            title={
              <span className="flex items-center gap-2">
                Design Review
                <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] font-normal text-g-muted">Studio 3</span>
              </span>
            }
            aside={<span className="text-[12px] tabular-nums text-g-muted">Today, 12:30 PM · 52 min</span>}
            className="flex min-h-0 flex-col"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-g-text text-g-bg">
                <Icon.play />
              </span>
              <div className="relative flex h-14 flex-1 items-center justify-between">
                {BARS.map((h, i) => {
                  const played = i / BARS.length <= playhead;
                  const hot = step >= 4 && i >= HIGHLIGHT[0] && i <= HIGHLIGHT[1];
                  return (
                    <span
                      key={i}
                      className={`w-[3px] rounded-full transition-colors duration-300 ${hot ? "bg-g-peach" : played ? "bg-g-text/80" : "bg-white/15"}`}
                      style={{ height: h }}
                    />
                  );
                })}
                <motion.span
                  className="absolute inset-y-0 w-px bg-g-text"
                  initial={false}
                  animate={{ left: `${playhead * 100}%` }}
                  transition={{ duration: 0.4, ease }}
                />
              </div>
            </div>
            <div className="mt-2 flex justify-between pl-12 text-[11px] tabular-nums text-g-dim">
              <span>12:30</span>
              <span>12:56</span>
              <span>1:22</span>
            </div>

            <ul className="mt-5 space-y-4">
              {transcript.map((l) => (
                <li key={l.t} className="flex gap-3">
                  <Avatar name={l.who} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-g-muted">
                      <span className="text-g-text">{l.who.split(" ")[0]}</span> · {l.t}
                    </p>
                    <p className="relative mt-1 text-[14px] leading-relaxed">
                      {l.key && (
                        <motion.span
                          aria-hidden
                          className="absolute -inset-x-1.5 -inset-y-0.5 rounded-[6px] bg-g-peach/15"
                          initial={false}
                          animate={{ clipPath: step >= 4 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                          transition={{ duration: 0.6, ease }}
                        />
                      )}
                      <span className="relative">{l.text}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center gap-2 border-t border-white/[0.06] pt-4 text-[12px] text-g-muted">
              <span className="flex -space-x-1.5">
                {["Priya Raman", "Sam Okafor", "Jordan Miles"].map((n) => (
                  <span key={n} className="rounded-full ring-2 ring-g-card">
                    <Avatar name={n} size="size-6" />
                  </span>
                ))}
              </span>
              3 people · 2 decisions · 1 follow-up
            </div>
          </Card>
        </div>
      </Shell>
    </div>
  );
}
