import { useCallback } from "react";
import { ProviderId } from "../../../../auth/types/common";
import { useRequestLogin } from "../useRequestLogin/useRequestLogin";
import { useUserConsent } from "../useUserConsent/useUserConsent";
import { UseUserLogin } from "./types";

export const useUserLogin = (): UseUserLogin => {
  const { submit, submittingProviderId } = useRequestLogin();
  const { handleConsent, handleError, state: consentState } = useUserConsent();
  const { isDisabled, isError, isValid } = consentState; // Consent state: { isValid } is an indicator of whether the user has accepted the login terms.

  const handleLogin = useCallback(
    (providerId: ProviderId): void => {
      if (!isDisabled && !isValid) {
        // If the user has not accepted terms, set error state to true.
        handleError(true);
        return;
      }
      submit(providerId); // Shared guard prevents double-submit and tracks the in-flight provider.
    },
    [handleError, isDisabled, isValid, submit],
  );

  return {
    consentState: { isDisabled, isError },
    handleConsent,
    handleLogin,
    submittingProviderId,
  };
};
