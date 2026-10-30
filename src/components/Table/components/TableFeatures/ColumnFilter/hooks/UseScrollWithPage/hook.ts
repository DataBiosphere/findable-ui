import { useCallback, useEffect, useEffectEvent } from "react";
import type { UseScrollWithPage, UseScrollWithPageProps } from "./types";
import { closeAndRestoreFocus, isOutOfView, onScrollFrame } from "./utils";

/**
 * Lets the page scroll while the column filter menu is open; the menu needs `disableScrollLock`.
 * The menu moves with its button as the page scrolls, and closes once the button is out of view, including when it is under the header. A sticky button never leaves the view, so its menu stays open.
 * However the menu closes, focus returns to its button without scrolling the page.
 * @param props - Hook props.
 * @param props.anchorEl - The menu's button.
 * @param props.onClose - Function to close the menu.
 * @param props.open - Whether the menu is open.
 * @returns The menu's close handler.
 */
export const useScrollWithPage = ({
  anchorEl,
  onClose,
  open,
}: UseScrollWithPageProps): UseScrollWithPage => {
  const onMenuClose = useCallback(
    (): void => closeAndRestoreFocus(onClose, anchorEl),
    [anchorEl, onClose],
  );

  const onScrolled = useEffectEvent((): void => {
    if (isOutOfView(anchorEl)) onMenuClose();
  });

  useEffect(() => {
    if (!open) return;
    return onScrollFrame(() => onScrolled());
  }, [open]);

  return { onClose: onMenuClose };
};
