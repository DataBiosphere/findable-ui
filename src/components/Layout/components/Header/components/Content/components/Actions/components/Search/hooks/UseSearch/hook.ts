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

  // The trigger is a disclosure button, so it toggles rather than only opening.
  // Closing here is deliberately idempotent with the click-away that follows the
  // same click, rather than relying on the two firing in a particular order.
  const onToggle = useCallback((): void => setOpen((open) => !open), []);

  return { onClose, onToggle, open };
};
