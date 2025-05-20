import { UrlObject } from "url";
import { ExploreState } from "../../../exploreState";

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
    query["filter"] = JSON.stringify(exploreState.filterState);
  }

  // Catalog state.
  if (exploreState.catalogState) {
    query["catalog"] = exploreState.catalogState;
  }

  // Feature flag state.
  if (exploreState.featureFlagState) {
    query["ff"] = exploreState.featureFlagState;
  }

  return query;
}
