import Router from "next/router";
import { ExploreState } from "../../../exploreState";
import { buildQuery } from "./utils";

/**
 * Updates the URL query parameters for the entity list page based on the current explore state.
 * Pushes the query to the router.
 * @param exploreState - The current explore state.
 */
export function navigateToFilters(exploreState: ExploreState): void {
  // Build the query object.
  const query = buildQuery(exploreState);

  // Push the query to the router.
  Router.push({ query }, undefined, { shallow: true });
}

/**
 * Updates the URL query parameters for the entity list page based on the current explore state.
 * Replaces the query to the router.
 * @param exploreState - The current explore state.
 */
export function replaceToFilters(exploreState: ExploreState): void {
  // Build the query object.
  const query = buildQuery(exploreState);

  // Replace the query to the router.
  Router.replace({ query }, undefined, { shallow: true });
}
