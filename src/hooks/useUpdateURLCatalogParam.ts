import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { CATALOG_URL_PARAM } from "../providers/catalog/constants";
import { useCatalogParam } from "../providers/catalog/hook";

/**
 * Puts the selected catalog back into the URL when the URL lacks it.
 */
export const useUpdateURLCatalogParams = (): void => {
  const catalog = useCatalogParam();
  // `pathname` is intentionally still read from useRouter() here so it stays as
  // the route pattern (e.g. `/[entityListType]/[entityId]`). The pattern is
  // required by the Router.replace({ pathname, query }) call below — Next.js
  // interpolates dynamic-param keys (entityListType, entityId, …) out of the
  // query into the path. usePathname() would return the already-resolved URL,
  // which on dynamic routes would leave those keys in the query string. The
  // migration to usePathname()/router.replace() is tracked in #930 and #931
  // and will be done together with the Router.replace refactor.
  const { basePath, pathname, query } = useRouter();

  useEffect(() => {
    if (!catalog) return;
    if (query[CATALOG_URL_PARAM] === catalog) return;
    Router.replace({
      pathname: pathname?.replace(basePath, ""),
      query: { ...query, [CATALOG_URL_PARAM]: catalog },
    });
  }, [basePath, catalog, pathname, query]);
};
