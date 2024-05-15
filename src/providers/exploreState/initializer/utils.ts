import { SelectedFilter } from "../../../common/entities";
import { getInitialTableColumnVisibility } from "../../../components/Table/common/utils";
import {
  CategoriesConfig,
  CategoryConfig,
  CategoryGroupConfig,
  EntityConfig,
  SiteConfig,
} from "../../../config/entities";
import { getDefaultSorting } from "../../../config/utils";
import { ExploreState } from "../../exploreState";
import {
  CategoriesConfigKey,
  EntityPageStateMapper,
  EntityStateByCategoriesConfigKey,
} from "../entities";
import { getEntityCategoriesConfigKey, getFilterCount } from "../utils";
import { DEFAULT_ENTITY_STATE, INITIAL_STATE } from "./constants";

/**
 * Returns entity related configured categories config where entity config takes precedence over site config.
 * @param siteConfig - Site config.
 * @param entityConfig - Entity config.
 * @returns entity related categories config.
 */
function getEntityCategoriesConfig(
  siteConfig: SiteConfig,
  entityConfig: EntityConfig
): CategoriesConfig | undefined {
  const siteCategoriesConfig = siteConfig.categoriesConfig;
  const entityCategoriesConfig = entityConfig.categoriesConfig;
  return entityCategoriesConfig ?? siteCategoriesConfig;
}

/**
 * Returns configured grouped configured categories as a list of configured categories.
 * @param categoryGroupConfigs - Configured category groups.
 * @returns a list of configured categories.
 */
function flattenCategoryGroupConfigs(
  categoryGroupConfigs?: CategoryGroupConfig[]
): CategoryConfig[] | undefined {
  return categoryGroupConfigs?.flatMap(
    ({ categoryConfigs }) => categoryConfigs
  );
}

/**
 * Initializes categories config key for the entity.
 * @param siteConfig - Site config.
 * @param entityConfig - Entity config.
 * @returns categories config key.
 */
function initCategoriesConfigKey(
  siteConfig: SiteConfig,
  entityConfig: EntityConfig
): CategoriesConfigKey {
  const categoriesConfig = getEntityCategoriesConfig(siteConfig, entityConfig);
  return categoriesConfig?.key || entityConfig.route;
}

/**
 * Initializes category group configs for the current entity.
 * @param entityStateByCategoriesConfigKey - Entity state by categories config key.
 * @param categoriesConfigKey - Categories config key.
 * @returns category group configs.
 */
function initCategoryGroupConfigs(
  entityStateByCategoriesConfigKey: EntityStateByCategoriesConfigKey,
  categoriesConfigKey: CategoriesConfigKey
): CategoryGroupConfig[] | undefined {
  return entityStateByCategoriesConfigKey.get(categoriesConfigKey)
    ?.categoryGroupConfigs;
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
        categoriesConfigKey: initCategoriesConfigKey(config, entity),
        columnsVisibility: getInitialTableColumnVisibility(entity.list.columns),
        sorting: getDefaultSorting(entity),
      },
    };
  }, {} as EntityPageStateMapper);
}

/**
 * Initializes entity state by categories config key.
 * @param config - Site config.
 * @param categoriesConfigKey - Categories config key.
 * @param filterState - Filter state.
 * @returns entity state by categories config key.
 */
function initEntityStateByCategoriesConfigKey(
  config: SiteConfig,
  categoriesConfigKey: CategoriesConfigKey,
  filterState: SelectedFilter[]
): EntityStateByCategoriesConfigKey {
  const entityStateByCategoriesConfigKey: EntityStateByCategoriesConfigKey =
    new Map();
  for (const entity of config.entities) {
    const categoriesConfig = getEntityCategoriesConfig(config, entity);
    if (!categoriesConfig) continue;
    const { categoryGroupConfigs, key } = categoriesConfig;
    if (entityStateByCategoriesConfigKey.has(key)) continue;
    entityStateByCategoriesConfigKey.set(key, {
      ...DEFAULT_ENTITY_STATE,
      categoryConfigs: flattenCategoryGroupConfigs(categoryGroupConfigs),
      categoryGroupConfigs: categoryGroupConfigs,
      filterState: key === categoriesConfigKey ? filterState : [],
    });
  }
  return entityStateByCategoriesConfigKey;
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
  const categoriesConfigKey = getEntityCategoriesConfigKey(
    entityListType,
    entityPageState
  );
  const entityStateByCategoriesConfigKey = initEntityStateByCategoriesConfigKey(
    config,
    categoriesConfigKey,
    filterState
  );
  const categoryGroupConfigs = initCategoryGroupConfigs(
    entityStateByCategoriesConfigKey,
    categoriesConfigKey
  );
  return {
    ...INITIAL_STATE,
    catalogState: decodedCatalogParam,
    categoryGroupConfigs,
    entityPageState,
    entityStateByCategoriesConfigKey,
    featureFlagState: decodedFeatureFlagParam,
    filterCount: getFilterCount(filterState),
    filterState,
    tabValue: entityListType,
  };
}
