/* Official brand marks (SVG Logos / vscode-icons via Iconify), tinted to one scheme unless tone is "original". */
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

export type BrandFile = (typeof integrations)[number]["file"] | "claude" | "openai";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Logo({
  file,
  className = "size-5",
  alt = "",
  tone = "site",
}: {
  file: BrandFile;
  className?: string;
  alt?: string;
  tone?: "site" | "app" | "original";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${base}/logos/${file}.svg`}
      alt={alt}
      draggable={false}
      className={`shrink-0 object-contain ${className}`}
      style={tone === "original" ? undefined : { filter: `url(#duo-${tone})` }}
    />
  );
}
