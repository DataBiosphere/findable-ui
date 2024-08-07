import { ReadonlyURLSearchParams } from "next/navigation";
import { QUERY_PARAM } from "./constants";

/**
 * Return the search params, for the given search string.
 * @param searchParams - Current search params.
 * @param searchStr - Search string.
 * @returns updated search params.
 */
export function getSearchParams(
  searchParams: ReadonlyURLSearchParams,
  searchStr: string
): URLSearchParams {
  const params = new URLSearchParams(searchParams.toString());
  params.set(QUERY_PARAM, searchStr);
  return params;
}
