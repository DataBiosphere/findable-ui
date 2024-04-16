import { useEffect, useState } from "react";
import { useAuthenticationConfig } from "../useAuthenticationConfig";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO see https://github.com/clevercanary/data-browser/issues/544.
declare const google: any;

// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO see https://github.com/clevercanary/data-browser/issues/544.
type TokenClient = any;

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  token_type: string;
}

export interface UseTokenClient {
  token: string | undefined;
  tokenClient: TokenClient | undefined;
}

/**
 * Initializes the token client, sets token from token client callback.
 * @returns initialized token client.
 */
export const useTokenClient = (): UseTokenClient => {
  const [token, setToken] = useState<string>();
  const [tokenClient, setTokenClient] = useState<TokenClient>();
  const authenticationConfig = useAuthenticationConfig();
  const { googleGISAuthConfig: { clientId, scope } = {} } =
    authenticationConfig;

  // Initializes token client - (authorization client id must be configured).
  useEffect(() => {
    if (clientId) {
      setTokenClient(
        google.accounts.oauth2.initTokenClient({
          callback: (tokenResponse: TokenResponse) => {
            const access_token = tokenResponse.access_token;
            setToken(access_token);
          },
          client_id: clientId,
          scope,
        })
      );
    }
  }, [clientId, scope]);

  return {
    token,
    tokenClient,
  };
};
