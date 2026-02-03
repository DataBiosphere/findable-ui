import {
  LOGIN_STATUS_NOT_STARTED,
  LOGIN_STATUS_NOT_SUPPORTED,
  LoginResponse,
} from "./constants";
import {
  AuthService,
  LoginStatus,
  REQUEST_STATUS,
  TERRA_PROFILE_STATUS,
} from "./types/common";
import { TerraNIHResponse } from "./types/terra-nih";
import { TerraResponse } from "./types/terra-profile";
import { TerraTermsOfServiceResponse } from "./types/terra-tos";

/**
 * Returns the options for an authentication request.
 * @param token - Token.
 * @returns request options.
 */
export function getAuthenticationRequestOptions(token: string): RequestInit {
  const headers = new Headers();
  headers.append("authorization", "Bearer " + token);
  return { headers };
}

/**
 * Returns login status.
 * An undefined endpoint will return a not supported login status,
 * otherwise a not started login status is returned.
 * @param endpoint - Endpoint.
 * @returns initial login status.
 */
export function initLoginStatus(endpoint?: string): LoginStatus<LoginResponse> {
  if (!endpoint) {
    // Endpoint not supported.
    return LOGIN_STATUS_NOT_SUPPORTED;
  }
  return LOGIN_STATUS_NOT_STARTED;
}

/**
 * Returns service endpoint.
 * @param services - Services.
 * @param serviceId - Service ID.
 * @param endpointId - Endpoint ID.
 * @returns Service endpoint.
 */
export function getServiceEndpoint(
  services: AuthService[] | undefined,
  serviceId: string,
  endpointId: string,
): string | undefined {
  return findService(services, serviceId)?.endpoint[endpointId];
}

/**
 * Find a service by service ID.
 * @param services - Services.
 * @param serviceId - Service ID.
 * @returns Service.
 */
export function findService(
  services: AuthService[] | undefined,
  serviceId: string,
): AuthService | undefined {
  return services?.find(({ id }) => id === serviceId);
}

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
  terraTOSLoginStatus: LoginStatus<TerraTermsOfServiceResponse>,
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
        requestStatus === REQUEST_STATUS.PENDING),
  );
  if (isAnyServicePending) return TERRA_PROFILE_STATUS.PENDING;

  // If Terra profile is supported but Terms of Service not accepted.
  if (terraProfileLoginStatus.isSupported && !terraTOSLoginStatus.isSuccess) {
    return TERRA_PROFILE_STATUS.UNAUTHENTICATED;
  }

  // Authenticated in all other cases.
  return TERRA_PROFILE_STATUS.AUTHENTICATED;
}
