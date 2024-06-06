import { UrlObject } from "url";
import { URL_OBJECT_KEYS } from "./constants";
import { Url } from "./entities";

/**
 * Returns true if the given link is an internal link.
 * @param link - Link.
 * @returns true if the given link is an internal link.
 */
export function isClientSideNavigation(link: string): boolean {
  return /^\/(?!\/)/.test(link);
}

/**
 * Returns true if the given url is a URL object.
 * @param value - URL.
 * @returns true if the given url is a URL object.
 */
export function isURLObject(value: Url): value is UrlObject {
  return (
    typeof value !== "string" &&
    Object.keys(value).some((key) => URL_OBJECT_KEYS.includes(key))
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
