import type { LightboxFigureItem } from "../../types";

/**
 * Scrolls a figure into the middle of the viewport and focuses its expand button.
 * @param figure - Figure to show.
 */
export function showFigure(figure: LightboxFigureItem): void {
  const figureEl = figure.figureRef.current;
  if (!figureEl) return;
  figureEl.scrollIntoView({ block: "center" });
  figureEl.querySelector("button")?.focus({ preventScroll: true });
}
