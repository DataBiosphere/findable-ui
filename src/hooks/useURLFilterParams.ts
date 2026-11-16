import { useRouter } from "next/router";
import { useCallback } from "react";
import { FROM_URL_PARAM } from "../common/constants";
import { SelectedFilter } from "../common/entities";
import { CATALOG_URL_PARAM } from "../providers/catalog/constants";
import { useLocation } from "./useLocation";

interface UseURLFilterParamsResult {
  decodedFilterParam: string;
  updateFilterQueryString: (
    catalog: string | undefined,
    exploreOrigin: string,
    filterState: SelectedFilter[],
  ) => void;
}

/**
 * useURLFilterParams hook is used to keep track of the url search params, and update them,
 * if needed
 * @deprecated - Avoid using this hook if possible; we intend on using ExploreState actions to manage URL state.
 * @returns an object containing a update function and the current filter
 */
export const useURLFilterParams = (): UseURLFilterParamsResult => {
  const { basePath, replace } = useRouter();
  const { href, pathname, search } = useLocation() || {};
  const filterParam = search?.get("filter") ?? "[]";
  const catalogParam = search?.get(CATALOG_URL_PARAM) ?? undefined;
  const exploreOriginParam = search?.get(FROM_URL_PARAM) ?? undefined;

  const updateFilterQueryString = useCallback(
    (
      catalog: string | undefined,
      exploreOrigin: string,
      filterState: SelectedFilter[],
    ) => {
      if (
        catalogParam !== catalog ||
        exploreOriginParam !== exploreOrigin ||
        filterParam !== JSON.stringify(filterState)
      ) {
        const filter =
          filterState.length > 0 ? { filter: JSON.stringify(filterState) } : {};
        // Replace, not push: the URL catches up with state, so Back must not return to a URL this would rewrite again.
        replace(
          {
            pathname: pathname?.replace(basePath, ""),
            query: {
              ...(catalog ? { [CATALOG_URL_PARAM]: catalog } : {}),
              [FROM_URL_PARAM]: exploreOrigin,
              ...filter,
            },
          },
          undefined,
          {
            shallow: true,
          },
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- replace method isn't memoized and shouldn't be added as deps https://github.com/vercel/next.js/issues/18127
    [catalogParam, exploreOriginParam, filterParam, href],
  );

  return {
    decodedFilterParam: filterParam,
    updateFilterQueryString,
  };
};
