import { getConfig } from "../config/config";
import { DataSourceConfig } from "../config/entities";

/**
 * Returns application DEFAULT_DETAIL_PARAMS.
 * @returns application DEFAULT_DETAIL_PARAMS.
 */
export function getDefaultDetailParams():
  | DataSourceConfig["defaultDetailParams"]
  | DataSourceConfig["defaultParams"] {
  const { dataSource } = getConfig();
  const { defaultDetailParams, defaultParams } = dataSource || {};
  return { ...defaultDetailParams, ...defaultParams };
}

/**
 * Returns application DEFAULT_LIST_PARAMS.
 * @returns application DEFAULT_LIST_PARAMS.
 */
export function getDefaultListParams():
  | DataSourceConfig["defaultListParams"]
  | DataSourceConfig["defaultParams"] {
  const { dataSource } = getConfig();
  const { defaultListParams, defaultParams } = dataSource;
  return { ...defaultListParams, ...defaultParams };
}

/**
 * Returns application URL.
 * @returns application url.
 */
export function getURL(): string {
  return getConfig().dataSource.url;
}
