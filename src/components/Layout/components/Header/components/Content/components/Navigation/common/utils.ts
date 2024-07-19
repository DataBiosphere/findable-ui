import { SELECTED_MATCH } from "../../../../../common/entities";

/**
 * Returns true if the navigation link is selected.
 * @param url - The URL of the navigation link.
 * @param pathname - The current pathname.
 * @param selectedMatch - The selected match type.
 * @returns true if the navigation link is selected.
 */
export function isNavigationLinkSelected(
  url: string,
  pathname?: string,
  selectedMatch: SELECTED_MATCH = SELECTED_MATCH.STARTS_WITH
): boolean {
  if (!pathname) return false;
  if (isSelectedMatchEqual(selectedMatch)) return url === pathname;
  return pathname.startsWith(url);
}

/**
 * Returns true if the selected match type is "EQUAL".
 * @param selectedMatch - The selected match type.
 * @returns True if the selected match type is "EQUAL".
 */
export function isSelectedMatchEqual(selectedMatch: SELECTED_MATCH): boolean {
  return selectedMatch === SELECTED_MATCH.EQUALS;
}
