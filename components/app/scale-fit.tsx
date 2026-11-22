"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders the app at its real design size, then zooms it to fit (CSS zoom keeps
 * text crisp, unlike a transform). Below `scrollBelow` it holds a readable zoom
 * and scrolls sideways between masked edges.
 */
export function ScaleFit({
  width,
  height = 880,
  children,
  mobileScale = 0.5,
  scrollBelow = 640,
  reserveHeight,
  className = "",
}: {
  width: number;
  height?: number;
  children: ReactNode;
  mobileScale?: number;
  scrollBelow?: number;
  /** on large screens, also fit the viewport height minus this many pixels */
  reserveHeight?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ zoom: 0, scroll: false });

  useLayoutEffect(() => {
    const o = outer.current;
    if (!o) return;
    const fit = () => {
      const w = o.clientWidth;
      const scroll = w < scrollBelow;
      let zoom = scroll ? mobileScale : Math.min(1, w / width);
      if (!scroll && reserveHeight !== undefined && window.innerWidth >= 1024) {
        zoom = Math.min(zoom, Math.max(0.3, (window.innerHeight - reserveHeight) / height));
      }
      setBox({ zoom, scroll });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(o);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [width, height, mobileScale, scrollBelow, reserveHeight]);

  return (
    <div
      ref={outer}
      className={`min-w-0 ${box.scroll ? "overflow-x-auto overscroll-x-contain" : "overflow-hidden"} ${className}`}
      style={box.scroll ? { maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)" } : undefined}
    >
      <div
        className={box.scroll ? "" : "mx-auto"}
        style={{ width, zoom: box.zoom || 1, visibility: box.zoom ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}
