import { useCallback, useEffect, useState } from "react";
import { useAuthenticationConfig } from "../../hooks/authentication/config/useAuthenticationConfig";
import {
  LOGIN_STATUS_FAILED,
  LOGIN_STATUS_NOT_STARTED,
  LOGIN_STATUS_PENDING,
  TERRA_SERVICE_ID,
} from "../constants";
import { LoginStatus, REQUEST_STATUS } from "../types/common";
import { TerraNIHResponse } from "../types/terra-nih";
import {
  getAuthenticationRequestOptions,
  getServiceEndpoint,
  initLoginStatus,
} from "../utils";

const ENDPOINT_ID = "nihStatus";

type Status = LoginStatus<TerraNIHResponse>;

/**
 * Returns Terra NIH login status from configured endpoint.
 * @param token - Token.
 * @returns Terra NIH login status.
 */
export const useFetchTerraNIHProfile = (token?: string): Status => {
  const { services } = useAuthenticationConfig() || {};
  const endpoint = getServiceEndpoint(services, TERRA_SERVICE_ID, ENDPOINT_ID);
  const [loginStatus, setLoginStatus] = useState<Status>(
    initLoginStatus<TerraNIHResponse>(endpoint),
  );

  // Fetch Terra NIH account profile.
  const fetchEndpointData = useCallback(
    (endpoint: string, accessToken?: string): void => {
      if (!accessToken) {
        setLoginStatus(LOGIN_STATUS_NOT_STARTED as Status);
        return;
      }
      setLoginStatus(LOGIN_STATUS_PENDING as Status);
      fetch(endpoint, getAuthenticationRequestOptions(accessToken))
        .then((response) => {
          if (response.status === 404) {
            setLoginStatus((prevStatus) => ({
              ...prevStatus,
              isSuccess: false,
              requestStatus: REQUEST_STATUS.COMPLETED,
              response: undefined,
            }));
            return;
          }
          if (!response.ok) {
            setLoginStatus(LOGIN_STATUS_FAILED as Status);
            return;
          }
          return response.json();
        })
        .then((response?: TerraNIHResponse) => {
          if (!response) return;
          setLoginStatus((prevStatus) => ({
            ...prevStatus,
            isSuccess: isResponseSuccess(response),
            requestStatus: REQUEST_STATUS.COMPLETED,
            response,
          }));
        })
        .catch((err) => {
          console.log(err); // TODO handle error.
          setLoginStatus(LOGIN_STATUS_FAILED as Status);
        });
    },
    [],
  );

  // Fetches Terra NIH account profile.
  useEffect(() => {
    if (!endpoint) return;
    fetchEndpointData(endpoint, token);
  }, [endpoint, fetchEndpointData, token]);

  return loginStatus;
};

/**
 * Returns true if the user has a linked external account.
 * @param response - Response.
 * @returns true if response is successful.
 */
function isResponseSuccess(response: TerraNIHResponse): boolean {
  return Boolean(response.externalUserId);
}
