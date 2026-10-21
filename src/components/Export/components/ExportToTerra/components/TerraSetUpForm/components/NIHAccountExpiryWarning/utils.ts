import { expireTimeInSeconds } from "../../../../../../../../hooks/authentication/terra/useAuthenticationNIHExpiry";

/**
 * Calculates the remaining days until the link expires.
 * @param expirationTimestamp - Expiration timestamp as an ISO 8601 date-time string.
 * @returns remaining days until the link expires.
 */
export function getExpireTimeInDays(expirationTimestamp?: string): number {
  if (!expirationTimestamp) {
    return 0;
  }
  return Math.max(
    Math.ceil(expireTimeInSeconds(expirationTimestamp) / 60 / 60 / 24),
    0,
  );
}

/**
 * Returns an expiration message indicating whether the provided link has already expired or is set to expire.
 * @param linkExpired - Link expired flag.
 * @param expirationTimestamp - Expiration timestamp as an ISO 8601 date-time string.
 * @returns expiration message.
 */
export function getExpiryMessage(
  linkExpired?: boolean,
  expirationTimestamp?: string,
): string {
  if (linkExpired) {
    return "Your NIH Researcher Auth Service (RAS) account link has expired.";
  }
  const days = getExpireTimeInDays(expirationTimestamp);
  return `Your NIH Researcher Auth Service (RAS) account link will expire in ${days} ${
    days === 1 ? "day" : "days"
  }.`;
}
