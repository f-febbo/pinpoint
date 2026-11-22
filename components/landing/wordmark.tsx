/** The pinpoint wordmark, set in Poppins. The icon mark sits to its left once designed. */
export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`font-logo inline-block font-semibold lowercase tracking-[-0.02em] ${className}`}>pinpoint</span>;
}
