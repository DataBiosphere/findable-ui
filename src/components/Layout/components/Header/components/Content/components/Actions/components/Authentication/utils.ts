import Router from "next/router";
import { escapeRegExp } from "../../../../../../../../../../common/utils";
import { ROUTE } from "../../../../../../../../../../routes/constants";

/**
 * Resolves the sign-in path for the header's Sign In button.
 *
 * When `authenticationEnabled` is a string, treat it as the consumer's
 * sign-in path (e.g. when NextAuth's `pages.signIn` is configured to `"/"`).
 * Otherwise fall back to the library default (`ROUTE.LOGIN` = `"/login"`).
 *
 * The parameter type admits only enabled values, so TypeScript callers must
 * check that auth is enabled first rather than resolving a working `/login`
 * link for a disabled header. This is a type-level guarantee only: at runtime,
 * any non-string value still falls back to the default.
 *
 * @param authenticationEnabled - The enabled `authenticationEnabled` prop value.
 * @returns The path to navigate to when the user clicks Sign In.
 */
export function getSignInPath(authenticationEnabled: string | true): string {
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

/**
 * Navigates to the sign-in page, returning to the current page afterwards, and
 * closes the header menu once the navigation settles.
 *
 * The menu closes whether or not the navigation succeeds, so a rejected
 * navigation cannot leave the mobile menu open. The rejection itself is not
 * swallowed: the returned promise still rejects.
 *
 * @param signInPath - The resolved sign-in path (see `getSignInPath`).
 * @param callbackUrl - The path to return to after signing in.
 * @param closeMenu - Closes the header menu.
 * @returns The navigation promise, settling after the menu has closed.
 */
export function navigateToSignIn(
  signInPath: string,
  callbackUrl: string,
  closeMenu: () => void,
): Promise<boolean> {
  return Router.push({
    pathname: signInPath,
    query: { callbackUrl },
  }).finally(closeMenu);
}
