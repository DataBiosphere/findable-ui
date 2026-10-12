import { AZUL_PARAM } from "../apis/azul/common/entities";
import { transformFilters } from "../apis/azul/common/filterTransformer";
import { Filters } from "../common/entities";

/**
 * Custom search parameters added to the request query string.
 */
export interface SearchParams {
  size: string;
}

/**
 * Build up URL query string for the given search results and custom search parameters.
 * @param filters - Selected filters.
 * @param catalog - Configured catalog.
 * @param searchParams - Custom search parameters, e.g. "size".
 * @returns URL query string.
 */
export const fetchQueryParams = (
  filters: Filters,
  catalog: string,
  searchParams: SearchParams | undefined,
): URLSearchParams => {
  // Build request params.
  return new URLSearchParams({
    [AZUL_PARAM.CATALOG]: catalog,
    [AZUL_PARAM.FILTERS]: transformFilters(filters),
    ...searchParams,
  });
};
