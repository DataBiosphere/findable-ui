import type { SiteConfig } from "../../config/entities";
import { isSSR } from "../../utils/ssr";
import { CATALOG_URL_PARAM } from "./constants";

let hasWarnedMissingProvider = false;

/**
 * Returns the catalog in a router query param value.
 * @param value - Router query value of the `catalog` param.
 * @returns The catalog, or undefined when the value is missing, empty or repeated.
 */
export function getCatalogParam(
  value: string | string[] | undefined,
): string | undefined {
  return typeof value === "string" && value ? value : undefined;
}

/**
 * Returns the config's default catalog, used when no catalog is selected by the URL.
 * @param config - Site config.
 * @returns The default catalog, or undefined when the config has none.
 */
export function getDefaultCatalog(config: SiteConfig): string | undefined {
  return config.dataSource.defaultParams?.catalog;
}

/**
 * Returns the catalog in the browser's current URL, so the first render already
 * uses it, before the Next.js router is ready.
 * @returns The catalog, or undefined during server rendering or when the URL has none or repeats it.
 */
export function getLocationCatalogParam(): string | undefined {
  if (isSSR()) return undefined;
  const values = new URLSearchParams(window.location.search).getAll(
    CATALOG_URL_PARAM,
  );
  return getCatalogParam(values.length > 1 ? values : values[0]);
}

/**
 * Warns once, in development, when the URL has a `catalog` param but no
 * CatalogProvider is mounted to read it.
 */
export function warnCatalogParamWithoutProvider(): void {
  if (process.env.NODE_ENV === "production") return;
  if (hasWarnedMissingProvider) return;
  if (!getLocationCatalogParam()) return;
  hasWarnedMissingProvider = true;
  console.warn(
    `The URL has a "${CATALOG_URL_PARAM}" param, but no CatalogProvider is mounted, so the config's default catalog is used. Mount CatalogProvider in _app to use the URL's catalog.`,
  );
}
