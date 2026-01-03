import { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";
import { DEFAULT_CURSOR } from "./constants";
import { Cursor } from "./types";

/**
 * Build cursor from Azul API response.
 *
 * @param data - Azul API response.
 * @returns Cursor.
 */
export function buildCursor<T>(data?: AzulEntitiesResponse<T>): Cursor {
  if (!data) return DEFAULT_CURSOR;
  const { pagination } = data;
  const { next, previous } = pagination;

  return {
    search_after: extractCursor("search_after", next),
    search_before: extractCursor("search_before", previous),
  };
}

/**
 * Extract cursor from Azul API response.
 *
 * @param param - Parameter name.
 * @param url - Next or previous URL.
 * @returns Cursor.
 */
function extractCursor(
  param: "search_after" | "search_before",
  url: string | null | undefined,
): string | undefined {
  if (!url) return;

  return new URL(url).searchParams.get(param) ?? undefined;
}

/**
 * Returns the appropriate cursor search params based on pagination movement.
 *
 * @param prevPageIndex - Previous index.
 * @param nextPageIndex - Next index.
 * @param cursor - Cursor values `search_after` and `search_before`.
 * @returns Object containing `search_after` or `search_before` (or neither).
 */
export function getCursor(
  prevPageIndex: number,
  nextPageIndex: number,
  cursor: Cursor,
): Cursor {
  if (nextPageIndex === 0) return DEFAULT_CURSOR;

  if (nextPageIndex > prevPageIndex)
    return { search_after: cursor.search_after, search_before: undefined };

  if (nextPageIndex < prevPageIndex)
    return { search_after: undefined, search_before: cursor.search_before };

  return DEFAULT_CURSOR;
}
