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

interface DatasetPermission {
  authorized: boolean;
  name: string;
}

type Status = LoginStatus<TerraNIHResponse>;

export interface TerraNIHResponse {
  datasetPermissions: DatasetPermission[];
  linkedNihUsername: string;
  linkExpireTime: number;
}

/**
 * Returns Terra NIH login status from configured endpoint.
 * @param token - Token.
 * @returns Terra NIH login status.
 */
export const useFetchTerraNIHProfile = (token?: string): Status => {
  const authenticationConfig = useAuthenticationConfig();
  const { terraAuthConfig: { terraNIHProfileEndpoint: endpoint } = {} } =
    authenticationConfig;
  const [loginStatus, setLoginStatus] = useState<Status>(
    initLoginStatus(endpoint) as Status
  );

  // Fetch Terra NIH account profile.
  const fetchEndpointData = useCallback(
    (endpoint: string, accessToken: string): void => {
      fetch(endpoint, getAuthenticationRequestOptions(accessToken))
        .then((response) => response.json())
        .then((response: LoginResponseError | TerraNIHResponse) => {
          if (isResponseError(response)) {
            setLoginStatus(LOGIN_STATUS_FAILED as Status);
          } else {
            setLoginStatus((prevStatus) => ({
              ...prevStatus,
              isSuccess: isResponseSuccess(response),
              requestStatus: REQUEST_STATUS.COMPLETED,
              response,
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

  // Fetches Terra NIH account profile.
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
  response: TerraNIHResponse | LoginResponseError
): response is LoginResponseError {
  return Boolean((response as LoginResponseError).statusCode);
}

/**
 * Returns true if the user accepted terms of service version is current.
 * @param response - Response.
 * @returns true if response is successful.
 */
function isResponseSuccess(response: TerraNIHResponse): boolean {
  return Boolean(response.linkedNihUsername);
}
