/**
 * Soft ribbons drifting in from every edge and meeting at one point:
 * scattered information, pinpointed.
 */
export function HeroArt() {
  const P = { x: 1060, y: 430 }; // the point
  return (
    <svg
      aria-hidden
      className="absolute inset-0 size-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id="softer" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="46" />
        </filter>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0" />
        </filter>
        <linearGradient id="g1" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#cfdad1" />
          <stop offset="0.55" stopColor="#8fa596" />
          <stop offset="1" stopColor="#3f5649" />
        </linearGradient>
        <linearGradient id="g2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e3e8e2" />
          <stop offset="1" stopColor="#6d8576" />
        </linearGradient>
        <linearGradient id="g3" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#d9a27d" />
          <stop offset="0.6" stopColor="#b0896c" />
          <stop offset="1" stopColor="#7d907f" />
        </linearGradient>
        <radialGradient id="halo" cx={P.x} cy={P.y} r="420" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1440" height="900" fill="var(--color-paper)" />
      <rect width="1440" height="900" fill="url(#halo)" />

      {/* deep shadow layer */}
      <g className="drift-b" filter="url(#softer)" opacity="0.55">
        <path d={`M-120 1000 C 320 930 720 560 ${P.x} ${P.y}`} stroke="#3f5649" strokeWidth="200" fill="none" />
        <path d={`M1560 -100 C 1320 80 1190 300 ${P.x} ${P.y}`} stroke="#5b7264" strokeWidth="150" fill="none" />
      </g>

      {/* ribbons */}
      <g className="drift-a" filter="url(#soft)" strokeLinecap="round" fill="none">
        <path d={`M-140 960 C 300 900 700 540 ${P.x} ${P.y}`} stroke="url(#g1)" strokeWidth="170" />
        <path d={`M1580 -60 C 1330 90 1190 300 ${P.x} ${P.y}`} stroke="url(#g2)" strokeWidth="140" />
        <path d={`M1580 1000 C 1380 780 1210 540 ${P.x} ${P.y}`} stroke="url(#g3)" strokeWidth="130" opacity="0.9" />
        <path d={`M760 -160 C 860 100 960 330 ${P.x} ${P.y}`} stroke="#c3d0c6" strokeWidth="90" opacity="0.8" />
      </g>

      {/* crisp glass edges */}
      <g className="drift-a" fill="none" stroke="#ffffff" strokeWidth="1.3" opacity="0.7">
        <path d={`M1580 20 C 1350 150 1200 330 ${P.x} ${P.y}`} />
        <path d={`M1580 920 C 1390 730 1220 520 ${P.x} ${P.y}`} />
      </g>

      {/* the point */}
      <circle cx={P.x} cy={P.y} r="7" fill="var(--color-copper)" className="ping" />
      <circle cx={P.x} cy={P.y} r="7" fill="var(--color-copper)" />
      <circle cx={P.x} cy={P.y} r="16" fill="none" stroke="var(--color-copper)" strokeOpacity="0.5" />

      <rect width="1440" height="900" filter="url(#grain)" />
    </svg>
  );
}
