/**
 * Returns true if the navigation link is selected.
 * The pathname is matched against the selected patterns.
 * @param pathname - The current pathname.
 * @param selectedPatterns - Selected match patterns.
 * @returns true if the navigation link is selected.
 */
export function isNavigationLinkSelected(
  pathname?: string,
  selectedPatterns?: string[]
): boolean {
  if (!pathname) return false;
  for (const selectedPattern of selectedPatterns ?? []) {
    if (new RegExp(selectedPattern).test(pathname)) {
      return true;
    }
  }
  return false;
}
