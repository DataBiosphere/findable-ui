import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { LIST_URL_PARAM } from "../../common/constants";
import { SelectedFilter } from "../../common/entities";
import { useCatalogParam } from "../../providers/catalog/hook";
import { useOptionalExploreOrigin } from "../../providers/exploreOrigin/hook";
import { EXPLORE_URL_PARAMS } from "../../providers/exploreState/constants";

/**
 * Returns the params whose value is set but differs from the URL's.
 * @param query - Router query.
 * @param params - Param values keyed by param name; undefined when there is nothing to put back.
 * @returns The params to put back into the URL.
 */
function getChangedParams(
  query: Record<string, string | string[] | undefined>,
  params: Record<string, string | undefined>,
): Record<string, string> {
  const changedParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || query[key] === value) continue;
    changedParams[key] = value;
  }
  return changedParams;
}

/**
 * Puts the selected catalog, the explore origin and, when given, the filters into the URL when the URL lacks them or
 * has a different value, in one replace. The URL's other params are kept. A param whose provider isn't mounted, or an
 * empty filter state, is left alone.
 * @param filterState - Filters to keep in the URL, e.g. on the export pages.
 */
export const useUpdateURLParams = (filterState?: SelectedFilter[]): void => {
  const catalog = useCatalogParam();
  const exploreOrigin = useOptionalExploreOrigin();
  const filter = filterState?.length ? JSON.stringify(filterState) : undefined;
  // `pathname` is intentionally still read from useRouter() here so it stays as
  // the route pattern (e.g. `/[entityListType]/[entityId]`). The pattern is
  // required by the Router.replace({ pathname, query }) call below — Next.js
  // interpolates dynamic-param keys (entityListType, entityId, …) out of the
  // query into the path. usePathname() would return the already-resolved URL,
  // which on dynamic routes would leave those keys in the query string. The
  // migration to usePathname()/router.replace() is tracked in #930 and #931
  // and will be done together with the Router.replace refactor.
  const { basePath, isReady, pathname, query } = useRouter();

  useEffect(() => {
    // The router's query is incomplete until it is ready.
    if (!isReady) return;
    const changedParams = getChangedParams(query, {
      [EXPLORE_URL_PARAMS.CATALOG]: catalog,
      [EXPLORE_URL_PARAMS.FILTER]: filter,
      [LIST_URL_PARAM]: exploreOrigin,
    });
    if (Object.keys(changedParams).length === 0) return;
    // Shallow: adding params must not re-run the page's data fetching.
    Router.replace(
      {
        pathname: pathname?.replace(basePath, ""),
        query: { ...query, ...changedParams },
      },
      undefined,
      { shallow: true },
    );
  }, [basePath, catalog, exploreOrigin, filter, isReady, pathname, query]);
};
