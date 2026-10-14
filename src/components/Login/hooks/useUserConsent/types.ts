import { ChangeEvent } from "react";

/**
 * Return value of the useUserConsent hook.
 */
export interface UseUserConsent {
  handleConsent: (e: ChangeEvent<HTMLInputElement>) => void;
  handleError: (error: boolean) => void;
  state: {
    isDisabled: boolean;
    isError: boolean;
    isValid: boolean;
  };
}
