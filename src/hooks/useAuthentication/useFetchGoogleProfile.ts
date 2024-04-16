import { useCallback, useEffect, useState } from "react";
import { useAuthenticationConfig } from "../useAuthenticationConfig";
import {
  LOGIN_STATUS_FAILED,
  LOGIN_STATUS_NOT_STARTED,
} from "./common/constants";
import { LoginStatus, REQUEST_STATUS } from "./common/entities";
import { getAuthenticationRequestOptions } from "./common/utils";

export type UserProfile = GoogleResponse;

export interface GoogleResponse {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  hd: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
}

type Status = LoginStatus<GoogleResponse>;

/**
 * Returns user profile login status from configured endpoint.
 * @param token - Token.
 * @returns google profile login status.
 */
export const useFetchGoogleProfile = (token?: string): Status => {
  const authenticationConfig = useAuthenticationConfig();
  const { googleGISAuthConfig: { googleProfileEndpoint: endpoint } = {} } =
    authenticationConfig;
  const [loginStatus, setLoginStatus] = useState<Status>(
    LOGIN_STATUS_NOT_STARTED as Status
  );

  // Fetch google user profile.
  const fetchEndpointData = useCallback(
    (endpoint: string, accessToken: string): void => {
      fetch(endpoint, getAuthenticationRequestOptions(accessToken))
        .then((response) => response.json())
        .then((profile: GoogleResponse) => {
          setLoginStatus((prevStatus) => ({
            ...prevStatus,
            isSuccess: true,
            requestStatus: REQUEST_STATUS.COMPLETED,
            response: profile,
          }));
        })
        .catch((err) => {
          console.log(err); // TODO handle error.
          setLoginStatus(LOGIN_STATUS_FAILED as Status);
        });
    },
    []
  );

  // Fetches user profile.
  useEffect(() => {
    if (!token) return;
    if (!endpoint) return;
    fetchEndpointData(endpoint, token);
  }, [endpoint, fetchEndpointData, token]);

  return loginStatus;
};
