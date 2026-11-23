"use client";

import { useEffect, useRef, type RefObject } from "react";

const RAMP = " .·:-=+*#%@";
// the mark's five bars, in a 24-unit box (same geometry as <Mark />)
const BARS = [
  { x: 3.7, top: 7.6, bottom: 13.4 },
  { x: 7.85, top: 3.6, bottom: 17.6 },
  { x: 12, top: 1.4, bottom: 22.6 },
  { x: 16.15, top: 3.6, bottom: 17.6 },
  { x: 20.3, top: 7.6, bottom: 13.4 },
];

/**
 * A slow-moving ASCII field with the Pinpoint pin drawn in pixels at its
 * center. The pin's position comes from `anchor`, so layout stays in CSS.
 */
export function AsciiField({ anchor }: { anchor: RefObject<HTMLElement | null> }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CELL = 14;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let pin = { x: 0, y: 0, r: 120 };
    let raf = 0;
    let last = 0;
    let visible = true;
    const t0 = performance.now();

    const measure = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = c.getBoundingClientRect();
      w = r.width;
      h = r.height;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      const a = anchor.current?.getBoundingClientRect();
      if (a) pin = { x: a.left - r.left + a.width / 2, y: a.top - r.top + a.height / 2, r: a.width / 2 };
    };

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.font = `500 ${CELL - 3}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cols = Math.ceil(w / CELL);
      const rows = Math.ceil(h / CELL);
      const glowR = pin.r * 3.2;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * CELL + CELL / 2;
          const y = j * CELL + CELL / 2;
          const dx = x - pin.x;
          const dy = y - pin.y;
          const d = Math.hypot(dx, dy);
          if (d < pin.r + CELL * 0.5) continue; // the pin is drawn in pixels below

          // drifting interference pattern, brighter near the pin
          const n =
            Math.sin(i * 0.21 + t * 0.6) * Math.cos(j * 0.17 - t * 0.4) +
            Math.sin((i + j) * 0.09 + t * 0.3) * 0.6;
          const ring = Math.sin(d / 18 - t * 1.6) * 0.5 + 0.5; // ripples moving outward
          const glow = Math.exp(-((d / glowR) ** 2));
          // gentle falloff toward the edges and corners, never fully gone
          const ex = Math.abs(x / w - 0.5) * 2;
          const ey = Math.abs(y / h - 0.55) * 2;
          const fade = 1 - Math.min(1, Math.hypot(ex, ey) / 1.5) * 0.45;
          let b = (0.3 + 0.1 * n + glow * (0.3 + 0.25 * ring)) * fade;
          if (b < 0.08) continue;
          b = Math.min(1, b);

          const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(b * RAMP.length * 1.4))];
          if (ch === " ") continue;
          // cantaloupe accent: a warm band along the bottom, and the crests of the ripples near the pin
          const crest = ring > 0.9 ? glow * (ring - 0.9) * 10 : 0;
          const warm = Math.min(1, Math.max(0, (y / h - 0.72) / 0.28) * (1 - glow) + crest);
          const r = Math.round(46 + (255 - 46) * warm);
          const g = Math.round(107 + (164 - 107) * warm);
          const bl = Math.round(255 + (102 - 255) * warm);
          ctx.fillStyle = `rgba(${r},${g},${bl},${Math.min(0.85, 0.08 + b * 0.9)})`;
          ctx.fillText(ch, x, y);
        }
      }

      // the pin, in pixels
      const P = 6; // pixel size
      const scale = (pin.r * 1.25) / 24;
      const ox = pin.x - 12 * scale;
      const oy = pin.y - 12 * scale;
      const breathe = reduce ? 1 : 0.92 + 0.08 * Math.sin(t * 2.2);
      for (let py = pin.y - pin.r; py <= pin.y + pin.r; py += P) {
        for (let px = pin.x - pin.r; px <= pin.x + pin.r; px += P) {
          const cx = px + P / 2;
          const cy = py + P / 2;
          const d = Math.hypot(cx - pin.x, cy - pin.y);
          if (d > pin.r) continue;
          const ux = (cx - ox) / scale;
          const uy = (cy - oy) / scale;
          let bar = false;
          for (let k = 0; k < BARS.length; k++) {
            const B = BARS[k];
            const mid = (B.top + B.bottom) / 2;
            const half = ((B.bottom - B.top) / 2) * (k === 2 ? breathe : 2 - breathe);
            if (Math.abs(ux - B.x) <= 1.45 && Math.abs(uy - mid) <= half) {
              bar = true;
              break;
            }
          }
          const jitter = reduce ? 0 : (Math.sin(px * 12.9898 + py * 78.233 + Math.floor(t * 6)) * 43758.5453) % 1;
          if (bar) {
            ctx.fillStyle = `rgba(238,241,248,${0.9 + 0.1 * Math.abs(jitter)})`;
          } else if (d > pin.r - P * 1.5) {
            ctx.fillStyle = `rgba(109,151,255,${0.55 + 0.3 * Math.abs(jitter)})`; // rim
          } else {
            const shade = 0.55 + 0.25 * (1 - d / pin.r) + 0.08 * jitter;
            ctx.fillStyle = `rgba(${Math.round(14 * shade + 8)},${Math.round(20 * shade + 10)},${Math.round(48 * shade + 24)},1)`;
          }
          ctx.fillRect(px + 0.5, py + 0.5, P - 1, P - 1);
        }
      }

      // the pin's status light, in the accent color
      const lx = pin.x + pin.r * 0.52;
      const ly = pin.y + pin.r * 0.56;
      const on = reduce ? 1 : 0.8 + 0.2 * Math.sin(t * 3);
      const gx = Math.round(lx / P) * P;
      const gy = Math.round(ly / P) * P;
      ctx.fillStyle = `rgba(255,164,102,${0.3 * on})`;
      ctx.fillRect(gx - P, gy - P, P * 4 - 1, P * 4 - 1);
      ctx.fillStyle = `rgba(255,164,102,${on})`;
      ctx.fillRect(gx + 0.5, gy + 0.5, P * 2 - 1, P * 2 - 1);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 66) return; // ~15fps is plenty for a texture
      last = now;
      draw(now);
    };

    measure();
    draw(performance.now());
    const ro = new ResizeObserver(() => {
      measure();
      draw(performance.now());
    });
    ro.observe(c);
    if (anchor.current) ro.observe(anchor.current);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [anchor]);

  return <canvas ref={canvas} aria-hidden className="absolute inset-0 size-full" />;
}
