import type { CSSProperties } from "react";

/**
 * Returns the style for a vector slide image whose size isn't known yet: its natural size, capped to the slide area.
 * @returns The image style.
 */
export function getUnsizedStyle(): CSSProperties {
  return { maxHeight: "100%", maxWidth: "100%" };
}
