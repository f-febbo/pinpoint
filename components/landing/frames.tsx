"use client";

import { useEffect, type ComponentType } from "react";
import { AskView, PrivacyView, TodayView } from "./app-demo";

const frames: { id: string; title: string; body: string; View: ComponentType; glow: string }[] = [
  {
    id: "where",
    title: "Always know where to be",
    body: "Every calendar on one timeline, with when to leave and a warning when plans collide.",
    View: TodayView,
    glow: "radial-gradient(55% 60% at 85% 15%, rgba(46,107,255,0.35), transparent 70%), radial-gradient(40% 40% at 0% 100%, rgba(255,164,102,0.12), transparent 70%)",
  },
  {
    id: "ask",
    title: "Ask about anything you heard",
    body: "Your pin remembers the conversation. Ask, and pinpoint answers with where it heard it.",
    View: AskView,
    glow: "radial-gradient(55% 60% at 10% 10%, rgba(255,164,102,0.22), transparent 70%), radial-gradient(50% 50% at 100% 100%, rgba(46,107,255,0.3), transparent 70%)",
  },
  {
    id: "privacy",
    title: "Private by design",
    body: "pinpoint listens on your pin and thinks on your phone. Nothing reaches the cloud unless you choose it.",
    View: PrivacyView,
    glow: "radial-gradient(70% 70% at 50% 0%, rgba(46,107,255,0.45), transparent 70%), linear-gradient(180deg, #060a1c, #05060d)",
  },
];

/**
 * On large screens, each layer ([data-stack]) sticks while the next slides up
 * over it. As it's covered, its content fades, shrinks and dims; as the next
 * one arrives, its content fades in.
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
    mq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
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
          className="grain relative flex min-h-svh items-center overflow-hidden rounded-t-[36px] bg-bg shadow-[0_-30px_80px_rgba(0,0,0,0.55)] lg:sticky lg:top-0 lg:h-svh"
        >
          <div aria-hidden className="absolute inset-0" style={{ background: glow }} />
          <div data-stack-content className="relative mx-auto w-full max-w-[1200px] px-5 py-24 sm:px-8 lg:pb-8 lg:pt-24">
            <div className="mb-8 grid gap-4 lg:grid-cols-2 lg:items-end">
              <h2 id={`${id}-title`} className="display trim text-[clamp(2.4rem,4.6vw,4.2rem)]">
                {title}
              </h2>
              <p className="fluid-body max-w-md leading-relaxed text-muted lg:justify-self-end">{body}</p>
            </div>
            <View />
          </div>
        </section>
      ))}
    </>
  );
}
