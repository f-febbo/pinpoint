import type { ReactNode } from "react";

/** Acronym in small caps. */
export function Acr({ children }: { children: ReactNode }) {
  return <abbr className="acr no-underline">{children}</abbr>;
}

/** Keeps the width of the bold state reserved, so a weight change on select doesn’t shift neighbours. */
export function Reserve({ children }: { children: string }) {
  return (
    <span className="reserve" data-text={children}>
      {children}
    </span>
  );
}

/**
 * Truncates in the middle so the start and the end of a name (like a file
 * extension or version) stay visible. The full text remains available to
 * assistive tech and on hover.
 */
export function MiddleTruncate({ text, tail = 8, className = "" }: { text: string; tail?: number; className?: string }) {
  const start = text.slice(0, Math.max(0, text.length - tail));
  const end = text.slice(-tail);
  return (
    <span title={text} className={`block min-w-0 ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="flex min-w-0">
        <span className="min-w-0 truncate">{start}</span>
        <span className="shrink-0 whitespace-pre">{end}</span>
      </span>
    </span>
  );
}
