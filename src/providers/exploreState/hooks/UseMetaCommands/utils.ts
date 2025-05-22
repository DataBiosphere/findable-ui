import { UrlObject } from "url";
import { ExploreState } from "../../../exploreState";
import { EXPLORE_URL_PARAMS } from "../../../exploreState/constants";

/**
 * Builds a query object from the current explore state.
 * Contains catalog, feature flag, filter, and entity list type.
 * @param exploreState - The current explore state.
 * @returns A query object.
 */
export function buildQuery(exploreState: ExploreState): UrlObject["query"] {
  const query: UrlObject["query"] = {};

  // Entity list type.
  query["entityListType"] = exploreState.tabValue;

  // Filter state.
  if (exploreState.filterState.length > 0) {
    query[EXPLORE_URL_PARAMS.FILTER] = JSON.stringify(exploreState.filterState);
  }

  // Catalog state.
  if (exploreState.catalogState) {
    query[EXPLORE_URL_PARAMS.CATALOG] = exploreState.catalogState;
  }

  // Feature flag state.
  if (exploreState.featureFlagState) {
    query[EXPLORE_URL_PARAMS.FEATURE_FLAG] = exploreState.featureFlagState;
  }

  return query;
}
