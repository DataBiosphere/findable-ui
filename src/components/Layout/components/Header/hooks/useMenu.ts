import { useCallback, useState } from "react";

export interface UseMenu {
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
}

/**
 * Menu functionality for menu dropdown.
 * @returns menu functionality.
 */
export const useMenu = (): UseMenu => {
  const [open, setOpen] = useState<boolean>(false);

  // Closes menu.
  const onClose = useCallback((): void => {
    setOpen(false);
  }, []);

  // Opens menu.
  const onOpen = useCallback((): void => {
    setOpen(true);
  }, []);

  return { onClose, onOpen, open };
};
