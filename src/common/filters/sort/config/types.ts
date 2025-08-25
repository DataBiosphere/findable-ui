/**
 * Filter sort options.
 */
export enum FILTER_SORT {
  ALPHA = "ALPHA",
  COUNT = "COUNT",
}

/**
 * Filter sort configuration for site config.
 */
export interface FilterSortConfig {
  sortBy?: FILTER_SORT;
}
