import { useRef } from "react";
import {
  getBorderBoxSizeHeight,
  useResizeObserver,
} from "../../../../hooks/useResizeObserver";
import { UseMeasureFilters } from "./types";

/**
 * Measures the sticky filters, which the entities are offset to clear.
 * Measured unconditionally: the filters' own position no longer depends on the
 * header being measured first, because the header is in flow.
 * @returns Filters height and the ref to attach to them.
 */
export const useMeasureFilters = (): UseMeasureFilters => {
  const filtersRef = useRef<HTMLElement>(null);
  const filtersRect = useResizeObserver(filtersRef, getBorderBoxSizeHeight);
  const { height = 0 } = filtersRect || {};

  return {
    dimensions: { height },
    filtersRef,
  };
};
