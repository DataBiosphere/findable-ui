import { NextRouter } from "next/router";
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
