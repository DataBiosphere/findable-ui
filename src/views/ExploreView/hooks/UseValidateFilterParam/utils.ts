import type { SelectedFilter } from "../../../../common/entities";
import type { EntityConfig, SiteConfig } from "../../../../config/entities";
import { getEntityCategoryGroupConfig } from "../../../../providers/exploreState/initializer/utils";

/**
 * Extracts the categoryKey from a validated SelectedFilter entry.
 * @param entry - Validated entry.
 * @returns category key.
 */
export function extractCategoryKey(entry: unknown): string {
  return (entry as SelectedFilter).categoryKey;
}

/**
 * Returns the set of valid category keys for the given entity, derived from
 * the entity's category group config. Returns undefined if no category group
 * config is available (skipping key validation).
 * @param config - Site config.
 * @param entityConfig - Entity config.
 * @returns set of valid category keys, or undefined.
 */
export function getValidCategoryKeys(
  config: SiteConfig,
  entityConfig: EntityConfig,
): Set<string> | undefined {
  const categoryGroupConfig = getEntityCategoryGroupConfig(
    config,
    entityConfig,
  );
  if (!categoryGroupConfig) return undefined;
  const keys = new Set<string>();
  for (const group of categoryGroupConfig.categoryGroups) {
    for (const categoryConfig of group.categoryConfigs) {
      keys.add(categoryConfig.key);
    }
  }
  return keys;
}
