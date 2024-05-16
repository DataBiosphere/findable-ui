import { SelectedFilter } from "../../../common/entities";
import { getInitialTableColumnVisibility } from "../../../components/Table/common/utils";
import {
  CategoryConfig,
  CategoryGroup,
  CategoryGroupConfig,
  EntityConfig,
  SiteConfig,
} from "../../../config/entities";
import { getDefaultSorting } from "../../../config/utils";
import { ExploreState } from "../../exploreState";
import {
  CategoryGroupConfigKey,
  EntityPageStateMapper,
  EntityStateByCategoryGroupConfigKey,
} from "../entities";
import { getEntityCategoryGroupConfigKey, getFilterCount } from "../utils";
import { DEFAULT_ENTITY_STATE, INITIAL_STATE } from "./constants";

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
    const { categoryGroups, key } = categoryGroupConfig;
    if (entityStateByCategoryGroupConfigKey.has(key)) continue;
    entityStateByCategoryGroupConfigKey.set(key, {
      ...DEFAULT_ENTITY_STATE,
      categoryConfigs: flattenCategoryGroups(categoryGroups),
      categoryGroups,
      filterState: key === categoryGroupConfigKey ? filterState : [],
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
