import type { ReactNode } from "react";

/** Acronym in small caps. */
export function Acr({ children }: { children: ReactNode }) {
  return <abbr className="acr no-underline">{children}</abbr>;
}
