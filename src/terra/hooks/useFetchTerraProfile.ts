import { useCallback, useEffect, useState } from "react";
import { useAuthenticationConfig } from "../../hooks/authentication/config/useAuthenticationConfig";
import {
  LOGIN_STATUS_FAILED,
  LOGIN_STATUS_NOT_STARTED,
  LOGIN_STATUS_PENDING,
  TERRA_SERVICE_ID,
} from "../constants";
import {
  LoginResponseError,
  LoginStatus,
  REQUEST_STATUS,
} from "../types/common";
import { TerraResponse } from "../types/terra-profile";
import {
  getAuthenticationRequestOptions,
  getServiceEndpoint,
  initLoginStatus,
} from "../utils";

const ENDPOINT_ID = "profile";

type Status = LoginStatus<TerraResponse>;

/**
 * Returns Terra profile login status from configured endpoint.
 * @param token - Token.
 * @returns Terra profile login status.
 */
export const useFetchTerraProfile = (token?: string): Status => {
  const { services } = useAuthenticationConfig() || {};
  const endpoint = getServiceEndpoint(services, TERRA_SERVICE_ID, ENDPOINT_ID);
  const [loginStatus, setLoginStatus] = useState<Status>(
    initLoginStatus(endpoint) as Status,
  );

  // Fetch Terra profile.
  const fetchEndpointData = useCallback(
    (endpoint: string, accessToken?: string): void => {
      if (!accessToken) {
        setLoginStatus(LOGIN_STATUS_NOT_STARTED as Status);
        return;
      }
      setLoginStatus(LOGIN_STATUS_PENDING as Status);
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
    [],
  );

  // Fetches Terra profile.
  useEffect(() => {
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
  response: TerraResponse | LoginResponseError,
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
