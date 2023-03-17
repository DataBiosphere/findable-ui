import { getConfig } from "../config/config";
import { DataSourceConfig } from "../config/entities";

/**
 * Returns application DEFAULT_DETAIL_PARAMS.
 * @returns application DEFAULT_DETAIL_PARAMS.
 */
export function getDefaultDetailParams(): DataSourceConfig["defaultDetailParams"] {
  return getConfig().dataSource.defaultDetailParams ?? {};
}

/**
 * Returns application DEFAULT_LIST_PARAMS.
 * @returns application DEFAULT_LIST_PARAMS.
 */
export function getDefaultListParams(): DataSourceConfig["defaultListParams"] {
  return getConfig().dataSource.defaultListParams ?? {};
}

/**
 * Returns application URL.
 * @returns application url.
 */
export function getURL(): string {
  return getConfig().dataSource.url;
}
