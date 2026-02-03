import { useCallback } from "react";
import { Service } from "../../auth/types/auth";
import { ProviderId } from "../../auth/types/common";
import { transformRoute } from "../../hooks/authentication/session/useSessionActive";
import { useRouteHistory } from "../../hooks/useRouteHistory";
import { service } from "../service";

/**
 * NextAuth service hook.
 * @returns auth service.
 */
export const useNextAuthService = (): Service => {
  const { callbackUrl } = useRouteHistory(2);

  const onLogin = useCallback(
    (providerId: ProviderId) => {
      service.login(providerId, { callbackUrl: callbackUrl(transformRoute) });
    },
    [callbackUrl],
  );

  const onLogout = useCallback(
    (options?: { callbackUrl?: string; redirect?: boolean }) => {
      service.logout(options);
    },
    [],
  );

  return { requestLogin: onLogin, requestLogout: onLogout };
};
