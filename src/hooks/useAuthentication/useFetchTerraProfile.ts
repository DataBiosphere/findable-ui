import { useCallback, useEffect, useState } from "react";
import { useAuthenticationConfig } from "../useAuthenticationConfig";
import { LOGIN_STATUS_FAILED } from "./common/constants";
import {
  LoginResponseError,
  LoginStatus,
  REQUEST_STATUS,
} from "./common/entities";
import {
  getAuthenticationRequestOptions,
  initLoginStatus,
} from "./common/utils";

type Status = LoginStatus<TerraResponse>;

export interface TerraResponse {
  enabled: TerraResponseEnabled;
  userInfo: TerraResponseUserInfo;
}

interface TerraResponseEnabled {
  adminEnabled: boolean;
  allUsersGroup: boolean;
  google: boolean;
  ldap: boolean;
  tosAccepted: boolean;
}

interface TerraResponseUserInfo {
  userEmail: string;
  userSubjectId: string;
}

/**
 * Returns Terra profile login status from configured endpoint.
 * @param token - Token.
 * @returns Terra profile login status.
 */
export const useFetchTerraProfile = (token?: string): Status => {
  const authenticationConfig = useAuthenticationConfig();
  const { terraAuthConfig: { terraProfileEndpoint: endpoint } = {} } =
    authenticationConfig;
  const [loginStatus, setLoginStatus] = useState<Status>(
    initLoginStatus(endpoint) as Status
  );

  // Fetch Terra profile.
  const fetchEndpointData = useCallback(
    (endpoint: string, accessToken: string): void => {
      fetch(endpoint, getAuthenticationRequestOptions(accessToken))
        .then((response) => response.json())
        .then((response: TerraResponse | LoginResponseError) => {
          if (isResponseError(response)) {
            setLoginStatus(LOGIN_STATUS_FAILED as Status);
          } else {
            setLoginStatus((prevStatus) => ({
              ...prevStatus,
              isSuccess: isResponseSuccess(response),
              requestStatus: REQUEST_STATUS.COMPLETED,
              response: response,
            }));
          }
        })
        .catch((err) => {
          console.log(err); // TODO handle error.
          setLoginStatus(LOGIN_STATUS_FAILED as Status);
        });
    },
    []
  );

  // Fetches Terra profile.
  useEffect(() => {
    if (!token) return;
    if (!endpoint) return;
    fetchEndpointData(endpoint, token);
  }, [endpoint, fetchEndpointData, token]);

  return loginStatus;
};

/**
 * Returns true if response is an error response.
 * @param response - Response.
 * @returns true if response is an error response.
 */
function isResponseError(
  response: TerraResponse | LoginResponseError
): response is LoginResponseError {
  return Boolean((response as LoginResponseError).statusCode);
}

/**
 * Returns true if response is enabled.
 * @param response - Response.
 * @returns true if response is successful.
 */
function isResponseSuccess(response: TerraResponse): boolean {
  return Boolean(response.enabled?.google);
}
