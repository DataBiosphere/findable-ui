import { UrlObject } from "url";
import { DataDictionaryState } from "../dataDictionary/types";

/**
 * Builds a query object from the current data dictionary state.
 * @param dataDictionaryState - Data dictionary state.
 * @returns A query object.
 */
export function buildQuery(
  dataDictionaryState: Pick<DataDictionaryState, "columnFilters">
): UrlObject["query"] {
  const query: UrlObject["query"] = {};

  // Filter state.
  if (dataDictionaryState.columnFilters.length > 0) {
    query["filter"] = JSON.stringify(dataDictionaryState.columnFilters);
  }

  return query;
}
