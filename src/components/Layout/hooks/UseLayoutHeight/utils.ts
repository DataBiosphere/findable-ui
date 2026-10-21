import type { CSSPropHyphen } from "../../../../hooks/useHtmlStyle/types";
import { getBorderBoxSizeHeight } from "../../../../hooks/useResizeObserver";

/**
 * Observes an element's border-box height and writes it to a custom property on
 * the HTML element on every resize.
 * @param element - Element to measure; nothing is observed when null, or where ResizeObserver is unavailable.
 * @param property - Custom property to set.
 * @param onMeasure - Called with true once the element has been measured.
 * @returns Cleanup that stops observing and removes the property.
 */
export function observeHeight(
  element: HTMLElement | null,
  property: CSSPropHyphen,
  onMeasure: (isMeasured: boolean) => void,
): (() => void) | undefined {
  if (!element || typeof ResizeObserver === "undefined") return;
  const root = document.documentElement;
  const observer = new ResizeObserver((entries) => {
    const { height = 0 } = getBorderBoxSizeHeight(entries);
    root.style.setProperty(property, `${height}px`);
    onMeasure(true);
  });
  observer.observe(element);
  return (): void => {
    observer.disconnect();
    root.style.removeProperty(property);
  };
}
