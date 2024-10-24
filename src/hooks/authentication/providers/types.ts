import { OAuthProvider } from "../../../config/entities";
import { ProviderId } from "../../../providers/authentication/common/types";

export interface UseProviders {
  findProvider: (providerId: ProviderId) => OAuthProvider | undefined;
  providers: OAuthProvider[] | undefined;
}
