/* Minimal line icons for the app UI. */
type P = { className?: string };
const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const I = {
  today: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  ),
  ask: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </svg>
  ),
  follow: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M8.5 12.2l2.3 2.3 4.7-5" />
    </svg>
  ),
  places: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  ),
  people: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <circle cx="9" cy="9" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0111 0M15.5 6.2a3 3 0 010 5.6M17 14.5a5 5 0 013.5 4.5" />
    </svg>
  ),
  shield: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  settings: ({ className = "size-[18px]" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-1.8-.3 1.6 1.6 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.6 1.6 0 00-1-1.5 1.6 1.6 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00.3-1.8 1.6 1.6 0 00-1.5-1H3a2 2 0 110-4h.1a1.6 1.6 0 001.5-1 1.6 1.6 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H9a1.6 1.6 0 001-1.5V3a2 2 0 114 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V9a1.6 1.6 0 001.5 1H21a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1z" />
    </svg>
  ),
  walk: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <circle cx="13" cy="4.5" r="1.8" />
      <path d="M10 21l2-6 3 3v3M8.5 12.5L10 8.5l3.5-1 2.5 3.5 3 1M10 8.5L7 10l-1 3" />
    </svg>
  ),
  wave: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 11v2M21 12h0" />
    </svg>
  ),
  lock: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5" />
    </svg>
  ),
  alert: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5M12 16.2v.1" />
    </svg>
  ),
  check: ({ className = "size-3" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s} strokeWidth={3}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  ),
  pin: ({ className = "size-4" }: P) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...s}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  ),
};
