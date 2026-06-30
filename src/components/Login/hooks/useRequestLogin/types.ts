import { ProviderId } from "../../../../auth/types/common";

export interface UseRequestLogin {
  submit: (providerId: ProviderId) => void;
  submittingProviderId: ProviderId | null;
}
