import { useContext, useEffect } from "react";
import { CatalogContext } from "../providers/catalog/context";
import {
  getDefaultCatalog,
  warnCatalogParamWithoutProvider,
} from "../providers/catalog/utils";
import { useConfig } from "./useConfig";

/**
 * Returns the catalog to request with: the one selected by the `catalog` URL
 * param, or the config's default catalog. Without a CatalogProvider, the URL
 * param is ignored and the default is returned.
 * @returns The catalog, or undefined when none is selected and the config has no default.
 */
export const useCatalog = (): string | undefined => {
  const { config } = useConfig();
  const context = useContext(CatalogContext);
  useEffect(() => {
    if (!context) warnCatalogParamWithoutProvider();
  }, [context]);
  return context?.catalog ?? getDefaultCatalog(config);
};
