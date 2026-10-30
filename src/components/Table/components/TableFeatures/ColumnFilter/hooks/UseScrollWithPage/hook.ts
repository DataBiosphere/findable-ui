import { useCallback, useEffect, useEffectEvent, useState } from "react";
import { onScrollFrame } from "../../../../../../../utils/scrollFrame";
import type { UseScrollWithPage, UseScrollWithPageProps } from "./types";
import { closeAndRestoreFocus, isOutOfView } from "./utils";

/**
 * Lets the page scroll while the column filter menu is open; the menu needs `disableScrollLock`.
 * The menu moves with its button as the page scrolls, and closes once the button is out of view, including when it is under the header. A sticky button never leaves the view, so its menu stays open.
 * However the menu closes, focus returns to its button without scrolling the page.
 * The menu keeps its last button as its anchor after closing: the page may still be scrolling during the menu's exit transition, and MUI would otherwise reposition the closing menu against the document body.
 * @param props - Hook props.
 * @param props.anchorEl - The menu's button.
 * @param props.onClose - Function to close the menu.
 * @param props.open - Whether the menu is open.
 * @returns The menu's anchor element and close handler.
 */
export const useScrollWithPage = ({
  anchorEl,
  onClose,
  open,
}: UseScrollWithPageProps): UseScrollWithPage => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(anchorEl);

  // Holds on to the last button, so the menu stays anchored to it while it closes.
  if (anchorEl && anchorEl !== menuAnchorEl) setMenuAnchorEl(anchorEl);

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

  return { menuAnchorEl, onClose: onMenuClose };
};
