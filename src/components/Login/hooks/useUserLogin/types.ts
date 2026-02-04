import { ProviderId } from "../../../../auth/types/common";
import { UseUserConsent } from "../useUserConsent/types";

export interface UseUserLogin extends Omit<
  UseUserConsent,
  "handleError" | "state"
> {
  consentState: Pick<UseUserConsent["state"], "isDisabled" | "isError">;
  handleLogin: (providerId: ProviderId) => void;
}
