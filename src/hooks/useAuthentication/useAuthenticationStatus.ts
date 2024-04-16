import {
  AUTHENTICATION_STATUS,
  LoginResponse,
  LoginStatus,
  REQUEST_STATUS,
} from "./common/entities";
import { GoogleResponse } from "./useFetchGoogleProfile";
import { TerraNIHResponse } from "./useFetchTerraNIHProfile";
import { TerraResponse } from "./useFetchTerraProfile";
import { TerraTermsOfServiceResponse } from "./useFetchTerraTermsOfService";

/**
 * Handles the status of the authentication process.
 * @param userProfileLoginStatus - User profile login status.
 * @param terraProfileLoginStatus - Terra profile login status.
 * @param terraTOSLoginStatus - Terra terms of service login status.
 * @param terraNIHProfileLoginStatus - Terra NIH profile login status.
 * @returns authentication status.
 */
export const useAuthenticationStatus = (
  userProfileLoginStatus: LoginStatus<GoogleResponse>,
  terraProfileLoginStatus: LoginStatus<TerraResponse>,
  terraTOSLoginStatus: LoginStatus<TerraTermsOfServiceResponse>,
  terraNIHProfileLoginStatus: LoginStatus<TerraNIHResponse>
): AUTHENTICATION_STATUS => {
  return getAuthenticationStatus([
    terraNIHProfileLoginStatus,
    terraProfileLoginStatus,
    terraTOSLoginStatus,
    userProfileLoginStatus,
  ]);
};

/**
 * Returns the authentication status ("INCOMPLETE" or "COMPLETE").
 * @param loginStatuses - Login statuses.
 * @returns authentication status.
 */
export function getAuthenticationStatus(
  loginStatuses: LoginStatus<LoginResponse>[]
): AUTHENTICATION_STATUS {
  for (const loginStatus of loginStatuses) {
    if (!loginStatus.isSupported) continue;
    if (loginStatus.requestStatus === REQUEST_STATUS.NOT_STARTED) {
      return AUTHENTICATION_STATUS.INCOMPLETE;
    }
  }
  return AUTHENTICATION_STATUS.COMPLETED;
}
