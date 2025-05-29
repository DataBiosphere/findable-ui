import Router, { NextRouter } from "next/router";
import { ExploreQueryState } from "./types";
import { buildQuery, stringifyQuery } from "./utils";

/**
 * Updates the URL query parameters based on state.
 * Pushes or replaces the query to the router.
 * @param state - State -- partial explore state.
 * @param currentQuery - Query -- current.
 * @param method - "push" or "replace".
 */
export function updateUrlFromState(
  state: ExploreQueryState,
  currentQuery: NextRouter["query"],
  method: "push" | "replace" = "push"
): void {
  // Build the next query.
  const query = buildQuery(state);

  // Do nothing if the next query is the same as the current query.
  if (stringifyQuery(query) === stringifyQuery(currentQuery)) return;

  // Push or replace the query to the router.
  Router[method]({ query }, undefined, { shallow: true });
}
