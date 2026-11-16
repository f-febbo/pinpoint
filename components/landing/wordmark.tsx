type Props = { className?: string };

/**
 * The pinpoint wordmark. Pure type: Bricolage Grotesque at full weight,
 * condensed and tightly tracked. The tittle on the second "i" is the point
 * in pinpoint, outlined in ink and filled with the brand yellow.
 */
export function Wordmark({ className = "" }: Props) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      <span className="sr-only">pinpoint</span>
      <span
        aria-hidden
        className="font-display font-extrabold"
        style={{
          fontVariationSettings: '"opsz" 96, "wdth" 84',
          letterSpacing: "-0.055em",
        }}
      >
        pinpo
        <span className="relative inline-block">
          ı
          <span
            className="absolute left-1/2 rounded-full bg-pin"
            style={{
              width: "0.17em",
              height: "0.17em",
              top: "0.05em",
              transform: "translateX(-50%)",
              boxShadow: "0 0 0 0.036em var(--color-ink)",
            }}
          />
        </span>
        nt
      </span>
    </span>
  );
}
