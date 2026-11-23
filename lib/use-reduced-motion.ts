"use client";
import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

/** Reduced-motion preference. False on the server and during hydration, so markup matches. */
export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
