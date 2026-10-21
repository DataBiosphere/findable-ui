import { LOGIN_STATUS_NOT_STARTED } from "../../../../../../../../../terra/constants";
import { REQUEST_STATUS } from "../../../../../../../../../terra/types/common";
import { TerraProfileContextProps } from "../../../../../../../../../terra/types/context";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/**
 * Builds a mock Terra profile context whose NIH account link expires at the given offset from now.
 * @param offsetMs - Offset from now, in milliseconds, at which the NIH account link expires.
 * @returns mock Terra profile context.
 */
function buildTerraProfileContext(offsetMs: number): TerraProfileContextProps {
  return {
    terraNIHProfileLoginStatus: {
      isSuccess: true,
      isSupported: true,
      requestStatus: REQUEST_STATUS.COMPLETED,
      response: {
        expirationTimestamp: new Date(Date.now() + offsetMs).toISOString(),
        externalUserId: "researcher@example.com",
      },
    },
    terraProfileLoginStatus: LOGIN_STATUS_NOT_STARTED,
    terraTOSLoginStatus: LOGIN_STATUS_NOT_STARTED,
  };
}

export const EXPIRED = buildTerraProfileContext(-DAY_MS);

export const EXPIRES_IN_DAYS = buildTerraProfileContext(3 * DAY_MS - HOUR_MS);

export const EXPIRES_IN_ONE_DAY = buildTerraProfileContext(12 * HOUR_MS);
