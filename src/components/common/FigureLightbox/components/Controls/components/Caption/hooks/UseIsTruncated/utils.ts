/**
 * Returns whether an element's content overflows it vertically, e.g. text cut off by a line clamp.
 * @param element - Element.
 * @returns True if the content is taller than the element.
 */
export function isTruncated(element: HTMLElement | null): boolean {
  if (!element) return false;
  return element.scrollHeight > element.clientHeight + 1;
}
