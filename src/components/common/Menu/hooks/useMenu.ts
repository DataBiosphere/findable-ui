import { MouseEvent, useCallback, useId, useMemo, useState } from "react";

export interface UseMenu<E extends HTMLElement> {
  anchorEl: E | null;
  /**
   * Per-instance DOM id for the surface this menu opens, for the trigger's
   * `aria-controls` to target. Generated here because every caller needs one
   * and a module-level constant would collide wherever two menus are mounted
   * at once.
   */
  id: string;
  onClose: () => void;
  onDisableScrollLock: () => void;
  onEnableScrollLock: () => void;
  onOpen: (event: MouseEvent<E>) => void;
  onToggleOpen: (event: MouseEvent<E>) => void;
  open: boolean;
}

/**
 * Menu functionality for menu dropdown, with menu position.
 * @returns menu functionality.
 */
export const useMenu = <E extends HTMLElement>(): UseMenu<E> => {
  const [anchorEl, setAnchorEl] = useState<E | null>(null);
  const id = useId();
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

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
    id,
    onClose,
    onDisableScrollLock,
    onEnableScrollLock,
    onOpen,
    onToggleOpen,
    open,
  };
};
