import type { FormEvent } from "react";

/**
 * Options for the useSubmit hook.
 */
export interface UseSubmitProps {
  closeMenu: () => void;
  onClose: () => void;
  searchURL?: string;
}

/**
 * Return type for the useSubmit hook.
 */
export interface UseSubmitReturn {
  onSubmit: (e: FormEvent<HTMLFormElement>, searchTerm: string) => void;
}
