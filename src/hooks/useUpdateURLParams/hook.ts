import { useRouter } from "next/router";
import { useEffect } from "react";
import { LIST_URL_PARAM } from "../../common/constants";
import { SelectedFilter } from "../../common/entities";
import { useCatalogParam } from "../../providers/catalog/hook";
import { useOptionalExploreList } from "../../providers/exploreList/hook";
import { EXPLORE_URL_PARAMS } from "../../providers/exploreState/constants";
import { getChangedParams, replaceURLParams } from "./utils";

/**
 * Puts the selected catalog, the explore list and, when given, the filters into the URL when the URL lacks them or
 * has a different value, in one shallow replace. The URL's other params and its fragment are kept. A param whose
 * provider isn't mounted, or an empty filter state, is left alone. The replace is dropped if the browser leaves the
 * page before it writes history, so a quick Back isn't undone.
 * @param filterState - Filters to keep in the URL, e.g. on the export pages.
 */
export const useUpdateURLParams = (filterState?: SelectedFilter[]): void => {
  const catalog = useCatalogParam();
  const exploreList = useOptionalExploreList();
  const filter = filterState?.length ? JSON.stringify(filterState) : undefined;
  const { asPath, basePath, isReady, pathname, query } = useRouter();

  useEffect(() => {
    // The router's query is incomplete until it is ready.
    if (!isReady) return;
    const changedParams = getChangedParams(query, {
      [EXPLORE_URL_PARAMS.CATALOG]: catalog,
      [EXPLORE_URL_PARAMS.FILTER]: filter,
      [LIST_URL_PARAM]: exploreList,
    });
    if (Object.keys(changedParams).length === 0) return;
    replaceURLParams({ asPath, basePath, pathname, query }, changedParams);
  }, [
    asPath,
    basePath,
    catalog,
    exploreList,
    filter,
    isReady,
    pathname,
    query,
  ]);
};
