import type { ReactNode } from "react";

/**
 * Returns the title as an accessible name when it is non-blank text.
 * @param title - Title content.
 * @returns The title when it is non-blank text, or undefined.
 */
export function getTitleAriaLabel(title: ReactNode): string | undefined {
  return typeof title === "string" && title.trim() ? title : undefined;
}
