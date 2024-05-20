import { SelectCategory, SelectedFilter } from "../../../common/entities";
import { getInitialTableColumnVisibility } from "../../../components/Table/common/utils";
import {
  CategoryConfig,
  CategoryGroup,
  CategoryGroupConfig,
  EntityConfig,
  SavedFilter,
  SiteConfig,
} from "../../../config/entities";
import { getDefaultSorting } from "../../../config/utils";
import { ExploreState } from "../../exploreState";
import { SELECT_CATEGORY_KEY } from "../constants";
import {
  CategoryGroupConfigKey,
  EntityPageStateMapper,
  EntityStateByCategoryGroupConfigKey,
  SavedStateByCategoryValueKey,
} from "../entities";
import { getEntityCategoryGroupConfigKey, getFilterCount } from "../utils";
import { DEFAULT_ENTITY_STATE, INITIAL_STATE } from "./constants";

/**
 * Builds category groups from the given category group config (adds the saved filters category to the category groups).
 * @param categoryGroupConfig - Category group config.
 * @returns category groups with saved filters category.
 */
function buildCategoryGroups(
  categoryGroupConfig: CategoryGroupConfig
): CategoryGroup[] {
  const { categoryGroups, savedFilters } = categoryGroupConfig;
  if (!savedFilters) return categoryGroups;
  const clonedCategoryGroups = [...categoryGroups];
  const savedFiltersCategoryGroup: CategoryGroup = {
    categoryConfigs: [
      { key: SELECT_CATEGORY_KEY.SAVED_FILTERS, label: "Saved Filters" },
    ],
  };
  clonedCategoryGroups.unshift(savedFiltersCategoryGroup);
  return clonedCategoryGroups;
}

/**
 * Returns the saved filters as select categories.
 * @param savedFilters - Saved filters.
 * @returns select categories.
 */
function buildSavedSelectCategories(
  savedFilters?: SavedFilter[]
): SelectCategory[] {
  if (!savedFilters) return [];
  return [
    {
      key: SELECT_CATEGORY_KEY.SAVED_FILTERS,
      label: "", // Label is applied in filter hook where it has access to the config.
      values: savedFilters.map(({ title }) => ({
        count: 1,
        key: title,
        label: title,
        selected: false, // Selected state updated in filter hook.
      })),
    },
  ];
}

/**
 * Builds saved state by category value key.
 * @param savedFilters - Saved filters.
 * @returns saved state by category value key.
 */
function buildSavedStateByCategoryValueKey(
  savedFilters?: SavedFilter[]
): SavedStateByCategoryValueKey | undefined {
  if (!savedFilters) return;
  const savedStateByCategoryValueKey: SavedStateByCategoryValueKey = new Map();
  for (const { filters, sort, title } of savedFilters) {
    const sorting = sort ? [sort] : undefined;
    savedStateByCategoryValueKey.set(title, { filters, sorting });
  }
  return savedStateByCategoryValueKey;
}

/**
 * Returns entity related configured category group config where entity config takes precedence over site config.
 * @param siteConfig - Site config.
 * @param entityConfig - Entity config.
 * @returns entity related category group config.
 */
function getEntityCategoryGroupConfig(
  siteConfig: SiteConfig,
  entityConfig: EntityConfig
): CategoryGroupConfig | undefined {
  const siteCategoryGroupConfig = siteConfig.categoryGroupConfig;
  const entityCategoryGroupConfig = entityConfig.categoryGroupConfig;
  return entityCategoryGroupConfig ?? siteCategoryGroupConfig;
}

/**
 * Returns configured category groups as a list of configured categories.
 * @param categoryGroups - Configured category groups.
 * @returns a list of configured categories.
 */
function flattenCategoryGroups(
  categoryGroups?: CategoryGroup[]
): CategoryConfig[] | undefined {
  return categoryGroups?.flatMap(({ categoryConfigs }) => categoryConfigs);
}

/**
 * Initializes category group config key for the entity.
 * @param siteConfig - Site config.
 * @param entityConfig - Entity config.
 * @returns category group config key.
 */
function initCategoryGroupConfigKey(
  siteConfig: SiteConfig,
  entityConfig: EntityConfig
): CategoryGroupConfigKey {
  const categoryGroupConfig = getEntityCategoryGroupConfig(
    siteConfig,
    entityConfig
  );
  return categoryGroupConfig?.key || entityConfig.route;
}

/**
 * Initializes category groups for the current entity.
 * @param entityStateByCategoryGroupConfigKey - Entity state by category group config key.
 * @param categoryGroupConfigKey - Category group config key.
 * @returns category groups.
 */
