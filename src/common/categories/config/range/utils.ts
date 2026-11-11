import type { CategoryGroup } from "../../../../config/entities";
import { CategoryKey } from "../../../entities";
import { isRangeCategoryConfig } from "./typeGuards";

/**
 * Returns the number of selected values a filter adds to a filter count: one for a range filter, one per selected value otherwise.
 * @param rangeKeys - Range category keys.
 * @param key - Key of the filter's category.
 * @param values - Filter's selected values; a range filter's [min, max] pair.
 * @returns Filter count contribution.
 */
export function countFilterValues(
  rangeKeys: Set<CategoryKey>,
  key: CategoryKey,
  values: unknown[],
): number {
  return rangeKeys.has(key) ? 1 : values.length;
}

/**
 * Returns the keys of the range categories in the given category groups.
 * @param categoryGroups - Category groups; undefined when the view has none.
 * @returns Range category keys.
 */
export function getRangeCategoryKeys(
  categoryGroups: CategoryGroup[] | undefined,
): Set<CategoryKey> {
  if (!categoryGroups) return new Set();
  return new Set(
    categoryGroups
      .flatMap(({ categoryConfigs }) => categoryConfigs)
      .filter(isRangeCategoryConfig)
      .map(({ key }) => key),
  );
}
