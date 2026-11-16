import { useContext } from "react";
import { CatalogContext } from "./context";

/**
 * Returns the catalog selected by the `catalog` URL param, without falling back
 * to the config default. Use `useCatalog` for the catalog to request with.
 * @returns The selected catalog, or undefined when none is selected or no CatalogProvider is mounted.
 */
export function useCatalogParam(): string | undefined {
  return useContext(CatalogContext)?.catalog;
}
