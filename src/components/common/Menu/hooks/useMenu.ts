import { MenuProps } from "@mui/material";
import { MouseEvent, useCallback, useId, useMemo, useState } from "react";
import {
  getMenuSlotProps,
  getPopupAriaProps,
  HAS_POPUP,
  PopupAriaProps,
} from "../../../../utils/ariaPopup";

export interface UseMenu<E extends HTMLElement> {
  anchorEl: E | null;
  /**
   * Returns `slotProps` for the menu with its id on the `role="menu"` list,
   * merged beneath any given bases so a default's or caller's list props
   * survive. Spread the result onto the menu's `slotProps`; see
   * `getMenuSlotProps` for why the id has to live on the list.
   */
  getSlotProps: (
    ...bases: (MenuProps["slotProps"] | undefined)[]
  ) => MenuProps["slotProps"];
  /**
   * Per-instance DOM id for the surface this menu opens, for the trigger's
   * `aria-controls` to target. Generated here because every caller needs one
   * and a module-level constant would collide wherever two menus are mounted
   * at once. Most callers want `triggerProps` and `getSlotProps` instead; the
   * id is exposed for surfaces that are not a MUI `Menu`.
   */
  id: string;
  onClose: () => void;
  onDisableScrollLock: () => void;
  onEnableScrollLock: () => void;
  onOpen: (event: MouseEvent<E>) => void;
  onToggleOpen: (event: MouseEvent<E>) => void;
  open: boolean;
  /**
   * ARIA props for the control that opens the menu: that it opens a menu,
   * whether that menu is open, and — while open — the menu's id. Spread onto
   * the trigger.
   */
  triggerProps: PopupAriaProps;
}

/**
 * Menu functionality for menu dropdown, with menu position.
 * @returns menu functionality.
 */
export const useMenu = <E extends HTMLElement>(): UseMenu<E> => {
  const [anchorEl, setAnchorEl] = useState<E | null>(null);
  const id = useId();
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const triggerProps = useMemo(
    () => getPopupAriaProps({ hasPopup: HAS_POPUP.MENU, id, open }),
    [id, open],
  );

  const getSlotProps = useCallback(
    (...bases: (MenuProps["slotProps"] | undefined)[]) =>
      getMenuSlotProps(id, ...bases),
    [id],
  );

  // Closes menu.
  const onClose = useCallback((): void => {
    setAnchorEl(null);
  }, []);

  // Disables scroll lock.
  const onDisableScrollLock = useCallback((): void => {
    document.body.style.removeProperty("overflow");
  }, []);

  // Enables scroll lock.
  const onEnableScrollLock = useCallback((): void => {
    document.body.style.setProperty("overflow", "hidden");
  }, []);

  // Opens menu.
  const onOpen = useCallback((event: MouseEvent<E>): void => {
    setAnchorEl(event.currentTarget);
  }, []);

  // Toggles menu open/close.
  const onToggleOpen = useCallback(
    (event: MouseEvent<E>): void => {
      if (open) {
        setAnchorEl(null);
      } else {
        setAnchorEl(event.currentTarget);
      }
    },
    [open],
  );

  return {
    anchorEl,
    getSlotProps,
    id,
    onClose,
    onDisableScrollLock,
    onEnableScrollLock,
    onOpen,
    onToggleOpen,
    open,
    triggerProps,
  };
};
