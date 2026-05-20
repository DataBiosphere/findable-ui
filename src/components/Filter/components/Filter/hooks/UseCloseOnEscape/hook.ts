import { useEffect } from "react";
import { UseCloseOnEscapeProps } from "./types";

/**
 * Closes the popper, and any ancestor drawer, when the Escape key is pressed.
 * @param props - Hook props.
 * @param props.onClose - Function to call when the Escape key is pressed.
 * @param props.open - Whether the popper is open.
 */
export const useCloseOnEscape = ({
  onClose,
  open,
}: UseCloseOnEscapeProps): void => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return (): void => {
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [onClose, open]);
};
