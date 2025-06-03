import { NextRouter } from "next/router";
import { SelectedFilter } from "../../../../common/entities";
import { EntityState } from "../types";

/**
 * Builds a query object from entity related state.
 * State values are expected to be undefined, string, or an array.
 * Undefined values and empty arrays are not included in the query.
 * @param entityListType - Entity list type.
 * @param state - Entity related state.
 * @returns A query object.
 */
export function buildQuery(
  entityListType: string,
  state: EntityState
): NextRouter["query"] {
  const query: NextRouter["query"] = {};

  for (const [key, value] of Object.entries(
    getQueryState(entityListType, state)
  )) {
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
 * - entityListType: Entity list type (string)
 * - ff: Feature flag state (string | undefined)
 * - filter: Applied filters (SelectedFilter[])
 *
 * @param entityListType - Entity list type.
 * @param state - Entity related state.
 * @returns Subset of state used for URL query parameters.
 */
export function getQueryState(
  entityListType: string,
  state: EntityState
): Record<string, string | SelectedFilter[] | undefined> {
  return {
    catalog: state.catalogState,
    entityListType,
    ff: state.featureFlagState,
    filter: state.filterState,
  };
}
