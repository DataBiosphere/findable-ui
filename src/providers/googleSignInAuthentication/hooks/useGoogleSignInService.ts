import Router from "next/router";
import { useCallback } from "react";
import { useProviders } from "../../../hooks/authentication/providers/useProviders";
import { Service } from "../../authentication/auth/types";
import { ProviderId } from "../../authentication/common/types";
import { SessionReducer } from "../common/types";
import { service } from "../service/service";

export const useGoogleSignInService = (reducer: SessionReducer): Service => {
  const { findProvider } = useProviders();
  const {
    authenticationReducer: { authenticationDispatch },
    credentialsReducer: { credentialsDispatch },
    tokenReducer: { tokenDispatch },
  } = reducer;

  const onLogin = useCallback(
    (providerId: ProviderId) => {
      const provider = findProvider(providerId);
      if (!provider) return;
      service.login(provider, { authenticationDispatch, tokenDispatch });
    },
    [authenticationDispatch, findProvider, tokenDispatch]
  );

  const onLogout = useCallback(
    (options?: { callbackUrl?: string }) => {
      service.logout({
        authenticationDispatch,
        credentialsDispatch,
        tokenDispatch,
      });
      if (!options?.callbackUrl) return;
      Router.push(options?.callbackUrl).catch((e) => console.error(e));
    },
    [authenticationDispatch, credentialsDispatch, tokenDispatch]
  );

  return { requestLogin: onLogin, requestLogout: onLogout };
};
