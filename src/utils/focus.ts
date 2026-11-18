import type { PopperProps } from "@mui/material";

/**
 * Closes a popup surface, such as a menu or a panel, and returns focus to the element that opened it, without scrolling the page.
 * @param onClose - Function to close the surface.
 * @param anchorEl - The element that opened the surface; focus is only returned to an HTML element.
 */
export function closeAndRestoreFocus(
  onClose: () => void,
  anchorEl: PopperProps["anchorEl"],
): void {
  onClose();
  if (anchorEl instanceof HTMLElement) anchorEl.focus({ preventScroll: true });
}
