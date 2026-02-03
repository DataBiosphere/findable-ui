import { OAuthProvider } from "../auth/types/provider";
import { GoogleIcon } from "../components/common/CustomIcon/components/GoogleIcon/googleIcon";
import { GOOGLE_SIGN_IN_PROVIDER_ID } from "./constants";
import { GoogleProfile } from "./types";
import { mapProfile } from "./utils/profile";

// Re-export for convenience
export { GOOGLE_SIGN_IN_PROVIDER_ID } from "./constants";

/**
 * Google Sign-In provider configuration.
 */
export const GOOGLE_SIGN_IN_PROVIDER: Pick<
  OAuthProvider<GoogleProfile>,
  "icon" | "id" | "name" | "profile"
> = {
  icon: GoogleIcon({}),
  id: GOOGLE_SIGN_IN_PROVIDER_ID,
  name: "Google",
  profile: mapProfile,
};
