import { ReadonlyURLSearchParams } from "next/navigation";
import { SEARCH_PARAMETERS } from "./constants";

/**
 * Return a new URLSearchParams object.
 * @param searchParams - Search params.
 * @returns new URLSearchParams object.
 */
function getNewURLSearchParams(
  searchParams: ReadonlyURLSearchParams | null,
): URLSearchParams {
  if (!searchParams) return new URLSearchParams();
  return new URLSearchParams(searchParams.toString());
}

/**
 * Return the search params, for the given search string.
 * Submitting a new search resets pagination to the first page (the start param
 * is dropped) while preserving any active category filter.
 * @param searchParams - Current search params.
 * @param searchStr - Search string.
 * @returns updated search params.
 */
export function getSearchParams(
  searchParams: ReadonlyURLSearchParams | null,
  searchStr: string,
): URLSearchParams {
  const params = getNewURLSearchParams(searchParams);
  params.set(SEARCH_PARAMETERS.QUERY, searchStr);
  params.delete(SEARCH_PARAMETERS.START);
  return params;
}
