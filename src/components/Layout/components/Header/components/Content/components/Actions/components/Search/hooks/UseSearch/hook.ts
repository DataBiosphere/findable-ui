import { useCallback, useState } from "react";
import { UseSearchReturn } from "./types";

/**
 * Open/closed state for the header search bar.
 * The search term itself lives on the uncontrolled input and is read from the
 * form on submit, so it is not tracked here.
 * @returns search bar state and actions.
 */
export const useSearch = (): UseSearchReturn => {
  const [open, setOpen] = useState<boolean>(false);

  const onClose = useCallback((): void => setOpen(false), []);

  const onOpen = useCallback((): void => setOpen(true), []);

  return { onClose, onOpen, open };
};
