import { MenuProps as MMenuProps } from "@mui/material";
import { MouseEvent, useCallback, useMemo, useState } from "react";

export interface UseMenu {
  anchorEl: MMenuProps["anchorEl"];
  onClose: () => void;
  onOpen: (event: MouseEvent<HTMLElement>) => void;
  onToggleOpen: (event: MouseEvent<HTMLElement>) => void;
  open: boolean;
}

/**
 * Menu functionality for menu dropdown, with menu position.
 * @returns menu functionality.
 */
export const useMenu = (): UseMenu => {
  const [anchorEl, setAnchorEl] = useState<MMenuProps["anchorEl"]>(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  // Closes menu.
  const onClose = useCallback((): void => {
    setAnchorEl(null);
  }, []);

  // Opens menu.
  const onOpen = useCallback((event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  }, []);

  // Toggles menu open/close.
  const onToggleOpen = useCallback(
    (event: MouseEvent<HTMLElement>): void => {
      if (open) {
        setAnchorEl(null);
      } else {
        setAnchorEl(event.currentTarget);
      }
    },
    [open]
  );

  return {
    anchorEl,
    onClose,
    onOpen,
    onToggleOpen,
    open,
  };
};
