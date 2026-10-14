import { ProviderId } from "../../../../auth/types/common";

/**
 * Return value of the useRequestLogin hook.
 */
export interface UseRequestLogin {
  submit: (providerId: ProviderId) => void;
  submittingProviderId: ProviderId | null;
}
