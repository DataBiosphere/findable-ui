import { ProviderId } from "../../../auth/types/common";
import { OAuthProvider } from "../../../config/entities";

export interface UseProviders {
  findProvider: (providerId: ProviderId) => OAuthProvider | undefined;
  providers: OAuthProvider[] | undefined;
}
