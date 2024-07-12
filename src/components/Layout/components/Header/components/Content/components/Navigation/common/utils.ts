/**
 * Returns true if the navigation link is selected.
 * @param url - The URL of the navigation link.
 * @param pathname - The current pathname.
 * @returns true if the navigation link is selected.
 */
export function isNavigationLinkSelected(
  url: string,
  pathname?: string
): boolean {
  if (!pathname) return false;
  return pathname.startsWith(url);
}
