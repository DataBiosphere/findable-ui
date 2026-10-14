import { RefObject } from "react";

/**
 * Return type for the useMeasureFilters hook.
 */
export interface UseMeasureFilters {
  dimensions: { height: number };
  filtersRef: RefObject<HTMLElement | null>;
}
