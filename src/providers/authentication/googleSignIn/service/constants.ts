import { GoogleIcon } from "../../../../components/common/CustomIcon/components/GoogleIcon/googleIcon";
import { OAuthProvider } from "../../../../config/entities";
import { GoogleProfile } from "../profile/types";
import { mapProfile } from "../profile/utils";

export const GOOGLE_SIGN_IN_PROVIDER_ID = "google";

export const GOOGLE_SIGN_IN_PROVIDER: Pick<
  OAuthProvider<GoogleProfile>,
  "icon" | "id" | "name" | "profile"
> = {
  icon: GoogleIcon({}),
  id: GOOGLE_SIGN_IN_PROVIDER_ID,
  name: "Google",
  profile: mapProfile,
};
