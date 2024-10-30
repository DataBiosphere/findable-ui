import { LoginStatus, REQUEST_STATUS } from "./hooks/common/entities";
import { TerraNIHResponse } from "./hooks/useFetchTerraNIHProfile";
import { TerraResponse } from "./hooks/useFetchTerraProfile";
import { TerraTermsOfServiceResponse } from "./hooks/useFetchTerraTermsOfService";
import { TERRA_PROFILE_STATUS } from "./types";

/**
 * Determines the status of a user based on authentication and Terra service statuses.
 * **Logic:**
 * - **Pending** if the user is not authenticated.
 * - **Pending** if any supported Terra service request is not started or pending.
 * - **Unauthenticated** if the Terra profile is supported but the Terms of Service have not been accepted.
 * - **Authenticated** in all other cases.
 * @param isUserAuthenticated - User authentication status.
 * @param terraNIHProfileLoginStatus - Terra NIH profile login status.
 * @param terraProfileLoginStatus - Terra profile login status.
 * @param terraTOSLoginStatus - Terra terms of service login status.
 * @returns Terra profile status.
 */
export function getProfileStatus(
  isUserAuthenticated: boolean,
  terraNIHProfileLoginStatus: LoginStatus<TerraNIHResponse>,
  terraProfileLoginStatus: LoginStatus<TerraResponse>,
  terraTOSLoginStatus: LoginStatus<TerraTermsOfServiceResponse>
): TERRA_PROFILE_STATUS {
  if (!isUserAuthenticated) return TERRA_PROFILE_STATUS.PENDING;

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
  if (isAnyServicePending) return TERRA_PROFILE_STATUS.PENDING;

  // If Terra profile is supported but Terms of Service not accepted.
  if (terraProfileLoginStatus.isSupported && !terraTOSLoginStatus.isSuccess) {
    return TERRA_PROFILE_STATUS.UNAUTHENTICATED;
  }

  // Authenticated in all other cases.
  return TERRA_PROFILE_STATUS.AUTHENTICATED;
}
