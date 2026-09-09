/**
 * Returns the accessible name for a category filter panel's close button. On
 * the drawer surface this button and the filter drawer's own close button are
 * in the tree together, so the name has to say which of the two it closes.
 * @param categoryLabel - Label of the category the panel filters on.
 * @returns The close button's accessible name.
 */
export function getCloseCategoryLabel(categoryLabel: string): string {
  return `Close ${categoryLabel} filter`;
}
