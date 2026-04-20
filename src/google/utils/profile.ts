import { UserProfile } from "../../auth/types/authentication";
import { GOOGLE_SIGN_IN_PROVIDER_ID } from "../constants";
import { GoogleProfile } from "../types";

/**
 * Returns full name, from given and family name.
 * @param profile - Google response.
 * @returns full name.
 */
function getFullName(profile: GoogleProfile): string {
  const { family_name: lastName = "", given_name: firstName = "" } = profile;
  return `${firstName} ${lastName}`.trim();
}

/**
 * Returns user profile from google response.
 * @param profile - Google response.
 * @returns user profile.
 */
export function mapProfile(profile: GoogleProfile): UserProfile {
  const { email, picture: image } = profile;
  const name = getFullName(profile);
  return {
    email,
    id: GOOGLE_SIGN_IN_PROVIDER_ID,
    image,
    name,
  };
}
