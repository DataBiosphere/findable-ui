import { SignOutParams } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Service } from "../../auth/types/auth";
import { ProviderId } from "../../auth/types/common";
import {
  getQueryCallbackUrl,
  transformRoute,
} from "../../hooks/authentication/session/useSessionActive";
import { useRouteHistory } from "../../hooks/useRouteHistory";
import { service } from "../service";
import { resolveLogoutOptions } from "./utils";

/**
 * NextAuth service hook.
 * @param logoutCallbackUrl - When set, `requestLogout()` defaults to a
 *   navigation-driven sign-out (`signOut({ redirect: true, callbackUrl })`)
 *   so Next middleware re-runs. Callers can still override per-call via
 *   `options`.
 * @returns auth service.
 */
export const useNextAuthService = (logoutCallbackUrl?: string): Service => {
  const { query } = useRouter();
  const { callbackUrl } = useRouteHistory(2);
  const queryCallbackUrl = getQueryCallbackUrl(query.callbackUrl);

  const onLogin = useCallback(
    (providerId: ProviderId) => {
      service.login(providerId, {
        callbackUrl: queryCallbackUrl ?? callbackUrl(transformRoute),
      });
    },
    [callbackUrl, queryCallbackUrl],
  );

  const onLogout = useCallback(
    (options?: SignOutParams<boolean>) => {
      service.logout(resolveLogoutOptions(options, logoutCallbackUrl));
    },
    [logoutCallbackUrl],
  );

  return { requestLogin: onLogin, requestLogout: onLogout };
};
