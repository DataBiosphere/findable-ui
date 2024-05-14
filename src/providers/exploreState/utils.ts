import { SelectedFilter } from "../../common/entities";
import { getInitialTableColumnVisibility } from "../../components/Table/common/utils";
import {
  CategoryConfig,
  CategoryGroupConfig,
  SiteConfig,
} from "../../config/entities";
import { getDefaultSorting } from "../../config/utils";
import {
  EntityPageState,
  EntityPageStateMapper,
  ENTITY_VIEW,
  ExploreState,
  PaginationState,
} from "../exploreState";
import { INITIAL_STATE } from "./constants";

/**
 * Returns the filter count.
 * @param filterState - Filter state.
 * @returns filter count.
 */
export function getFilterCount(filterState: SelectedFilter[]): number {
  return filterState.reduce((acc, filter) => acc + filter.value.length, 0);
}

/**
 * Returns the initial explore state.
 * @param config - Site config.
 * @param entityListType - Entity list type.
 * @param decodedFilterParam - Decoded filter parameter.
 * @param decodedCatalogParam - Decoded catalog parameter.
 * @param decodedFeatureFlagParam - Decoded feature flag parameter.
 * @returns explore state.
 */
export function initExploreState(
  config: SiteConfig,
  entityListType: string,
  decodedFilterParam: string,
  decodedCatalogParam?: string,
  decodedFeatureFlagParam?: string
): ExploreState {
  const entityPageState = initEntityPageState(config);
  const filterState = initFilterState(decodedFilterParam);
  const filterCount = getFilterCount(filterState);
  return {
    ...INITIAL_STATE,
    catalogState: decodedCatalogParam,
    categoryGroupConfigs: entityPageState[entityListType].categoryGroupConfigs,
    entityPageState: updateEntityPageState(entityListType, entityPageState, {
      filterCount,
      filterState,
    }),
    featureFlagState: decodedFeatureFlagParam,
    filterCount,
    filterState,
    listView: ENTITY_VIEW.EXACT,
    tabValue: entityListType,
  };
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
 * Initializes filter state from URL "filter" parameter.
 * @param decodedFilterParam - Decoded filter parameter.
 * @returns filter state.
 */
export function initFilterState(decodedFilterParam: string): SelectedFilter[] {
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
 * Initializes entity page state.
 * @param config - Site config.
 * @returns entity page state.
 */
export function initEntityPageState(config: SiteConfig): EntityPageStateMapper {
  const { categoriesConfig } = config;
  const { categoryGroupConfigs } = categoriesConfig || {};
  return config.entities.reduce(
    (acc, entity): EntityPageStateMapper => ({
      ...acc,
      [entity.route]: {
        categoryConfigs: flattenCategoryGroupConfigs(
          entity.categoriesConfig?.categoryGroupConfigs ?? categoryGroupConfigs
        ),
        categoryGroupConfigs:
          entity.categoriesConfig?.categoryGroupConfigs ?? categoryGroupConfigs,
        categoryViews: [],
        columnsVisibility: getInitialTableColumnVisibility(entity.list.columns),
        filterCount: 0,
        filterState: [],
        sorting: getDefaultSorting(entity),
      },
    }),
    {} as EntityPageStateMapper
  );
}

/**
 * Resets pagination.
 * @param paginationState - Pagination state.
 * @returns a reset pagination state.
 */
export function resetPage(paginationState: PaginationState): PaginationState {
  const nextPaginationState = { ...paginationState };
  nextPaginationState.index = null;
  nextPaginationState.currentPage = 1;
  return nextPaginationState;
}

/**
 * Updates entity page state for the given entity type.
 * @param entityListType - Entity list type.
 * @param entityPageState - Entity page state.
 * @param nextEntityPageState - Partial next entity page state.
 * @returns updated entity page state.
 */
export function updateEntityPageState(
  entityListType: string,
  entityPageState: EntityPageStateMapper,
  nextEntityPageState: Partial<EntityPageState>
): EntityPageStateMapper {
  return {
    ...entityPageState,
    [entityListType]: {
      ...entityPageState[entityListType],
      ...nextEntityPageState,
    },
  };
}
