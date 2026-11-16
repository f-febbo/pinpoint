"use client";
import { useMediaQuery } from "./use-media-query";

/** Hydration-safe reduced-motion preference (false on the server and during hydration). */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}
