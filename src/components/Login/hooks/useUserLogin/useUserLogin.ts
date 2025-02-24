import { useCallback } from "react";
import { useAuth } from "../../../../providers/authentication/auth/hook";
import { ProviderId } from "../../../../providers/authentication/common/types";
import { useUserConsent } from "../useUserConsent/useUserConsent";
import { UseUserLogin } from "./types";

export const useUserLogin = (): UseUserLogin => {
  const { service: { requestLogin } = {} } = useAuth();
  const { handleConsent, handleError, state: consentState } = useUserConsent();
  const { isDisabled, isError, isValid } = consentState; // Consent state: { isValid } is an indicator of whether the user has accepted the login terms.

  const handleLogin = useCallback(
    (providerId: ProviderId): void => {
      if (!isDisabled && !isValid) {
        // If the user has not accepted terms, set error state to true.
        handleError(true);
        return;
      }
      requestLogin?.(providerId);
    },
    [handleError, isDisabled, isValid, requestLogin]
  );

  return {
    consentState: { isDisabled, isError },
    handleConsent,
    handleLogin,
  };
};
