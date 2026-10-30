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
 * Returns true when the element is missing, has reached the header, or lies wholly outside the viewport.
 * An element counts as gone once its top edge reaches the header, so the menu below it closes before it can pass under, or over, the header.
 * @param element - Element to check.
 * @returns True if the element is out of view.
 */
export function isOutOfView(element: Element | null): boolean {
  if (!element) return true;
  const { bottom, left, right, top } = element.getBoundingClientRect();
  return (
    top < getHeaderHeight() ||
    bottom <= 0 ||
    left >= window.innerWidth ||
    right <= 0 ||
    top >= window.innerHeight
  );
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
