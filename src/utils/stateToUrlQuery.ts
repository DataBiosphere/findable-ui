import { NextRouter } from "next/router";

/**
 * Builds a query object from state for URL parameter synchronization.
 *
 * This function converts a state object into a format compatible with NextRouter query parameters.
 * It handles different value types appropriately:
 *
 * - Undefined values are excluded.
 * - Strings are used as-is (empty strings are excluded).
 * - Arrays are JSON stringified (empty arrays are excluded).
 *
 * @param state - State object containing values to convert to URL parameters.
 * @returns A query object compatible with NextRouter.
 */
export function stateToUrlQuery<
  S extends Record<string, string | unknown[] | undefined>
>(state: S): NextRouter["query"] {
  const query: NextRouter["query"] = {};

  for (const [key, value] of Object.entries(state)) {
    // Handle the undefined case.
    if (value === undefined) continue;

    // Handle the string case.
    if (typeof value === "string") {
      if (!value) continue;
      query[key] = value;
      continue;
    }

    // Handle the array case.
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      query[key] = JSON.stringify(value);
    }
  }

  return query;
}
