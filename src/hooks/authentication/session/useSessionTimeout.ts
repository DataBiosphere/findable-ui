import { useSearchParams } from "next/navigation";
import Router from "next/router";
import { useCallback, useState } from "react";
import { useConfig } from "../../useConfig";

export const INACTIVITY_PARAM = "inactivityTimeout";

interface UseSessionTimeout {
  clearSessionTimeout: () => void;
  isSessionTimeout: boolean;
}

/**
 * Session timeout hook.
 *
 * Sticky semantics: when the URL param `inactivityTimeout=true` is seen, the
 * banner state flips to `true` and stays there. Unrelated navigations that
 * happen to drop the URL param (e.g. another component calling
 * `Router.replace`) do NOT auto-dismiss the banner. Only an explicit
 * `clearSessionTimeout` call resets the state to `false`.
 * @returns flag indicating if the session has timed out, plus a clear fn.
 */
export const useSessionTimeout = (): UseSessionTimeout => {
  const {
    config: { redirectRootToPath },
  } = useConfig();
  const searchParams = useSearchParams();
  const sessionTimeout = searchParams?.get(INACTIVITY_PARAM);

  const [isSessionTimeout, setIsSessionTimeout] = useState<boolean>(
    sessionTimeout === "true",
  );
  const [prevSessionTimeout, setPrevSessionTimeout] = useState<
    string | null | undefined
  >(sessionTimeout);

  // Adjust-during-render: when the URL param transitions to "true", flip
  // state on. We deliberately don't flip state off when the param goes
  // away — see "sticky semantics" in the hook doc above.
  if (sessionTimeout !== prevSessionTimeout) {
    setPrevSessionTimeout(sessionTimeout);
    if (sessionTimeout === "true") {
      setIsSessionTimeout(true);
    }
  }

  const clearSessionTimeout = useCallback((): void => {
    setIsSessionTimeout(false);
    Router.replace(redirectRootToPath);
  }, [redirectRootToPath]);

  return {
    clearSessionTimeout,
    isSessionTimeout,
  };
};
