import { useCallback, useState } from "react";

export interface UseDialog {
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
}

/**
 * Dialog functionality.
 * @param isOpen - Open state (initial).
 * @returns dialog functionality.
 */
export const useDialog = (isOpen = false): UseDialog => {
  const [open, setOpen] = useState<boolean>(isOpen);

  // Closes dialog.
  const onClose = useCallback((): void => {
    setOpen(false);
  }, []);

  // Opens dialog
  const onOpen = useCallback((): void => {
    setOpen(true);
  }, []);

  return { onClose, onOpen, open };
};
