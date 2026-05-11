import { useEffect, useRef } from "react";
import { track } from "../../common/analytics/analytics";
import { EVENT_NAME, EVENT_PARAM } from "../../common/analytics/entities";

/**
 * Tracks a GA4 login event when the user transitions from unauthenticated to authenticated.
 * Does not fire on initial mount if the user is already authenticated.
 * @param isAuthenticated - Current authentication state.
 * @returns void.
 */
export function useLoginTracking(isAuthenticated: boolean): void {
  const wasAuthenticated = useRef<boolean | undefined>(undefined);
  useEffect(() => {
    if (wasAuthenticated.current === false && isAuthenticated) {
      track(EVENT_NAME.LOGIN, { [EVENT_PARAM.METHOD]: "google" });
    }
    wasAuthenticated.current = isAuthenticated;
  }, [isAuthenticated]);
}
