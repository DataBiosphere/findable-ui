import { useTerraProfile } from "../../../providers/authentication/terra/hook";
import { REQUEST_STATUS } from "../../../providers/authentication/terra/hooks/common/entities";

const WARNING_WINDOW_SECONDS = 60 * 60 * 24 * 5; // 5 days.

interface UseAuthenticationNIHExpiry {
  expirationTimestamp?: string;
  isReady: boolean;
  linkExpired?: boolean;
  linkWillExpire?: boolean;
}

/**
 * Handles authentication NIH expiry.
 * @returns NIH expiry status.
 */
export const useAuthenticationNIHExpiry = (): UseAuthenticationNIHExpiry => {
  const { terraNIHProfileLoginStatus } = useTerraProfile();
  const { requestStatus, response } = terraNIHProfileLoginStatus;
  const { expirationTimestamp } = response || {};
  const isReady = requestStatus === REQUEST_STATUS.COMPLETED;
  const linkExpired = hasLinkedNIHAccountExpired(expirationTimestamp);
  const linkWillExpire = isLinkedNIHAccountWillExpire(expirationTimestamp);
  return {
    expirationTimestamp,
    isReady,
    linkExpired,
    linkWillExpire,
  };
};

/**
 * Calculates the remaining time in seconds until the given expiration time.
 * @param expirationTimestamp - Expiration timestamp as an ISO 8601 date-time string.
 * @returns remaining time in seconds.
 */
export function expireTimeInSeconds(expirationTimestamp: string): number {
  return new Date(expirationTimestamp).getTime() / 1000 - Date.now() / 1000;
}

/**
 * Returns true if the linked NIH account has expired.
 * @param expirationTimestamp - Expiration timestamp as an ISO 8601 date-time string.
 * @returns true if the linked NIH account has expired.
 */
function hasLinkedNIHAccountExpired(
  expirationTimestamp?: string,
): boolean | undefined {
  if (!expirationTimestamp) return;
  return expireTimeInSeconds(expirationTimestamp) < 0;
}

/**
 * Returns true if the linked NIH account will expire in less than a week.
 * @param expirationTimestamp - Expiration timestamp as an ISO 8601 date-time string.
 * @returns true if the linked NIH account will expire in less than a week.
 */
function isLinkedNIHAccountWillExpire(
  expirationTimestamp?: string,
): boolean | undefined {
  if (!expirationTimestamp) return;
  return expireTimeInSeconds(expirationTimestamp) < WARNING_WINDOW_SECONDS;
}
