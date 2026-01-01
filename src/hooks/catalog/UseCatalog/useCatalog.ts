import { useMemo } from "react";
import { useConfig } from "../../useConfig";
import { CATALOG_KEY } from "../UseCatalogBootstrap/useCatalogBootstrap";
import { getLocalStorage } from "../../useLocalStorage/common/utils";
import { UseCatalog } from "./types";

/**
 * Returns the effective catalog value for data requests.
 *
 * Resolution order:
 * 1. User override stored in localStorage (if present).
 * 2. Default catalog from application config.
 *
 * @returns Catalog object.
 */
export const useCatalog = (): UseCatalog => {
  const { config } = useConfig();
  const { dataSource } = config;
  const { defaultParams } = dataSource || {};
  const { catalog } = defaultParams || {};

  if (!catalog) throw new Error("No catalog found for data source");

  const override = getLocalStorage(CATALOG_KEY);

  return useMemo(() => ({ catalog: override ?? catalog }), [catalog, override]);
};
