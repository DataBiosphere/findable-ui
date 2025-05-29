import Router from "next/router";
import { DataDictionaryState } from "../dataDictionary/types";
import { buildQuery } from "./utils";

/**
 * Updates the URL query parameters based on the current data dictionary state.
 * Pushes or replaces the query to the router.
 * @param dataDictionaryState - Data dictionary state.
 * @param method - "push" or "replace".
 */
export function updateUrlFromState(
  dataDictionaryState: Pick<DataDictionaryState, "columnFilters">,
  method: "push" | "replace" = "push"
): void {
  // Build the query object.
  const query = buildQuery(dataDictionaryState);

  // Push or replace the query to the router.
  Router[method]({ query }, undefined, { shallow: true });
}
