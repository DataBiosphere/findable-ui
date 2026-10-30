import { PROPERTY } from "../../../../../../../hooks/useHtmlStyle/constants";

/**
 * Closes the menu and returns focus to its button.
 * @param onClose - Function to close the menu.
 * @param anchorEl - The menu's button.
 */
export function closeAndRestoreFocus(
  onClose: () => void,
  anchorEl: HTMLElement | null,
): void {
  onClose();
  restoreFocus(anchorEl);
}

/**
 * Returns the measured header height, or 0 when the header has not been measured.
 * @returns The header height in pixels.
 */
function getHeaderHeight(): number {
  const height = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      PROPERTY.HEADER_HEIGHT,
    ),
  );
  return Number.isNaN(height) ? 0 : height;
}

/**
 * Returns true when the element is missing or lies wholly outside the viewport below the header; an element under the header is hidden by it.
 * @param element - Element to check.
 * @returns True if no part of the element is in view.
 */
export function isOutOfView(element: Element | null): boolean {
  if (!element) return true;
  const { bottom, left, right, top } = element.getBoundingClientRect();
  return (
    bottom <= getHeaderHeight() ||
    left >= window.innerWidth ||
    right <= 0 ||
    top >= window.innerHeight
  );
}

/**
 * Calls the function on the animation frame after each page scroll, at most once a frame.
 * The frame wait lets the page settle first: MUI's own scroll listener, which moves the menu, may run after this one.
 * @param onFrame - Function to call after the page scrolls.
 * @returns A function removing the listener and any pending frame.
 */
export function onScrollFrame(onFrame: () => void): () => void {
  let frame = 0;
  const listener = (): void => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(onFrame);
  };
  window.addEventListener("scroll", listener, { passive: true });
  return (): void => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", listener);
  };
}

/**
 * Focuses the element once the menu has closed, without scrolling it into view.
 * Focus waits a frame: until the menu re-renders closed, its focus trap would pull focus back in.
 * Scrolling is prevented because the browser would otherwise scroll a button pinned within the page's `scroll-padding-top`, making the page jump.
 * @param element - Element to focus.
 */
export function restoreFocus(element: HTMLElement | null): void {
  requestAnimationFrame(() => element?.focus({ preventScroll: true }));
}
