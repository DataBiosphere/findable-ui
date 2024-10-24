import { AUTHORIZATION_STATUS } from "../authorization/types";
import { LoginStatus, REQUEST_STATUS } from "./hooks/common/entities";
import { TerraNIHResponse } from "./hooks/useFetchTerraNIHProfile";
import { TerraResponse } from "./hooks/useFetchTerraProfile";
import { TerraTermsOfServiceResponse } from "./hooks/useFetchTerraTermsOfService";

/**
 * Determines the authorization status of a user based on authentication and Terra service statuses.
 * **Authorization Logic:**
 * - **Unauthorized** if the user is not authenticated.
 * - **Pending** if any supported Terra service request is not started or pending.
 * - **Unauthorized** if the Terra profile is supported but the Terms of Service have not been accepted.
 * - **Authorized** in all other cases.
 * @param isAuthenticated - Authentication status.
 * @param terraNIHProfileLoginStatus - Terra NIH profile login status.
 * @param terraProfileLoginStatus - Terra profile login status.
 * @param terraTOSLoginStatus - Terra terms of service login status.
 * @returns True if the token should be released.
 */
export function getAuthorizationStatus(
  isAuthenticated: boolean,
  terraNIHProfileLoginStatus: LoginStatus<TerraNIHResponse>,
  terraProfileLoginStatus: LoginStatus<TerraResponse>,
  terraTOSLoginStatus: LoginStatus<TerraTermsOfServiceResponse>
): AUTHORIZATION_STATUS {
  if (!isAuthenticated) return AUTHORIZATION_STATUS.UNAUTHORIZED;

  // Check if any supported Terra service request is not started or pending.
  const terraServices = [
    terraNIHProfileLoginStatus,
    terraProfileLoginStatus,
    terraTOSLoginStatus,
  ];
  const isAnyServicePending = terraServices.some(
    ({ isSupported, requestStatus }) =>
      isSupported &&
      (requestStatus === REQUEST_STATUS.NOT_STARTED ||
        requestStatus === REQUEST_STATUS.PENDING)
  );
  if (isAnyServicePending) return AUTHORIZATION_STATUS.PENDING;

  // If Terra profile is supported but Terms of Service not accepted.
  if (terraProfileLoginStatus.isSupported && !terraTOSLoginStatus.isSuccess) {
    return AUTHORIZATION_STATUS.UNAUTHORIZED;
  }

  // Authorized in all other cases.
  return AUTHORIZATION_STATUS.AUTHORIZED;
}
