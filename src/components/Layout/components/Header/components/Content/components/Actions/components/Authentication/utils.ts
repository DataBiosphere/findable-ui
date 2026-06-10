import { ROUTE } from "../../../../../../../../../../routes/constants";

/**
 * Resolves the sign-in path for the header's Sign In button.
 *
 * When `authenticationEnabled` is a string, treat it as the consumer's
 * sign-in path (e.g. when NextAuth's `pages.signIn` is configured to `"/"`).
 * Otherwise fall back to the library default (`ROUTE.LOGIN` = `"/login"`).
 *
 * Assumes `authenticationEnabled` has already been checked for truthiness by
 * the caller — `false`/`undefined` should never reach here.
 *
 * @param authenticationEnabled - The `authenticationEnabled` prop value.
 * @returns The path to navigate to when the user clicks Sign In.
 */
export function getSignInPath(authenticationEnabled: boolean | string): string {
  return typeof authenticationEnabled === "string"
    ? authenticationEnabled
    : ROUTE.LOGIN;
}
