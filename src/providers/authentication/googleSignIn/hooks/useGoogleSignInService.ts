import Router from "next/router";
import { useCallback } from "react";
import { useProviders } from "../../../../hooks/authentication/providers/useProviders";
import { Service } from "../../auth/types";
import { ProviderId } from "../../common/types";
import { SessionReducer } from "../common/types";
import { service } from "../service/service";

export const useGoogleSignInService = (reducer: SessionReducer): Service => {
  const { findProvider } = useProviders();
  const {
    authenticationReducer: { authenticationDispatch },
    authorizationReducer: { authorizationDispatch },
    credentialsReducer: { credentialsDispatch },
    tokenReducer: { tokenDispatch },
  } = reducer;

  const onLogin = useCallback(
    (providerId: ProviderId) => {
      const provider = findProvider(providerId);
      if (!provider) return;
      service.login(provider, {
        authenticationDispatch,
        authorizationDispatch,
        tokenDispatch,
      });
    },
    [authenticationDispatch, authorizationDispatch, findProvider, tokenDispatch]
  );

  const onLogout = useCallback(
    (options?: { callbackUrl?: string }) => {
      service.logout({
        authenticationDispatch,
        authorizationDispatch,
        credentialsDispatch,
        tokenDispatch,
      });
      if (!options?.callbackUrl) return;
      Router.push(options?.callbackUrl).catch((e) => console.error(e));
    },
    [
      authenticationDispatch,
      authorizationDispatch,
      credentialsDispatch,
      tokenDispatch,
    ]
  );

  return { requestLogin: onLogin, requestLogout: onLogout };
};
