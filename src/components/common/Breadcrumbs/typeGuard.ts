import { Breadcrumb } from "./breadcrumbs";

/**
 * Checks if the given value is an array of breadcrumbs.
 * @param value - Value.
 * @returns True if the value is an array of breadcrumbs.
 */
export function isBreadcrumbArray(value: unknown): value is Breadcrumb[] {
  return Array.isArray(value) && value.every(isBreadcrumb);
}

/**
 * Checks if the given value is a breadcrumb.
 * @param value - Value.
 * @returns True if the value is a breadcrumb.
 */
export function isBreadcrumb(value: unknown): value is Breadcrumb {
  if (value === null) return false;
  if (typeof value !== "object") return false;
  if ("path" in value && "text" in value) {
    return typeof value.path === "string" && typeof value.text === "string";
  }
  return false;
}
