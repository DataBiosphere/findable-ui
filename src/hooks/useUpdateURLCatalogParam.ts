import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useExploreState } from "./useExploreState";

/**
 * Updates URL catalog params.
 */
export const useUpdateURLCatalogParams = (): void => {
  const { exploreState } = useExploreState();
  // `pathname` is intentionally still read from useRouter() here so it stays as
  // the route pattern (e.g. `/[entityListType]/[entityId]`). The pattern is
  // required by the Router.replace({ pathname, query }) call below — Next.js
  // interpolates dynamic-param keys (entityListType, entityId, …) out of the
  // query into the path. usePathname() would return the already-resolved URL,
  // which on dynamic routes would leave those keys in the query string. The
  // migration to usePathname()/router.replace() is tracked in #930 and #931
  // and will be done together with the Router.replace refactor.
  const { basePath, pathname, query } = useRouter();
  const { catalogState } = exploreState;

  useEffect(() => {
    if (!catalogState) return;
    if ("catalog" in query && query.catalog === catalogState) return;
    Router.replace({
      pathname: pathname?.replace(basePath, ""),
      query: { ...query, catalog: catalogState },
    });
  }, [basePath, catalogState, pathname, query]);
};
