import { ChangeEvent, useCallback, useState } from "react";
import { useAuthenticationConfig } from "../../../../hooks/authentication/config/useAuthenticationConfig";
import { UseUserConsent } from "./types";

export const useUserConsent = (): UseUserConsent => {
  const authConfig = useAuthenticationConfig();
  const [isDisabled] = useState<boolean>(Boolean(!authConfig?.termsOfService));
  const [isError, setIsError] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleError = useCallback((error: boolean) => {
    setIsError(error);
  }, []);

  const handleConsent = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>): void => {
      handleError(false);
      setIsValid(changeEvent.target.checked);
    },
    [handleError]
  );

  return {
    handleConsent,
    handleError,
    state: {
      isDisabled,
      isError,
      isValid,
    },
  };
};
