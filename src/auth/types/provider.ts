import { ReactNode } from "react";
import { ProviderId } from "./common";
import { UserProfile } from "./authentication";

/**
 * OAuth provider configuration.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Use of `any` is intentional to allow for flexibility in the model.
export interface OAuthProvider<P = any> {
  authorization: { params: { scope: string } };
  clientId: string;
  icon: ReactNode;
  id: ProviderId;
  name: string;
  profile: (profile: P) => UserProfile;
  userinfo: string;
}
