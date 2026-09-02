import { useEffect, useEffectEvent } from "react";
import { UseCloseOnEscapeProps } from "./types";

/**
 * Closes an open surface when the Escape key is pressed.
 * The listener is attached once when `open` becomes true and removed on close.
 * `onClose` is wrapped in an effect event, so callers do not have to memoize
 * their handler and the listener always calls the latest one.
 *
 * Listens on the document in the capture phase and stops propagation, which
 * shields handlers bound below the document — e.g. a MUI `Modal`'s own Escape
 * handling — so the key does not also close an ancestor surface. Note this
 * swallows Escape app-wide while `open` is true, and does not prevent other
 * listeners bound to the document itself from running: two open consumers of
 * this hook will both close on a single Escape.
 * @param props - Hook props.
 * @param props.onClose - Function to call when the Escape key is pressed.
 * @param props.open - Whether the surface is open.
 */
export const useCloseOnEscape = ({
  onClose,
  open,
}: UseCloseOnEscapeProps): void => {
  const onEscape = useEffectEvent((): void => onClose());

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onEscape();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return (): void => {
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open]);
};
