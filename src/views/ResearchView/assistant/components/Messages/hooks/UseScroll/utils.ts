/**
 * Scrolls a container to its bottom.
 * @param container - Scrollable element.
 * @param behavior - Scroll behavior (instant or smooth).
 * @returns void.
 */
export function scrollToBottom(
  container: HTMLElement,
  behavior: ScrollBehavior,
): void {
  container.scrollTo({ behavior, top: container.scrollHeight });
}
