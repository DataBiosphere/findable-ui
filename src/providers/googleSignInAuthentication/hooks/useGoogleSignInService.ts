import { useRouter } from "next/router";
import { useCallback } from "react";
import { useProviders } from "../../../hooks/authentication/providers/useProviders";
import { Service } from "../../authentication/auth/types";
import { ProviderId } from "../../authentication/common/types";
import { SessionReducer } from "../common/types";
import { service } from "../service/service";

export const useGoogleSignInService = (reducer: SessionReducer): Service => {
  const { findProvider } = useProviders();
  const { basePath } = useRouter();
  const {
    authenticationReducer: { authenticationDispatch },
    authReducer: { authDispatch },
    credentialsReducer: { credentialsDispatch },
    tokenReducer: { tokenDispatch },
  } = reducer;

  const onLogin = useCallback(
    (providerId: ProviderId) => {
      const provider = findProvider(providerId);
      if (!provider) return;
      service.login(provider, {
        authDispatch,
        authenticationDispatch,
        tokenDispatch,
      });
    },
    [authDispatch, authenticationDispatch, findProvider, tokenDispatch],
  );

  const onLogout = useCallback(
    (options?: { callbackUrl?: string }) => {
      service.logout({
        authDispatch,
        authenticationDispatch,
        credentialsDispatch,
        tokenDispatch,
      });
      // Request page reload, ensuring that the entity detail page is re-initialized with the correct state and associated data.
      location.href = options?.callbackUrl || basePath;
    },
    [
      authDispatch,
      authenticationDispatch,
      basePath,
      credentialsDispatch,
      tokenDispatch,
    ],
  );

  return { requestLogin: onLogin, requestLogout: onLogout };
};
