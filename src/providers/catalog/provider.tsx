import { useRouter } from "next/router";
import { JSX, useMemo, useState } from "react";
import { CATALOG_URL_PARAM } from "./constants";
import { CatalogContext } from "./context";
import type { CatalogProviderProps } from "./types";
import { getCatalogParam, getLocationCatalogParam } from "./utils";

/**
 * Holds the catalog selected by the `catalog` URL param, for every page. Mount it
 * in `_app`, inside the config provider, when the site uses the `catalog` param.
 * The catalog starts from the URL and follows changes to the param. A URL without
 * the param keeps the current catalog, so moving between pages doesn't lose it.
 * @param props - Provider props.
 * @param props.children - Children.
 * @returns The provider element.
 */
export function CatalogProvider({
  children,
}: CatalogProviderProps): JSX.Element {
  const { query } = useRouter();
  const [catalog, setCatalog] = useState(getLocationCatalogParam);
  const catalogParam = getCatalogParam(query[CATALOG_URL_PARAM]);

  // Adjust-during-render: follow the URL in the same render, so no render pairs
  // a new URL with the previous catalog.
  if (catalogParam && catalogParam !== catalog) {
    setCatalog(catalogParam);
  }

  const value = useMemo(() => ({ catalog }), [catalog]);

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}
