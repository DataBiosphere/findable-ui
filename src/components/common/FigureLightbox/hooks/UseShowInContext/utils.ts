import type { LightboxFigureItem } from "../../types";

/**
 * Scrolls a figure into view and focuses its expand button. The figure is centred in the viewport, or aligned to its top if it is taller than the viewport, so its top isn't cut off.
 * Scrolling honours the figure's scroll-margin-top, which a site with a fixed header can set.
 * @param figure - Figure to show.
 */
export function showFigure(figure: LightboxFigureItem): void {
  const figureEl = figure.figureRef.current;
  if (!figureEl) return;
  // Room above the figure that scrolling leaves clear, e.g. for a fixed header.
  const scrollMarginTop =
    parseFloat(getComputedStyle(figureEl).scrollMarginTop) || 0;
  const isTall =
    figureEl.getBoundingClientRect().height >
    window.innerHeight - scrollMarginTop;
  figureEl.scrollIntoView({ block: isTall ? "start" : "center" });
  figureEl.querySelector("button")?.focus({ preventScroll: true });
}
