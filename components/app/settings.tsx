"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useLoop } from "@/lib/use-loop";
import { Logo } from "@/components/landing/brands";
import { Shell } from "./shell";
import { Card, Icon, Toggle, ease, easeInOut } from "./ui";

type Opt = { id: string; label: string; desc: string; icon: ReactNode; approved?: boolean };
const options: Opt[] = [
  { id: "phone", label: "On This iPhone", desc: "Most private. Uses more battery.", icon: <Icon.phone className="size-4" /> },
  { id: "charging", label: "On This iPhone While Charging", desc: "Catches up when you plug in.", icon: <Icon.bolt className="size-4" /> },
  { id: "claude", label: "Claude by Anthropic", desc: "Approved connection", icon: <Logo file="claude" tone="app" className="size-4" />, approved: true },
  { id: "chatgpt", label: "ChatGPT by OpenAI", desc: "Approved connection", icon: <Logo file="openai" tone="app" className="size-4" />, approved: true },
];

const modes = ["Only When I Ask", "While Charging", "Always"] as const;
const battery: Record<(typeof modes)[number], string> = {
  "Only When I Ask": "Lowest battery use",
  "While Charging": "Low battery use",
  Always: "High battery use",
};

const settingsNav = ["General", "Pin", "Intelligence", "Integrations", "Notifications", "Privacy & Data"];
const activity = [5, 7, 8, 6, 4, 0, 0, 1, 0, 2, 0, 0, 1, 3, 0, 0, 0, 1, 0, 0, 0, 0, 6, 8];

