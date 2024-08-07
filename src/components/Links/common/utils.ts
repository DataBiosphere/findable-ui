import { URL_OBJECT_KEYS } from "./constants";
import { Url, UrlObjectWithHrefAndQuery } from "./entities";

/**
 * Returns true if the given link is an internal link.
 * @param link - Link.
 * @returns true if the given link is an internal link.
 */
export function isClientSideNavigation(link: string): boolean {
  return /^\/(?!\/)|^#/.test(link);
}

/**
 * Returns true if the given url is a URL object with href and query.
 * @param value - URL.
 * @returns true if the given url is a URL object with href and query.
 */
export function isURLObjectWithHrefAndQuery(
  value: Url
): value is UrlObjectWithHrefAndQuery {
  return (
    typeof value !== "string" &&
    Object.entries(value).every(
      ([key, value]) => URL_OBJECT_KEYS.includes(key) && !!value
    )
  );
}

/**
 * Returns true if the given url is a string.
 * @param value - URL.
 * @returns true if the given url is a string.
 */
export function isURLString(value: Url): value is string {
  return typeof value === "string";
}
