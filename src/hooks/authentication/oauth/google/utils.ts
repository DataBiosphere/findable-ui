import { UserProfile } from "../../../../providers/authentication/profile/types";
import { Response } from "./types";

/**
 * Returns full name, from given and family name.
 * @param response - Google response.
 * @returns full name.
 */
function getFullName(response: Response): string {
  const { family_name: lastName = "", given_name: firstName = "" } = response;
  return `${firstName} ${lastName}`.trim();
}

/**
 * Returns true if response is a google profile.
 * @param response - Google response.
 * @returns response is google profile.
 */
function isProfileGoogle(response: unknown): response is Response {
  return (
    (response as Response)?.email !== undefined &&
    (response as Response)?.family_name !== undefined &&
    (response as Response)?.given_name !== undefined
  );
}

/**
 * Returns user profile from google response.
 * @param response - Google response.
 * @returns user profile.
 */
export function mapProfile(response: unknown): UserProfile | undefined {
  if (isProfileGoogle(response)) {
    const { email, picture } = response;
    const fullName = getFullName(response);
    return {
      email,
      fullName,
      picture,
    };
  }
}
