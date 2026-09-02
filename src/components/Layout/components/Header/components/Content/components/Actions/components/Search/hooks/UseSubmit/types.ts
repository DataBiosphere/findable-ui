import { FormEvent } from "react";

export interface UseSubmitProps {
  closeMenu: () => void;
  onClose: () => void;
  searchURL?: string;
}

export interface UseSubmitReturn {
  onSubmit: (e: FormEvent<HTMLFormElement>, searchTerm: string) => void;
}
