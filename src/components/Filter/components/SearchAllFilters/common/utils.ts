/**
 * Sets overflow style for the given list of elements.
 * @param elements - Elements.
 * @param overflowStyle - Overflow style value.
 */
export function setElementsOverflowStyle(
  elements: (HTMLElement | null)[],
  overflowStyle: string,
): void {
  for (const element of elements) {
    if (element) {
      element.style.overflow = overflowStyle;
    }
  }
}
