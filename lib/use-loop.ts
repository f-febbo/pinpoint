"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Advances a step counter on an interval while the element is on screen.
 * Reduced motion shows the final step and stays still.
 */
export function useLoop<T extends HTMLElement>(steps: number, ms: number) {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        clearInterval(id);
        if (e.isIntersecting) id = setInterval(() => setStep((s) => (s + 1) % steps), ms);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, [steps, ms, reduce]);

  return { ref, step: reduce ? steps - 1 : step };
}
