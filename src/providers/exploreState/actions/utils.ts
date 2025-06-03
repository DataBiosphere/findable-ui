import { NextRouter } from "next/router";
import { SelectedFilter } from "../../../common/entities";
import { ExploreState } from "../../exploreState";

/**
 * Builds a query object from state.
 * State values are expected to be undefined, string, or an array.
 * Undefined values and empty arrays are not included in the query.
 * @param exploreState - State.
 * @returns A query object.
 */
export function buildQuery(
  exploreState: Partial<ExploreState>
): NextRouter["query"] {
  const query: NextRouter["query"] = {};

  for (const [key, value] of Object.entries(getQueryState(exploreState))) {
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
export function getQueryState(
  exploreState: Partial<ExploreState>
): Record<string, string | SelectedFilter[] | undefined> {
  return {
    catalog: exploreState.catalogState,
    entityListType: exploreState.tabValue,
    ff: exploreState.featureFlagState,
    filter: exploreState.filterState,
  };
}
