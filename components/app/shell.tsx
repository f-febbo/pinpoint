"use client";

import { LayoutGroup, MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";
import { Mark } from "@/components/landing/mark";
import { Logo } from "@/components/landing/brands";
import { Avatar, Battery, Icon, easeInOut } from "./ui";

export type AppView = "today" | "ask" | "settings";

type Item = { id: string; label: string; icon: keyof typeof Icon; count?: number };
const groups: { label: string; items: Item[] }[] = [
  {
    label: "Overview",
    items: [
      { id: "today", label: "Today", icon: "today" },
      { id: "ask", label: "Ask Pinpoint", icon: "ask" },
      { id: "recordings", label: "Recordings", icon: "recordings", count: 6 },
    ],
  },
  {
    label: "Library",
    items: [
      { id: "follow", label: "Follow-Ups", icon: "follow", count: 3 },
      { id: "people", label: "People", icon: "people" },
      { id: "places", label: "Places", icon: "places" },
      { id: "notes", label: "Notes", icon: "notes" },
    ],
  },
];

function NavItem({ item, active, group }: { item: Item; active: boolean; group: string }) {
  const I = Icon[item.icon];
  return (
    <li className="relative">
      {active && (
        <motion.span
          layoutId={`${group}-active`}
          className="absolute inset-0 rounded-[10px] bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          transition={{ duration: 0.35, ease: easeInOut }}
        />
      )}
      <span className={`relative flex items-center gap-3 rounded-[10px] px-3 py-2 text-[14px] transition-colors duration-200 ${active ? "text-g-text" : "text-g-muted"}`}>
        <I />
        <span className="flex-1">{item.label}</span>
        {item.count && <span className="text-[12px] tabular-nums text-g-dim">{item.count}</span>}
      </span>
    </li>
  );
}

/** The pinpoint app chrome at real size (1440px wide). */
export function Shell({
  view,
  title,
  meta,
  children,
  group,
}: {
  view: AppView;
  title: ReactNode;
  meta: ReactNode;
  children: ReactNode;
  group: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id={group}>
        <div className="flex h-[880px] w-[1440px] overflow-hidden rounded-[24px] border border-white/10 bg-g-bg font-sans text-g-text shadow-[0_2px_4px_rgba(0,0,0,0.3),0_30px_80px_-20px_rgba(0,0,0,0.7)]">
          <aside className="flex w-[248px] shrink-0 flex-col border-r border-white/[0.06] bg-g-side p-4">
            <div className="flex items-center gap-2.5 px-2 pb-5 pt-1.5">
              <Mark className="size-6" />
              <span className="font-logo text-[18px] font-semibold tracking-[-0.02em]">pinpoint</span>
            </div>
            <div className="mb-5 flex items-center gap-2 rounded-[12px] border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[13px] text-g-dim">
              <Icon.search className="size-4" />
              <span className="flex-1">Search</span>
              <kbd className="rounded-md border border-white/10 px-1.5 font-sans text-[11px]">⌘K</kbd>
            </div>
            {groups.map((g) => (
              <div key={g.label} className="mb-4">
                <p className="mb-1.5 px-3 text-[12px] text-g-dim">{g.label}</p>
                <ul className="space-y-0.5">
                  {g.items.map((it) => (
                    <NavItem key={it.id} item={it} active={it.id === view} group={group} />
                  ))}
                </ul>
              </div>
            ))}
            <ul className="mt-auto space-y-0.5">
              <NavItem item={{ id: "settings", label: "Settings", icon: "settings" }} active={view === "settings"} group={group} />
            </ul>
            <div className="mt-3 rounded-[14px] border border-white/[0.07] bg-white/[0.03] p-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[13px]">
                  <span className="relative grid size-2 place-items-center">
                    <span className="pulse-ring absolute size-2 rounded-full bg-g-mint" />
                    <span className="size-2 rounded-full bg-g-mint" />
                  </span>
                  Pin Connected
                </span>
                <span className="flex items-center gap-1.5 text-[12px] tabular-nums text-g-muted">
                  <Battery />
                  82%
                </span>
              </div>
              <p className="mt-1.5 text-[12px] text-g-dim">Synced 2 min ago</p>
            </div>
          </aside>

          <main className="flex min-w-0 flex-1 flex-col">
            <header className="flex items-center justify-between border-b border-white/[0.06] px-7 py-5">
              <div>
                <h3 className="text-[22px] font-medium tracking-[-0.02em]">{title}</h3>
                <p className="mt-0.5 text-[13px] tabular-nums text-g-muted">{meta}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center -space-x-1.5 pr-2">
                  {(["microsoft-outlook", "google-calendar", "microsoft-teams", "slack-icon", "google-drive"] as const).map((f) => (
                    <span key={f} className="grid size-8 place-items-center rounded-full border-2 border-g-bg bg-g-card-2">
                      <Logo file={f} tone="app" className="size-4" />
                    </span>
                  ))}
                </div>
                <span className="grid size-9 place-items-center rounded-full border border-white/[0.07] text-g-muted">
                  <Icon.bell />
                </span>
                <Avatar name="Jordan Miles" size="size-9" />
              </div>
            </header>
            <div className="min-h-0 flex-1 p-7">{children}</div>
          </main>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
