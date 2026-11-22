import { brandPaths } from "@/lib/brand-paths";

export type Brand =
  | "outlook"
  | "googleCalendar"
  | "gmail"
  | "teams"
  | "slack"
  | "googleMeet"
  | "notion"
  | "googleDrive";

export const brandName: Record<Brand, string> = {
  outlook: "Outlook",
  googleCalendar: "Google Calendar",
  gmail: "Gmail",
  teams: "Teams",
  slack: "Slack",
  googleMeet: "Google Meet",
  notion: "Notion",
  googleDrive: "Google Drive",
};

/** Monochrome brand mark. Microsoft marks aren't in Simple Icons, so they get a plain letter tile. */
export function BrandIcon({ brand, className = "size-5" }: { brand: Brand; className?: string }) {
  if (brand === "outlook" || brand === "teams") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <text
          x="12"
          y="16.6"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="var(--color-paper)"
          fontFamily="var(--font-sans)"
        >
          {brand === "outlook" ? "O" : "T"}
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d={brandPaths[brand]} />
    </svg>
  );
}

export const integrations: Brand[] = [
  "outlook",
  "googleCalendar",
  "gmail",
  "teams",
  "slack",
  "googleMeet",
  "notion",
  "googleDrive",
];
