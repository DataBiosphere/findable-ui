/**
 * Terra terms of service response.
 */
export interface TerraTermsOfServiceResponse {
  currentVersion: string;
  isEnabled: boolean;
  isGracePeriodEnabled: boolean;
  userAcceptedVersion?: string; // Undefined if user has not accepted terms of service.
}