export function SettingsView({ group = "settings" }: { group?: string }) {
  // 0-1 idle, 2 open, 3-6 highlight walks, 7 pick, 8 close, 9 confirm, 11 mode change
  const { ref, step } = useLoop<HTMLDivElement>(16, 620);
  const open = step >= 2 && step <= 7;
  const hover = Math.min(2, Math.max(0, step - 3));
  const current = step >= 8 ? options[2] : options[1];
  const mode = step >= 11 ? modes[0] : modes[1];
  const confirmed = step >= 9;

  return (
    <div ref={ref}>
      <Shell view="settings" group={group} title="Settings" meta="Intelligence">
        <div className="grid h-full grid-cols-[200px_1fr] gap-6">
          <ul className="space-y-0.5 text-[14px]">
            {settingsNav.map((n) => (
              <li key={n} className={`rounded-[10px] px-3 py-2 ${n === "Intelligence" ? "bg-white/[0.07] text-g-text" : "text-g-muted"}`}>
                {n}
              </li>
            ))}
          </ul>

          <div className="grid min-h-0 grid-cols-[1.25fr_1fr] gap-4">
            <div className="flex flex-col gap-4">
              <Card title="Where Pinpoint Thinks">
                <p className="-mt-2 mb-4 text-[13px] text-g-muted">Recordings always stay on your phone. Choose what handles your questions.</p>
                <div className="relative">
                  <motion.div
                    animate={{ scale: step === 2 || step === 7 ? 0.97 : 1 }}
                    transition={{ duration: 0.16, ease }}
                    className={`flex items-center gap-3 rounded-[12px] border px-3.5 py-3 transition-colors duration-200 ${
                      open ? "border-g-sky/60 bg-white/[0.05]" : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <span className="grid size-8 place-items-center rounded-[9px] bg-white/[0.06]">{current.icon}</span>
                    <span className="flex-1">
                      <span className="block text-[14px]">{current.label}</span>
                      <span className="block text-[12px] text-g-muted">{current.desc}</span>
                    </span>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2, ease }} className="text-g-muted">
                      <Icon.chevron />
                    </motion.span>
                  </motion.div>

                  <AnimatePresence>
                    {open && (
                      <motion.ul
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4, transition: { duration: 0.145, ease } }}
                        transition={{ duration: 0.18, ease }}
                        style={{ transformOrigin: "top center" }}
                        className="absolute inset-x-0 top-[calc(100%+6px)] z-10 rounded-[14px] border border-white/10 bg-g-card-2 p-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.3),0_24px_48px_-12px_rgba(0,0,0,0.6)]"
                      >
                        {options.map((o, i) => (
                          <motion.li
                            key={o.id}
                            initial={{ opacity: 0, y: -2 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18, ease, delay: i * 0.03 }}
                            className="relative flex items-center gap-3 rounded-[10px] px-2.5 py-2"
                          >
                            {hover === i && (
                              <motion.span
                                layoutId={`${group}-opt`}
                                className="absolute inset-0 rounded-[10px] bg-white/[0.07]"
                                transition={{ duration: 0.2, ease: easeInOut }}
                              />
                            )}
                            <span className="relative grid size-7 place-items-center rounded-[8px] bg-white/[0.05]">{o.icon}</span>
                            <span className="relative flex-1">
                              <span className="block text-[13px]">{o.label}</span>
                              <span className={`block text-[11px] ${o.approved ? "text-g-mint" : "text-g-muted"}`}>{o.desc}</span>
                            </span>
                            {o.id === current.id && <Icon.check className="relative size-3.5 text-g-sky" />}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-[12px] bg-white/[0.03] px-3.5 py-3 text-[13px]">
                  <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
                    <AnimatePresence>
                      {confirmed && (
                        <motion.span
                          key={step >= 9 ? "pulse" : "x"}
                          className="absolute inset-0 rounded-full bg-g-mint/40"
                          initial={{ scale: 1, opacity: 0.7 }}
                          animate={{ scale: 1.9, opacity: 0 }}
                          transition={{ duration: 0.6, ease }}
                        />
                      )}
                    </AnimatePresence>
                    <span className={`grid size-5 place-items-center rounded-full transition-colors duration-200 ${current.approved ? "bg-g-mint/20 text-g-mint" : "bg-white/[0.06] text-g-muted"}`}>
                      {current.approved ? <Icon.check className="size-3" /> : <Icon.lock className="size-3" />}
                    </span>
                  </span>
                  <p className="text-g-muted">
                    {current.approved ? (
                      <>
                        <span className="text-g-text">Connected to Claude.</span> Only the text of your question and the notes it needs
                        are shared. Audio never leaves your phone.
                      </>
                    ) : (
                      <>
                        <span className="text-g-text">Nothing leaves your phone.</span> Questions are answered on device, and new
                        recordings are processed when you plug in.
                      </>
                    )}
                  </p>
                </div>
              </Card>

              <Card title="When to Process" aside={<span className="text-[12px] text-g-muted">{battery[mode]}</span>}>
                <p className="-mt-2 mb-4 text-[13px] text-g-muted">Running a model all day drains your phone, so Pinpoint waits until it’s a good time.</p>
                <div className="relative grid grid-cols-3 rounded-[12px] bg-white/[0.04] p-1 text-[13px]">
                  {modes.map((m) => (
                    <span key={m} className={`relative z-10 py-2 text-center transition-colors duration-200 ${m === mode ? "text-g-text" : "text-g-muted"}`}>
                      {m === mode && (
                        <motion.span
                          layoutId={`${group}-mode`}
                          className="absolute inset-0 -z-10 rounded-[9px] bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.3)]"
                          transition={{ duration: 0.3, ease: easeInOut }}
                        />
                      )}
                      {m}
                    </span>
                  ))}
                </div>
              </Card>

              <Card title="Connections" aside={<span className="text-[12px] text-g-muted">Approved by Pinpoint</span>} className="flex-1">
                <ul className="divide-y divide-white/[0.06] text-[13px]">
                  {[
                    { file: "claude" as const, name: "Claude", by: "Anthropic", on: current.approved ?? false },
                    { file: "openai" as const, name: "ChatGPT", by: "OpenAI", on: false },
                  ].map((c) => (
                    <li key={c.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <span className="grid size-9 place-items-center rounded-[10px] bg-white/[0.05]">
                        <Logo file={c.file} tone="app" className="size-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block">{c.name}</span>
                        <span className="block text-[12px] text-g-muted">{c.by}</span>
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-200 ${
                          c.on ? "bg-g-mint/15 text-g-mint" : "bg-white/[0.06] text-g-muted"
                        }`}
                      >
                        {c.on ? "Connected" : "Available"}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="flex flex-col gap-4">
              <Card title="Privacy">
                <ul className="divide-y divide-white/[0.06] text-[13px]">
                  {[
                    { t: "Delete Raw Audio After 24 Hours", on: true },
                    { t: "Pause at Medical Offices", on: true },
                    { t: "Share Excerpts With Approved Models", on: current.approved ?? false },
                    { t: "Back Up Notes to iCloud", on: false },
                  ].map((r) => (
                    <li key={r.t} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                      {r.t}
                      <Toggle on={r.on} />
                    </li>
                  ))}
                </ul>
              </Card>

              <Card title="Processing Activity" aside={<span className="text-[12px] text-g-muted">Last 24 hours</span>} className="flex flex-1 flex-col">
                <div className="mb-4 flex gap-8">
                  <div>
                    <p className="text-[24px] font-medium tabular-nums tracking-[-0.03em]">3h 12m</p>
                    <p className="text-[12px] text-g-muted">Audio processed</p>
                  </div>
                  <div>
                    <p className="text-[24px] font-medium tabular-nums tracking-[-0.03em]">84%</p>
                    <p className="text-[12px] text-g-muted">Done while charging</p>
                  </div>
                </div>
                <div className="mt-auto flex h-[120px] items-end gap-[5px]">
                  {activity.map((v, i) => (
                    <span key={i} className="flex h-full flex-1 flex-col justify-end">
                      <span
                        className={`rounded-[3px] ${i < 5 || i > 21 ? "bg-g-mint/70" : "bg-g-sky/70"}`}
                        style={{ height: `${Math.max(5, v * 12)}%` }}
                      />
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-4 text-[12px] text-g-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-[2px] bg-g-mint/70" />
                    While charging
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-[2px] bg-g-sky/70" />
                    When you asked
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Shell>
    </div>
  );
}
