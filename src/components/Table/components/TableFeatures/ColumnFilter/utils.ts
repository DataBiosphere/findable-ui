import type { PopperProps } from "@mui/material";

/**
 * Closes the panel and returns focus to its button, without scrolling the page.
 * @param onClose - Function to close the panel.
 * @param anchorEl - The panel's button.
 */
export function closeAndRestoreFocus(
  onClose: () => void,
  anchorEl: PopperProps["anchorEl"],
): void {
  onClose();
  if (anchorEl instanceof HTMLElement) anchorEl.focus({ preventScroll: true });
}

/**
 * Returns an updater function for column filter.
 * @param value - Value.
 * @returns An updater function that returns the new filter value.
 */
export function updater(
  value: unknown,
): (old: unknown[] | undefined) => unknown[] | undefined {
  return (old: unknown[] | undefined) => {
    // If no old value, return new value.
    if (!old) return [value];

    // If value already exists, remove it.
    if (old.includes(value)) {
      // Filter out the value.
      const next = old.filter((v) => v !== value);

      // If no values remain, return undefined.
      if (next.length === 0) return undefined;

      return next;
    }

    // Otherwise, add the value.
    return [...old, value];
  };
}
