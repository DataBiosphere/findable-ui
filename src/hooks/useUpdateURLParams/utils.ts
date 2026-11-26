import Router, { type NextRouter } from "next/router";
import type { RouteProps } from "./types";

/**
 * Returns a `beforeHistoryChange` listener that cancels the shallow replace to `toAs` when the browser is no longer at
 * `from`, the page the replace was issued for. Without it, a Back that lands while the replace is still pending lets
 * the replace write `toAs` over the history entry the user went back to.
 * @param from - URL of the page the replace was issued for, with the basePath.
 * @param toAs - Path, search and fragment the replace writes, with the basePath.
 * @returns The listener.
 */
function createBeforeHistoryChangeListener(
  from: URL,
  toAs: string,
): (as: string, routeProps: RouteProps) => void {
  // Next adds or removes the path's trailing slash, per the app's `trailingSlash` setting, before it emits `as`.
  const toAsWithoutTrailingSlash = removeTrailingSlash(toAs);
  return (as: string, { shallow }: RouteProps): void => {
    // Another navigation, such as the Back that left `from`.
    if (!shallow || removeTrailingSlash(as) !== toAsWithoutTrailingSlash) {
      return;
    }
    if (isBrowserAt(from)) return;
    // Next's pages router (next/dist/shared/lib/router/router.js, `change()`) emits `beforeHistoryChange` inside a
    // try whose catch returns false for an error with `cancelled` set, before it writes history.
    throw Object.assign(
      new Error(
        "Cancelled the URL params replace: the browser left the page it was issued for",
      ),
      { cancelled: true },
    );
  };
}

/**
 * Returns the params whose value is set but differs from the URL's.
 * @param query - Router query.
 * @param params - Param values keyed by param name; undefined when there is nothing to put back.
 * @returns The params to put back into the URL.
 */
export function getChangedParams(
  query: Record<string, string | string[] | undefined>,
  params: Record<string, string | undefined>,
): Record<string, string> {
  const changedParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || query[key] === value) continue;
    changedParams[key] = value;
  }
  return changedParams;
}

/**
 * Returns `from` with the changed params set and the browser's current fragment, if any.
 * @param from - URL of the page the replace is issued for.
 * @param changedParams - Params to set.
 * @returns The URL to replace with.
 */
function getReplacementURL(
  from: URL,
  changedParams: Record<string, string>,
): URL {
  const to = new URL(from);
  for (const [key, value] of Object.entries(changedParams)) {
    to.searchParams.set(key, value);
  }
  to.hash = window.location.hash;
  return to;
}

/**
 * Returns true when the browser shows the given URL's path and search.
 * @param url - URL to compare with the browser's.
 * @returns True when the browser is at the URL, ignoring the fragment.
 */
function isBrowserAt(url: URL): boolean {
  return (
    window.location.pathname === url.pathname &&
    window.location.search === url.search
  );
}

/**
 * Returns the URL with its path's trailing slash removed, keeping the root path.
 * @param as - Path, search and fragment.
 * @returns The path without its trailing slash, with the search and fragment.
 */
function removeTrailingSlash(as: string): string {
  const url = new URL(as, window.location.origin);
  return `${url.pathname.replace(/(.)\/$/, "$1")}${url.search}${url.hash}`;
}

/**
 * Puts the changed params into the URL of the page the router is rendering, with a shallow replace that keeps the
 * fragment and is cancelled if the browser leaves the page before the replace writes history.
 * @param router - Router state of the rendered page.
 * @param router.asPath - Path, search and fragment of the rendered page, without the basePath.
 * @param router.basePath - Router basePath.
 * @param router.pathname - Route pattern of the rendered page, e.g. `/[entityListType]/[...params]`.
 * @param router.query - Router query.
 * @param changedParams - Params to put into the URL.
 */
export function replaceURLParams(
  {
    asPath,
    basePath,
    pathname,
    query,
  }: Pick<NextRouter, "asPath" | "basePath" | "pathname" | "query">,
  changedParams: Record<string, string>,
): void {
  const from = new URL(`${basePath}${asPath}`, window.location.origin);
  const to = getReplacementURL(from, changedParams);
  const toAs = `${to.pathname}${to.search}${to.hash}`;
  const listener = createBeforeHistoryChangeListener(from, toAs);
  // Kept past unmount: going Back unmounts the page before the replace writes history.
  Router.events.on("beforeHistoryChange", listener);
  // The route pattern names the rendered page, so Next doesn't resolve the page from the URL; `as` is the URL written.
  // Shallow: adding params must not re-run the page's data fetching.
  void Router.replace(
    { pathname, query: { ...query, ...changedParams } },
    toAs.slice(basePath.length),
    { shallow: true },
  ).finally(() => Router.events.off("beforeHistoryChange", listener));
}
