import type { ReactNode } from "react";

/**
 * Catalog context value.
 */
export interface CatalogContextProps {
  /**
   * Catalog selected by the `catalog` URL param, not the config default;
   * undefined until a URL carries one.
   */
  catalog: string | undefined;
}

/**
 * Catalog provider props.
 */
export interface CatalogProviderProps {
  children: ReactNode;
}
