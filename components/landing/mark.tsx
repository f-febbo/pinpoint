/**
 * The pinpoint mark: rounded bars like a voice waveform, whose outline traces
 * a map pin. Pinpoint listens; pinpoint points.
 */
const BARS = [
  { x: 3.7, top: 7.6, bottom: 13.4 },
  { x: 7.85, top: 3.6, bottom: 17.6 },
  { x: 12, top: 1.4, bottom: 22.6 },
  { x: 16.15, top: 3.6, bottom: 17.6 },
  { x: 20.3, top: 7.6, bottom: 13.4 },
];

export function Mark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      {BARS.map((b) => (
        <rect key={b.x} x={b.x - 1.45} y={b.top} width="2.9" height={b.bottom - b.top} rx="1.45" />
      ))}
    </svg>
  );
}
