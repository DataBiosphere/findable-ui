import { CATALOG_URL_PARAM } from "../catalog/constants";

export const EXPLORE_URL_PARAMS = {
  CATALOG: CATALOG_URL_PARAM,
  FILTER: "filter",
} as const;

export const SELECT_CATEGORY_KEY = {
  SAVED_FILTERS: "savedFilters",
};
