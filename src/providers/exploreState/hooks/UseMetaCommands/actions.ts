import Router from "next/router";
import { ExploreState } from "../../../exploreState";
import { buildQuery } from "./utils";

/**
 * Updates the URL query parameters based on the current explore state.
 * @param exploreState - The current explore state.
 */
export function navigateToFilters(exploreState: ExploreState): void {
  // Build the query object.
  const query = buildQuery(exploreState);

  // Push the query to the router.
  Router.push({ query }, undefined, { shallow: true });
}

/**
 * Updates the URL query parameters based on the current explore state.
 * @param exploreState - The current explore state.
 */
export function replaceToFilters(exploreState: ExploreState): void {
  // Build the query object.
  const query = buildQuery(exploreState);

  // Replace the query to the router.
  Router.replace({ query }, undefined, { shallow: true });
}
