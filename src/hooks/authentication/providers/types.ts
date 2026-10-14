import { ProviderId } from "../../../auth/types/common";
import { OAuthProvider } from "../../../config/entities";

/**
 * Return value of the useProviders hook.
 */
export interface UseProviders {
  findProvider: (providerId: ProviderId) => OAuthProvider | undefined;
  providers: OAuthProvider[] | undefined;
}
