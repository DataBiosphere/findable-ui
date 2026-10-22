import { JSX } from "react";
import { useAuthenticationNIHExpiry } from "../../../../../../../../hooks/authentication/terra/useAuthenticationNIHExpiry";
import { Alert } from "../../../../../../../common/Alert/alert";
import { ALERT_PROPS } from "../../../../../../../common/Alert/constants";
import { FluidPaper } from "../../../../../../../common/Paper/paper.styles";
import { Link } from "../../../../../../../Links/components/Link/link";
import { getExpiryMessage } from "./utils";

/**
 * Warning that the user's NIH Researcher Auth Service (RAS) account link has
 * expired or will expire, with a link to renew it.
 * @returns The warning, or null until the expiry check is complete or when the link is not expiring.
 */
export const NIHAccountExpiryWarning = (): JSX.Element | null => {
  const { expirationTimestamp, isReady, linkExpired, linkWillExpire } =
    useAuthenticationNIHExpiry();

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
