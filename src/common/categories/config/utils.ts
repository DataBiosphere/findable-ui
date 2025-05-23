import { Category } from "../models/types";
import { VIEW_KIND } from "../views/types";
import { CategoryConfig } from "./types";

/**
 * Returns the category config for the given category config key and view kind.
 * @param viewKind - View kind.
 * @param key - Category config key.
 * @param configs - Category configs.
 * @returns category config.
 */
export function findCategoryConfig<V extends VIEW_KIND>(
  viewKind: V,
  key: Category["key"],
  configs: CategoryConfig[]
): Extract<CategoryConfig, { viewKind?: V }> | undefined {
  return configs.find(
    (c): c is Extract<CategoryConfig, { viewKind?: V }> =>
      // An undefined `viewKind` will always be `SelectCategoryConfig`. Other view kinds will be explicitly checked.
      (c.viewKind === undefined || c.viewKind === viewKind) && c.key === key
  );
}

/**
 * Returns the range category config for the given category config key.
 * @param key - Category config key.
 * @param configs - Category configs.
 * @returns category config.
 */
export function findRangeCategoryConfig(
  key: Category["key"],
  configs: CategoryConfig[]
): Extract<CategoryConfig, { viewKind: VIEW_KIND.RANGE }> | undefined {
  return findCategoryConfig(VIEW_KIND.RANGE, key, configs);
}

/**
 * Returns the select category config for the given category config key.
 * @param key - Category config key.
 * @param configs - Category configs.
 * @returns category config.
 */
export function findSelectCategoryConfig(
  key: Category["key"],
  configs: CategoryConfig[]
): Extract<CategoryConfig, { viewKind?: VIEW_KIND.SELECT }> | undefined {
  return findCategoryConfig(VIEW_KIND.SELECT, key, configs);
}
