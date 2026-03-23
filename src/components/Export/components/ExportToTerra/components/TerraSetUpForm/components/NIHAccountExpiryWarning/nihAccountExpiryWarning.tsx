import { JSX } from "react";
import {
  expireTimeInSeconds,
  useAuthenticationNIHExpiry,
} from "../../../../../../../../hooks/authentication/terra/useAuthenticationNIHExpiry";
import { Alert } from "../../../../../../../common/Alert/alert";
import { ALERT_PROPS } from "../../../../../../../common/Alert/constants";
import { FluidPaper } from "../../../../../../../common/Paper/paper.styles";
import { Link } from "../../../../../../../Links/components/Link/link";

export const NIHAccountExpiryWarning = (): JSX.Element | null => {
  const expiryStatus = useAuthenticationNIHExpiry();
  const { expirationTimestamp, isReady, linkExpired, linkWillExpire } =
    expiryStatus || {};

  if (!isReady) return null;

  return linkWillExpire || linkExpired ? (
    <Alert {...ALERT_PROPS.STANDARD_WARNING} component={FluidPaper}>
      <span>
        <span>{getExpiryMessage(linkExpired, expirationTimestamp)}</span>{" "}
        <span>
          Please{" "}
          <Link
            label="renew your account"
            url="https://support.terra.bio/hc/en-us/articles/32634034451099-RAS-Integration-for-AnVIL-Data-Launching-3-25-26"
          />{" "}
          link.
        </span>
      </span>
    </Alert>
  ) : null;
};

/**
 * Calculates the remaining days until the link expires.
 * @param expirationTimestamp - Expiration timestamp as an ISO 8601 date-time string.
 * @returns remaining days until the link expires.
 */
function getExpireTimeInDays(expirationTimestamp?: string): number {
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
function getExpiryMessage(
  linkExpired?: boolean,
  expirationTimestamp?: string,
): string {
  if (linkExpired) {
    return "Your NIH Researcher Auth Service (RAS) account link has expired.";
  }
  return `Your NIH Researcher Auth Service (RAS) account link will expire in ${getExpireTimeInDays(
    expirationTimestamp,
  )} days.`;
}