function initCategoryGroups(
  entityStateByCategoryGroupConfigKey: EntityStateByCategoryGroupConfigKey,
  categoryGroupConfigKey: CategoryGroupConfigKey
): CategoryGroup[] | undefined {
  return entityStateByCategoryGroupConfigKey.get(categoryGroupConfigKey)
    ?.categoryGroups;
}

/**
 * Initializes entity page state.
 * @param config - Site config.
 * @returns entity page state.
 */
function initEntityPageState(config: SiteConfig): EntityPageStateMapper {
  return config.entities.reduce((acc, entity): EntityPageStateMapper => {
    return {
      ...acc,
      [entity.route]: {
        categoryGroupConfigKey: initCategoryGroupConfigKey(config, entity),
        columnsVisibility: getInitialTableColumnVisibility(entity.list.columns),
        sorting: getDefaultSorting(entity),
      },
    };
  }, {} as EntityPageStateMapper);
}

/**
 * Initializes entity state by category group config key.
 * @param config - Site config.
 * @param categoryGroupConfigKey - Category group config key.
 * @param filterState - Filter state.
 * @returns entity state by category group config key.
 */
function initEntityStateByCategoryGroupConfigKey(
  config: SiteConfig,
  categoryGroupConfigKey: CategoryGroupConfigKey,
  filterState: SelectedFilter[]
): EntityStateByCategoryGroupConfigKey {
  const entityStateByCategoryGroupConfigKey: EntityStateByCategoryGroupConfigKey =
    new Map();
  for (const entity of config.entities) {
    const categoryGroupConfig = getEntityCategoryGroupConfig(config, entity);
    if (!categoryGroupConfig) continue;
    const { key, savedFilters } = categoryGroupConfig;
    if (entityStateByCategoryGroupConfigKey.has(key)) continue;
    const categoryGroups = buildCategoryGroups(categoryGroupConfig);
    const savedSelectCategories: SelectCategory[] =
      buildSavedSelectCategories(savedFilters);
    const savedStateByCategoryValueKey =
      buildSavedStateByCategoryValueKey(savedFilters);
    entityStateByCategoryGroupConfigKey.set(key, {
      ...DEFAULT_ENTITY_STATE,
      categoryConfigs: flattenCategoryGroups(categoryGroups),
      categoryGroups,
      filterState: key === categoryGroupConfigKey ? filterState : [],
      savedSelectCategories,
      savedStateByCategoryValueKey,
    });
  }
  return entityStateByCategoryGroupConfigKey;
}

/**
 * Initializes filter state from URL "filter" parameter.
 * @param decodedFilterParam - Decoded filter parameter.
 * @returns filter state.
 */
function initFilterState(decodedFilterParam: string): SelectedFilter[] {
  // Define filter state, from URL "filter" parameter, if present and valid.
  let filterState: SelectedFilter[] = [];
  try {
    filterState = JSON.parse(decodedFilterParam);
  } catch {
    // do nothing
  }
  return filterState;
}

/**
 * Returns the explore state reducer initial arguments.
 * @param config - Site config.
 * @param entityListType - Entity list type.
 * @param decodedFilterParam - Decoded filter parameter.
 * @param decodedCatalogParam - Decoded catalog parameter.
 * @param decodedFeatureFlagParam - Decoded feature flag parameter.
 * @returns explore state reducer initial arguments.
 */
export function initReducerArguments(
  config: SiteConfig,
  entityListType: string,
  decodedFilterParam: string,
  decodedCatalogParam?: string,
  decodedFeatureFlagParam?: string
): ExploreState {
  const filterState = initFilterState(decodedFilterParam);
  const entityPageState = initEntityPageState(config);
  const categoryGroupConfigKey = getEntityCategoryGroupConfigKey(
    entityListType,
    entityPageState
  );
  const entityStateByCategoryGroupConfigKey =
    initEntityStateByCategoryGroupConfigKey(
      config,
      categoryGroupConfigKey,
      filterState
    );
  const categoryGroups = initCategoryGroups(
    entityStateByCategoryGroupConfigKey,
    categoryGroupConfigKey
  );
  return {
    ...INITIAL_STATE,
    catalogState: decodedCatalogParam,
    categoryGroups,
    entityPageState,
    entityStateByCategoryGroupConfigKey,
    featureFlagState: decodedFeatureFlagParam,
    filterCount: getFilterCount(filterState),
    filterState,
    tabValue: entityListType,
  };
}
