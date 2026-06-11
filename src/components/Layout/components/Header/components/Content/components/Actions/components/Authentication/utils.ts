import { escapeRegExp } from "../../../../../../../../../../common/utils";
import { ROUTE } from "../../../../../../../../../../routes/constants";

/**
 * Resolves the sign-in path for the header's Sign In button.
 *
 * When `authenticationEnabled` is a string, treat it as the consumer's
 * sign-in path (e.g. when NextAuth's `pages.signIn` is configured to `"/"`).
 * Otherwise fall back to the library default (`ROUTE.LOGIN` = `"/login"`).
 *
 * Accepts `false`/`undefined` (returning the default) so callers that only
 * build render props — e.g. the header wiring `renderButton` — can call it
 * unconditionally; the auth UI itself still renders nothing when the prop is
 * falsy.
 *
 * @param authenticationEnabled - The `authenticationEnabled` prop value.
 * @returns The path to navigate to when the user clicks Sign In.
 */
export function getSignInPath(
  authenticationEnabled: boolean | string | undefined,
): string {
  return typeof authenticationEnabled === "string"
    ? authenticationEnabled
    : ROUTE.LOGIN;
}

/**
 * Builds the `isNavigationLinkSelected` pattern for the sign-in path.
 *
 * Anchored to the full pathname (with the path's regex special characters
 * escaped) because `isNavigationLinkSelected` treats patterns as unanchored
 * regexes — a root sign-in path (`"/"`) would otherwise match every pathname
 * and leave the Sign In button permanently highlighted.
 *
 * Tolerates trailing-slash differences between the configured path and the
 * runtime pathname (e.g. `authenticationEnabled="/login/"` or Next's
 * `trailingSlash: true`), so either form highlights on either pathname.
 *
 * @param signInPath - The resolved sign-in path (see `getSignInPath`).
 * @returns Pattern matching exactly the sign-in pathname.
 */
export function getSignInPathPattern(signInPath: string): string {
  const path = signInPath === "/" ? signInPath : signInPath.replace(/\/+$/, "");
  if (path === "/") return "^/$";
  return `^${escapeRegExp(path)}/?$`;
}
