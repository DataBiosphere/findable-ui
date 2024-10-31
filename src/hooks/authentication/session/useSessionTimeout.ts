import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useConfig } from "../../useConfig";
import { useLocation } from "../../useLocation";

export const INACTIVITY_PARAM = "inactivityTimeout";

interface UseSessionTimeout {
  clearSessionTimeout: () => void;
  isSessionTimeout: boolean;
}

/**
 * Session timeout hook.
 * @returns flag indicating if the session has timed out.
 */
export const useSessionTimeout = (): UseSessionTimeout => {
  const {
    config: { redirectRootToPath },
  } = useConfig();
  const [isSessionTimeout, setIsSessionTimeout] = useState<boolean>(false);
  // Get the session timeout from URL parameters.
  const { search } = useLocation() || {};
  const sessionTimeout = search?.get(INACTIVITY_PARAM);

  // Clears session timeout state.
  const clearSessionTimeout = useCallback((): void => {
    setIsSessionTimeout(false);
    Router.replace(redirectRootToPath);
  }, [redirectRootToPath]);

  useEffect(() => {
    setIsSessionTimeout(sessionTimeout === "true");
  }, [sessionTimeout]);

  return {
    clearSessionTimeout,
    isSessionTimeout,
  };
};
