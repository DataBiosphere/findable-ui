import { NextRouter } from "next/router";
import { ExploreState } from "../../../exploreState";
import { ExploreQueryState } from "./types";

/**
 * Builds a query object from state.
 * State values are expected to be undefined, string, or an array.
 * Undefined values and empty arrays are not included in the query.
 * @param state - State -- partial explore state.
 * @returns A query object.
 */
export function buildQuery(state: ExploreQueryState): NextRouter["query"] {
  const query: NextRouter["query"] = {};

  for (const [key, value] of Object.entries(state)) {
    // Handle the undefined case.
    if (value === undefined) continue;

    // Handle the string case.
    if (typeof value === "string") {
      query[key] = value;
      continue;
    }

    // Handle the array case.
    if (value.length === 0) continue;
    query[key] = JSON.stringify(value);
  }

  return query;
}

/**
 * Extracts URL-relevant values from the ExploreState for query parameter synchronization.
 *
 * This function maps specific properties from the full ExploreState to the
 * ExploreQueryState interface, which contains only the subset of state that
 * should be synchronized with the URL.
 *
 * The extracted properties are:
 * - catalog: Current catalog selection (string | undefined)
 * - entityListType: Current active tab value (string)
 * - ff: Feature flag state (string | undefined)
 * - filter: Applied filters (SelectedFilter[])
 *
 * @param exploreState - Explore state.
 * @returns Subset of state used for URL query parameters.
 */
export function getQueryState(exploreState: ExploreState): ExploreQueryState {
  return {
    catalog: exploreState.catalogState,
    entityListType: exploreState.tabValue,
    ff: exploreState.featureFlagState,
    filter: exploreState.filterState,
  };
}

/**
 * Returns a sorted string representation of a query object.
 * @param query - Query object.
 * @returns Sorted string representation of the query object.
 */
export function stringifyQuery(query: NextRouter["query"]): string {
  return JSON.stringify(
    Object.keys(query)
      .sort()
      .reduce((acc, key) => ({ ...acc, [key]: query[key] }), {})
  );
}
