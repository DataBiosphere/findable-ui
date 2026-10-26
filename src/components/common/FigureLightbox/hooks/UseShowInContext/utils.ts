import type { LightboxFigureItem } from "../../types";

/**
 * Scrolls a figure into view and focuses its expand button. The figure is centred in the viewport, or aligned to its top if it is taller than the viewport, so its top isn't cut off.
 * Scrolling honours the page's scroll-padding-top (which clears the sticky header) and the figure's scroll-margin-top, so the figure counts as tall when it doesn't fit the space they leave.
 * @param figure - Figure to show.
 */
export function showFigure(figure: LightboxFigureItem): void {
  const figureEl = figure.figureRef.current;
  if (!figureEl) return;
  // Room above the figure that scrolling leaves clear: the page's scroll-padding-top (the sticky header) plus the figure's own scroll-margin-top.
  const scrollPaddingTop =
    parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
    0;
  const scrollMarginTop =
    parseFloat(getComputedStyle(figureEl).scrollMarginTop) || 0;
  const isTall =
    figureEl.getBoundingClientRect().height >
    window.innerHeight - scrollPaddingTop - scrollMarginTop;
  figureEl.scrollIntoView({ block: isTall ? "start" : "center" });
  figureEl.querySelector("button")?.focus({ preventScroll: true });
}
