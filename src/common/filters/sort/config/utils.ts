import { SiteConfig } from "../../../../config/entities";
import { FILTER_SORT } from "./types";

/**
 * Returns the default filter sort type "ALPHA" or "COUNT" from config or ALPHA as fallback.
 * @param config - Filter sort configuration.
 * @returns default filter sort type.
 */
export function getFilterSortType(config?: SiteConfig): FILTER_SORT {
  return config?.filterSort?.sortBy ?? FILTER_SORT.ALPHA;
}
