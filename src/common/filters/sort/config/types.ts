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

/**
 * Callback fired when the filter sort type is changed.
 */
export type OnFilterSortChange = (filterSort: FILTER_SORT) => void;
