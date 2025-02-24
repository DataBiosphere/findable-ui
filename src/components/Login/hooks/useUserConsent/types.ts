import { ChangeEvent } from "react";

export interface UseUserConsent {
  handleConsent: (e: ChangeEvent<HTMLInputElement>) => void;
  handleError: (error: boolean) => void;
  state: {
    isDisabled: boolean;
    isError: boolean;
    isValid: boolean;
  };
}
