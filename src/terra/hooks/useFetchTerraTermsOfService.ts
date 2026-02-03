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
import { TerraTermsOfServiceResponse } from "../types/terra-tos";
import {
  getAuthenticationRequestOptions,
  getServiceEndpoint,
  initLoginStatus,
} from "../utils";

const ENDPOINT_ID = "tos";

type Status = LoginStatus<TerraTermsOfServiceResponse>;

/**
 * Returns Terra terms of service login status from configured endpoint.
 * @param token - Token.
 * @returns Terra terms of service login status.
 */
export const useFetchTerraTermsOfService = (token?: string): Status => {
  const { services } = useAuthenticationConfig() || {};
  const endpoint = getServiceEndpoint(services, TERRA_SERVICE_ID, ENDPOINT_ID);
  const [loginStatus, setLoginStatus] = useState<Status>(
    initLoginStatus(endpoint) as Status,
  );

  // Fetch Terra terms of service.
  const fetchEndpointData = useCallback(
    (endpoint: string, accessToken?: string): void => {
      if (!accessToken) {
        setLoginStatus(LOGIN_STATUS_NOT_STARTED as Status);
        return;
      }
      setLoginStatus(LOGIN_STATUS_PENDING as Status);
      fetch(endpoint, getAuthenticationRequestOptions(accessToken))
        .then((response) => response.json())
        .then((response: LoginResponseError | TerraTermsOfServiceResponse) => {
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
    [],
  );

  // Fetches Terra terms of service.
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
  response: TerraTermsOfServiceResponse | LoginResponseError,
): response is LoginResponseError {
  return Boolean((response as LoginResponseError).statusCode);
}

/**
 * Returns true if the user accepted terms of service version is current.
 * @param response - Response.
 * @returns true if response is successful.
 */
function isResponseSuccess(response: TerraTermsOfServiceResponse): boolean {
  return Boolean(response.currentVersion === response.userAcceptedVersion);
}
