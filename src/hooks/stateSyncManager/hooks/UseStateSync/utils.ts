import { NextRouter } from "next/router";
import { NextHistoryState } from "../../../../services/beforePopState/types";

/**
 * Returns true if the query object has any of the specified keys.
 * @param query - Query object.
 * @param paramKeys - Array of parameter keys to check.
 * @returns True if the query object has any of the specified keys.
 */
export function hasParams(
  query: NextRouter["query"],
  paramKeys: string[]
): boolean {
  return paramKeys.some((key) => query[key] !== undefined);
}

/**
 * Returns true if the two query objects are equal.
 * @param queryA - Query object.
 * @param queryB - Query object.
 * @returns True if the two query objects are equal.
 */
export function isSynced(
  queryA: NextRouter["query"],
  queryB: NextRouter["query"]
): boolean {
  return stringifyQuery(queryA) === stringifyQuery(queryB);
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

/**
 * Returns true if the URL was navigated to using the back/forward buttons.
 * @param pathname - Pathname.
 * @param nextHistoryState - Next history state.
 * @returns True if the URL was navigated to using the back/forward buttons.
 */
export function wasPop(
  pathname: string,
  nextHistoryState: NextHistoryState | undefined
): boolean {
  if (!nextHistoryState) return false;
  const [path] = nextHistoryState.url.split("?");
  return path === pathname;
}
