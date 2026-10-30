import type { PopperProps } from "@mui/material";

/**
 * Closes the panel on a click away from it, unless the click is on its trigger: the trigger toggles the panel itself.
 * @param event - Click away event.
 * @param anchorEl - The panel's trigger.
 * @param onClose - Function to close the panel.
 */
export function onClickAway(
  event: MouseEvent | TouchEvent,
  anchorEl: PopperProps["anchorEl"],
  onClose: () => void,
): void {
  if (
    anchorEl instanceof Element &&
    event.target instanceof Node &&
    anchorEl.contains(event.target)
  )
    return;
  onClose();
}
