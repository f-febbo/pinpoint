"use client";

import { useEffect, type ComponentType } from "react";
import { AskView } from "@/components/app/ask";
import { ScaleFit } from "@/components/app/scale-fit";
import { SettingsView } from "@/components/app/settings";
import { TodayView } from "@/components/app/today";

const frames: { id: string; title: string; body: string; View: ComponentType<{ group?: string }>; glow: string }[] = [
  {
    id: "where",
    title: "Always Know Where to Be",
    body: "Every calendar on one timeline, with when to leave and a heads-up when plans collide.",
    View: TodayView,
    glow: "radial-gradient(60% 55% at 80% 100%, rgba(46,107,255,0.4), transparent 70%), radial-gradient(40% 40% at 0% 0%, rgba(255,164,102,0.14), transparent 70%)",
  },
  {
    id: "ask",
    title: "Ask About Anything You Heard",
    body: "Pinpoint remembers the conversation, so you can ask what was said and see where it came from.",
    View: AskView,
    glow: "radial-gradient(55% 55% at 15% 100%, rgba(255,164,102,0.26), transparent 70%), radial-gradient(50% 50% at 100% 0%, rgba(46,107,255,0.32), transparent 70%)",
  },
  {
    id: "privacy",
    title: "Private by Design",
    body: "Recordings stay on your phone. You choose when Pinpoint thinks, and which approved model it uses.",
    View: SettingsView,
    glow: "radial-gradient(70% 60% at 50% 100%, rgba(46,107,255,0.5), transparent 70%), linear-gradient(180deg, #05060d, #070b1f)",
  },
];

/**
 * On large screens each layer ([data-stack]) sticks while the next slides over
 * it: the covered one fades, shrinks and dims as the new one fades in.
 */
function useStackFade() {
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const layers = [...document.querySelectorAll<HTMLElement>("[data-stack]")];
      const after = document.getElementById("feedback");
      const vh = window.innerHeight;
      layers.forEach((el, i) => {
        if (!mq.matches) {
          el.style.removeProperty("--out");
          el.style.removeProperty("--in");
          return;
        }
        const next = layers[i + 1] ?? after;
        const out = next ? Math.min(1, Math.max(0, (vh - next.getBoundingClientRect().top) / vh)) : 0;
        const top = el.getBoundingClientRect().top;
        const inn = i === 0 ? 1 : Math.min(1, Math.max(0, 1 - top / (vh * 0.55)));
        el.style.setProperty("--out", out.toFixed(3));
        el.style.setProperty("--in", inn.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

export function Frames() {
  useStackFade();
  return (
    <>
      {frames.map(({ id, title, body, View, glow }) => (
        <section
          key={id}
          id={id}
          data-stack
          aria-labelledby={`${id}-title`}
          className="grain relative overflow-hidden rounded-t-[36px] bg-bg shadow-[0_-30px_80px_rgba(0,0,0,0.55)] lg:sticky lg:top-0 lg:h-svh"
        >
          <div aria-hidden className="absolute inset-0" style={{ background: glow }} />
          <div data-stack-content className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col px-5 pb-16 pt-24 sm:px-8 lg:pb-6 lg:pt-[92px]">
            <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
              <h2 id={`${id}-title`} className="display trim text-[clamp(2.2rem,3.8vw,3.6rem)]">
                {title}
              </h2>
              <p className="fluid-body max-w-[30rem] leading-relaxed text-muted lg:text-right">{body}</p>
            </div>
            <ScaleFit width={1440} reserveHeight={235} className="lg:flex-1">
              <View />
            </ScaleFit>
          </div>
        </section>
      ))}
    </>
  );
}
