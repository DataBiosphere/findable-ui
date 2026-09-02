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
 * handling — so the key does not also close an ancestor surface. A surface that
 * does not trap focus should pass `containerRef`: Escape then belongs to
 * whatever the user is actually focused in, and is neither acted on nor
 * swallowed while focus sits elsewhere — including before the ref resolves.
 * Without it, Escape is swallowed app-wide while `open` is true.
 * @param props - Hook props.
 * @param props.containerRef - Limits Escape to when focus is inside this element.
 * @param props.onClose - Function to call when the Escape key is pressed.
 * @param props.open - Whether the surface is open.
 */
export const useCloseOnEscape = ({
  containerRef,
  onClose,
  open,
}: UseCloseOnEscapeProps): void => {
  const onEscape = useEffectEvent((): void => onClose());

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== "Escape") return;

      // Firefox and Safari report Escape with `isComposing` while an IME segment
      // is uncommitted, where the key cancels that segment rather than the
      // surface. MUI's Modal guards the same case via `which === 229`.
      if (e.isComposing || e.keyCode === 229) return;

      // An unresolved ref is treated as out of scope, not as absent: falling
      // through here would swallow Escape app-wide, which is what containerRef
      // exists to prevent.
      if (
        containerRef &&
        !containerRef.current?.contains(document.activeElement)
      )
        return;

      e.stopPropagation();
      onEscape();
    };

    document.addEventListener("keydown", onKeyDown, true);
    return (): void => {
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [containerRef, open]);
};
