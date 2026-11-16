import { createContext } from "react";
import type { CatalogContextProps } from "./types";

/**
 * Catalog context; undefined when no CatalogProvider is mounted.
 */
export const CatalogContext = createContext<CatalogContextProps | undefined>(
  undefined,
);
