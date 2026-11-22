/**
 * One color scheme for every third-party logo: a duotone that maps each logo's
 * brightness onto two colors, so details survive but the palette is shared.
 *  - duo-site: electric blue to white, for the marketing page
 *  - duo-app: graphite to white, inside the product UI
 */
export function SvgFilters() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="duo-site" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.18 0.93" />
          <feFuncG type="table" tableValues="0.42 0.95" />
          <feFuncB type="table" tableValues="1 0.97" />
        </feComponentTransfer>
      </filter>
      <filter id="duo-app" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.46 0.95" />
          <feFuncG type="table" tableValues="0.46 0.95" />
          <feFuncB type="table" tableValues="0.5 0.96" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
