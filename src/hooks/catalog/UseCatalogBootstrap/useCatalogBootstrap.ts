import { setLocalStorage } from "../../useLocalStorage/common/utils";
import { useEffect } from "react";

export const CATALOG_KEY = "catalog";

/**
 * Bootstraps the catalog value for SSFetchSSFilter from the URL
 * and persists it to localStorage if present.
 */
export function useCatalogBootstrap(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const catalog = params.get(CATALOG_KEY);

    if (catalog) setLocalStorage(CATALOG_KEY, catalog);
  }, []);
}
