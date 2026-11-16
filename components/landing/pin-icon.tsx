"use client";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { motion } from "motion/react";
import { useId } from "react";

const BODY =
  "M120 214 C 106 182 58 150 58 92 A 62 62 0 1 1 182 92 C 182 150 134 182 120 214 Z";

type Props = {
  /** Pointer is over the icon (controlled by the parent so the whole hit area can be larger). */
  hovered?: boolean;
  /** Fragments are organized: the reticle locks on. */
  locked?: boolean;
  /** Increment to fire a press + ripple. */
  pulseKey?: number;
  className?: string;
  /** Draw the ground target. */
  ground?: boolean;
};

/**
 * The pinpoint game icon: a tactile map pin standing in a target.
 * Layered like a game sprite — hard ink extrusion, flat fill, a shaded side,
 * a glint, and a reticle eye that arms on hover and locks when activated.
 */
export function PinIcon({ hovered = false, locked = false, pulseKey = 0, className = "", ground = true }: Props) {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const lift = hovered && !reduce;
  const armed = hovered || locked;

  return (
    <svg viewBox="0 0 240 260" className={className} aria-hidden overflow="visible">
      <defs>
        <clipPath id={`body-${id}`}>
          <path d={BODY} />
        </clipPath>
      </defs>

      {ground && (
        <g>
          <ellipse cx="120" cy="224" rx="100" ry="24" fill="var(--color-paper-2)" stroke="var(--color-ink)" strokeWidth="3" />
          <ellipse cx="120" cy="224" rx="68" ry="16" fill="none" stroke="var(--color-ink)" strokeWidth="3" />
          <motion.ellipse
            cx="120"
            cy="224"
            ry="8.5"
            fill="var(--color-lime)"
            stroke="var(--color-ink)"
            strokeWidth="3"
            initial={false}
            animate={{ rx: armed ? 40 : 34 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          />
          {/* ripple on press */}
          {!reduce && pulseKey > 0 && (
            <motion.ellipse
              key={pulseKey}
              cx="120"
              cy="224"
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="2.5"
              initial={{ rx: 34, ry: 8, opacity: 0.9 }}
              animate={{ rx: 130, ry: 32, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          {/* contact shadow */}
          <motion.ellipse
            cx="122"
            cy="222"
            rx="22"
            ry="5.5"
            fill="var(--color-ink)"
            initial={false}
            animate={{ scale: lift ? 0.7 : 1, opacity: lift ? 0.18 : 0.35 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            style={{ transformOrigin: "122px 222px" }}
          />
        </g>
      )}

      {/* the pin — lifts and tilts around its tip */}
      <motion.g
        initial={false}
        animate={{ y: lift ? -16 : 0, rotate: lift ? -5 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 16 }}
        style={{ transformOrigin: "120px 214px" }}
      >
        <motion.g
          key={pulseKey}
          initial={reduce || pulseKey === 0 ? false : { scaleY: 0.86, scaleX: 1.06 }}
          animate={{ scaleY: 1, scaleX: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          style={{ transformOrigin: "120px 214px" }}
        >
          {/* hard extrusion */}
          <path d={BODY} transform="translate(7 9)" fill="var(--color-ink)" />
          {/* body + shaded crescent */}
          <g clipPath={`url(#body-${id})`}>
            <path d={BODY} fill="var(--color-pin-deep)" />
            <circle cx="108" cy="84" r="66" fill="var(--color-pin)" />
            <path d="M100 150 C 110 170 116 186 120 214 L 96 214 Z" fill="var(--color-pin)" />
          </g>
          <path d={BODY} fill="none" stroke="var(--color-ink)" strokeWidth="6" strokeLinejoin="round" />
          {/* glint */}
          <rect x="74" y="50" width="24" height="10" rx="5" fill="#fff" opacity="0.9" transform="rotate(-38 86 55)" />
          <circle cx="72" cy="76" r="4" fill="#fff" opacity="0.9" />

          {/* the eye / reticle */}
          <circle cx="120" cy="92" r="28" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="6" />
          <motion.g
            initial={false}
            animate={{ rotate: armed ? 45 : 0, opacity: armed ? 1 : 0, scale: armed ? 1 : 0.6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{ transformOrigin: "120px 92px" }}
            stroke="var(--color-ink)"
            strokeWidth="3.5"
            strokeLinecap="round"
          >
            <path d="M120 70v9M120 105v9M98 92h9M133 92h9" />
          </motion.g>
          <motion.circle
            cx="120"
            cy="92"
            initial={false}
            animate={{ r: armed ? 6.5 : 11, fill: locked ? "var(--color-pin-deep)" : "var(--color-ink)" }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          />
        </motion.g>
      </motion.g>
    </svg>
  );
}
