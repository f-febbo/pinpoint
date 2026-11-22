/** The pinpoint wordmark: lowercase Ranade, medium weight, wide tracking. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block font-medium lowercase ${className}`}
      style={{ letterSpacing: "0.24em", marginRight: "-0.24em" }}
    >
      pinpoint
    </span>
  );
}
