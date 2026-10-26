import type { FocusEvent, FocusEventHandler, RefObject } from "react";

/**
 * How long after focus a browser's own focus scroll (Safari's comes after the
 * focus event) is undone.
 */
const RESTORE_WINDOW_MS = 100;

/**
 * Returns true if the element's top is inside the page's scroll-padding-top,
 * where focusing it makes the browser scroll the page to clear the padding.
 * @param element - Element to check.
 * @returns True if the element's top is inside the scroll padding.
 */
export function isInScrollPadding(element: Element): boolean {
  const { scrollPaddingTop } = window.getComputedStyle(
    document.documentElement,
  );
  return (
    element.getBoundingClientRect().top < (parseFloat(scrollPaddingTop) || 0)
  );
}

/**
 * Puts the page back where it was before a focus scroll, now and on the next
 * scroll within the restore window. Does nothing for an element below the
 * page's scroll-padding-top (e.g. the dictionary's search box below 1024px),
 * so the browser's own focus scrolling, such as Safari lifting a tapped input
 * above the on-screen keyboard, is left alone.
 * @param element - Focused element.
 * @param scrollY - Page scroll position before the focus scroll.
 */
export function keepScroll(element: Element, scrollY: number): void {
  if (!isInScrollPadding(element)) return;
  const restore = (): void => restoreScroll(element, scrollY);
  restore();
  window.addEventListener("scroll", restore, { once: true, passive: true });
  window.setTimeout(
    () => window.removeEventListener("scroll", restore),
    RESTORE_WINDOW_MS,
  );
}

/**
 * Handles the input's focus: keeps the page scroll, then calls the input's own
 * handler.
 * @param event - Focus event.
 * @param scrollY - Page scroll position as of the last scroll event.
 * @param onFocus - The input's own focus handler.
 */
export function onFocusKeepScroll(
  event: FocusEvent<HTMLElement>,
  scrollY: number,
  onFocus?: FocusEventHandler<HTMLElement>,
): void {
  keepScroll(event.target, scrollY);
  onFocus?.(event);
}

/**
 * Scrolls the page back to the given position if the element is pinned, i.e.
 * it stays put in the window as the page scrolls. An element that scrolls with
 * the page (e.g. the dictionary's search box below 1024px, where the filters
 * aren't sticky) keeps the browser's scroll, which brings it into view.
 * @param element - Focused element.
 * @param scrollY - Page scroll position to go back to.
 */
export function restoreScroll(element: Element, scrollY: number): void {
  const current = window.scrollY;
  if (current === scrollY) return;
  const top = element.getBoundingClientRect().top;
  window.scrollTo({ behavior: "instant", top: scrollY });
  if (Math.abs(element.getBoundingClientRect().top - top) < 1) return;
  window.scrollTo({ behavior: "instant", top: current });
}

/**
 * Keeps the ref at the page's scroll position, as of the last scroll event.
 * @param scrollYRef - Ref to update.
 * @returns Cleanup that stops tracking.
 */
export function trackScrollY(scrollYRef: RefObject<number>): () => void {
  const onScroll = (): void => {
    scrollYRef.current = window.scrollY;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return (): void => window.removeEventListener("scroll", onScroll);
}
