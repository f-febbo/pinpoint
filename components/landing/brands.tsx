/* Official brand marks (SVG Logos / vscode-icons via Iconify). Shown as supported integrations. */
export const integrations = [
  { file: "microsoft-outlook", name: "Outlook" },
  { file: "google-calendar", name: "Google Calendar" },
  { file: "google-gmail", name: "Gmail" },
  { file: "microsoft-teams", name: "Microsoft Teams" },
  { file: "slack-icon", name: "Slack" },
  { file: "zoom-icon", name: "Zoom" },
  { file: "google-meet", name: "Google Meet" },
  { file: "notion-icon", name: "Notion" },
  { file: "google-drive", name: "Google Drive" },
] as const;

export type BrandFile = (typeof integrations)[number]["file"];

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Logo({ file, className = "size-5", alt = "" }: { file: BrandFile; className?: string; alt?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`${base}/logos/${file}.svg`} alt={alt} className={`shrink-0 object-contain ${className}`} draggable={false} />;
}
