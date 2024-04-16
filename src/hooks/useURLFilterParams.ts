import { useRouter } from "next/router";
import { useCallback } from "react";
import { SelectedFilter } from "../common/entities";
import { CatalogState } from "../providers/exploreState";
import { useLocation } from "./useLocation";

interface UseURLFilterParamsResult {
  decodedCatalogParam: string | undefined;
  decodedFilterParam: string;
  updateFilterQueryString: (
    catalogState: CatalogState,
    filterState: SelectedFilter[]
  ) => void;
}

/**
 * useURLFilterParams hook is used to keep track of the url search params, and update them,
 * if needed
 * @returns an object containing a update function and the current filter
 */
export const useURLFilterParams = (): UseURLFilterParamsResult => {
  const { basePath, push } = useRouter();
  const { href, pathname, search } = useLocation() || {};
  const filterParam = search?.get("filter") ?? "[]";
  const catalogParam = search?.get("catalog") ?? undefined;

  const updateFilterQueryString = useCallback(
    (catalogState: CatalogState, filterState: SelectedFilter[]) => {
      if (
        catalogParam !== catalogState ||
        filterParam !== JSON.stringify(filterState)
      ) {
        const filter =
          filterState.length > 0 ? { filter: JSON.stringify(filterState) } : {};
        const catalog = catalogState ? { catalog: catalogState } : {};
        push(
          {
            pathname: pathname?.replace(basePath, ""),
            query: { ...catalog, ...filter },
          },
          undefined,
          {
            shallow: true,
          }
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- push method isn't memoized and shouldn't be added as deps https://github.com/vercel/next.js/issues/18127
    [catalogParam, filterParam, href]
  );

  return {
    decodedCatalogParam: catalogParam,
    decodedFilterParam: filterParam,
    updateFilterQueryString,
  };
};
