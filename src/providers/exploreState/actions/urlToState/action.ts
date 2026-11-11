import {
  CatalogState,
  ExploreState,
  FeatureFlagState,
} from "../../../exploreState";
import { EXPLORE_URL_PARAMS } from "../../../exploreState/constants";
import { buildNextEntities } from "../../entities/state";
import {
  getEntityCategoryGroupConfigKey,
  getFilterCount,
  resetPage,
  updateEntityStateByCategoryGroupConfigKey,
} from "../../utils";
import { UrlToStatePayload } from "./types";
import { decodeFilterParamValue } from "./utils";

/**
 * Reducer function to handle the "URL >> state sync" action. The URL's catalog or filters differ from state (e.g. after back/forward navigation), so the current entity's table returns to its first page: a pagination link from the previous result set must not be requested. Selecting another entity resets the page itself.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function urlToStateAction(
  state: ExploreState,
  payload: UrlToStatePayload,
): ExploreState {
  const { query } = payload;

  // Get the entity list type from the query.
  const { entityListType } = query;

  // If the entityListType is not a string, return the current state.
  if (typeof entityListType !== "string") return state;

  // Decode the catalog param value to catalog state.
  const catalogState = query[EXPLORE_URL_PARAMS.CATALOG] as CatalogState;

  // Decode the filter param value to selected filters.
  const filterState = decodeFilterParamValue(query[EXPLORE_URL_PARAMS.FILTER]);

  // Decode the feature flag param value to feature flag state.
  const featureFlagState = query[
    EXPLORE_URL_PARAMS.FEATURE_FLAG
  ] as FeatureFlagState;

  // Grab the category group config key for the entityListType.
  const categoryGroupConfigKey = getEntityCategoryGroupConfigKey(
    entityListType,
    state.entityPageState,
  );

  // Update the entity state by category group config key.
  updateEntityStateByCategoryGroupConfigKey(
    state,
    { filterState, savedFilterState: [] },
    categoryGroupConfigKey,
  );

  return {
    ...state,
    catalogState,
    entities: buildNextEntities(
      { ...state, catalogState, featureFlagState },
      entityListType,
      { filterState },
    ),
    featureFlagState,
    filterCount:
      entityListType === state.tabValue
        ? getFilterCount(filterState, state.categoryGroups)
        : state.filterCount,
    filterState:
      entityListType === state.tabValue ? filterState : state.filterState,
    paginationState:
      entityListType === state.tabValue
        ? resetPage(state.paginationState)
        : state.paginationState,
  };
}
