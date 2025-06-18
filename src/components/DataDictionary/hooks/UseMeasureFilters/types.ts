import { RefObject } from "react";

export interface UseMeasureFilters {
  dimensions: { height: number };
  filtersRef: RefObject<HTMLElement> | null;
}
