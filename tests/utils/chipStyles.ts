import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { getEmotionStyles, type ResolvedStyles } from "./emotionStyles";

/**
 * Renders a Chip and returns the resolved styles of its root and label.
 * @param ui - Element that renders one Chip.
 * @returns Resolved styles for the root and label elements.
 */
export function renderChipStyles(
  ui: ReactElement,
): Record<string, ResolvedStyles> {
  const root = render(ui).container.querySelector(".MuiChip-root") as Element;
  return {
    label: getEmotionStyles(root.querySelector(".MuiChip-label") as Element),
    root: getEmotionStyles(root),
  };
}
