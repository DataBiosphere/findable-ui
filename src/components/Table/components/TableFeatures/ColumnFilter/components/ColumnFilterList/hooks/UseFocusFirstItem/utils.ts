/**
 * Focuses the list's first enabled item, without scrolling the page.
 * @param list - The list element.
 */
export function focusFirstItem(list: HTMLElement | null): void {
  list
    ?.querySelector<HTMLElement>('[role="button"]:not([aria-disabled="true"])')
    ?.focus({ preventScroll: true });
}
