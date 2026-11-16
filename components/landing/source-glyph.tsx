export type SourceKind = "mail" | "calendar" | "doc" | "chat" | "finance" | "notes";

export const sourceLabel: Record<SourceKind, string> = {
  mail: "Mail",
  calendar: "Calendar",
  doc: "Docs",
  chat: "Chat",
  finance: "Finance",
  notes: "Notes",
};

/** Small hand-drawn glyphs for generic source types (no third-party logos). */
export function SourceGlyph({ kind, className = "size-4" }: { kind: SourceKind; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      {kind === "mail" && (
        <>
          <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" {...common} />
          <path d="M3 5.5l7 5.5 7-5.5" {...common} />
        </>
      )}
      {kind === "calendar" && (
        <>
          <rect x="3" y="4" width="14" height="13" rx="1.5" {...common} />
          <path d="M3 8h14M7 2.5v3M13 2.5v3" {...common} />
          <rect x="6" y="10.5" width="3" height="3" rx=".5" fill="currentColor" />
        </>
      )}
      {kind === "doc" && (
        <>
          <path d="M5 2.5h6.5L15.5 6.5v11h-10.5z" {...common} />
          <path d="M11 2.5v4.5h4.5M8 11h5M8 14h3.5" {...common} />
        </>
      )}
      {kind === "chat" && (
        <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H9l-4 3.5V14H5a2 2 0 01-2-2z" {...common} />
      )}
      {kind === "finance" && (
        <>
          <rect x="2.5" y="5" width="15" height="10" rx="1.5" {...common} />
          <circle cx="10" cy="10" r="2.2" {...common} />
          <path d="M5.5 8v4M14.5 8v4" {...common} />
        </>
      )}
      {kind === "notes" && (
        <>
          <rect x="4" y="2.5" width="12" height="15" rx="1.5" {...common} />
          <path d="M7 7h6M7 10h6M7 13h3.5" {...common} />
        </>
      )}
    </svg>
  );
}
