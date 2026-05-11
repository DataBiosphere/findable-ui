import { useEffect, useRef } from "react";
import { AUTH_STATUS } from "../../auth/types/auth";
import { track } from "../../common/analytics/analytics";
import { EVENT_NAME, EVENT_PARAM } from "../../common/analytics/entities";
import { GOOGLE_SIGN_IN_PROVIDER_ID } from "../../google/constants";

/**
 * Tracks a GA4 login event when the user transitions from unauthenticated to authenticated.
 * Does not fire during initial session hydration or on mount if already authenticated.
 * @param isAuthenticated - Current authentication state.
 * @param status - Current auth status; tracking only begins after status has settled.
 * @returns void.
 */
export function useLoginTracking(
  isAuthenticated: boolean,
  status: AUTH_STATUS,
): void {
  const wasAuthenticated = useRef<boolean | undefined>(undefined);
  useEffect(() => {
    if (status !== AUTH_STATUS.SETTLED) return;
    if (wasAuthenticated.current === false && isAuthenticated) {
      track(EVENT_NAME.LOGIN, {
        [EVENT_PARAM.TOOL_NAME]: GOOGLE_SIGN_IN_PROVIDER_ID,
      });
    }
    wasAuthenticated.current = isAuthenticated;
  }, [isAuthenticated, status]);
}
