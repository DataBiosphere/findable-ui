import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { FROM_URL_PARAM } from "../../common/constants";
import { CATALOG_URL_PARAM } from "../../providers/catalog/constants";
import { useCatalogParam } from "../../providers/catalog/hook";
import { useOptionalExploreOrigin } from "../../providers/exploreOrigin/hook";

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
 * Puts the selected catalog and the explore origin back into the URL when the URL lacks them, in one replace. A param
 * whose provider isn't mounted is left alone.
 */
export const useUpdateURLParams = (): void => {
  const catalog = useCatalogParam();
  const exploreOrigin = useOptionalExploreOrigin();
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
      [CATALOG_URL_PARAM]: catalog,
      [FROM_URL_PARAM]: exploreOrigin,
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
  }, [basePath, catalog, exploreOrigin, isReady, pathname, query]);
};
