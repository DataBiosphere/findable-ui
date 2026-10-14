import { useRef } from "react";
import {
  getBorderBoxSizeHeight,
  useResizeObserver,
} from "../../../../hooks/useResizeObserver";
import { useLayoutDimensions } from "../../../../providers/layoutDimensions/hook";
import { UseMeasureFilters } from "./types";

/**
 * Measures the height of the data dictionary filters, once the header has been measured.
 * @returns The filters ref and height; the height is 0 until measured.
 */
export const useMeasureFilters = (): UseMeasureFilters => {
  // Get header dimensions.
  const { dimensions } = useLayoutDimensions();
  const { header } = dimensions;

  // Measure filters dimensions.
  const filtersRef = useRef<HTMLElement>(null);
  const filtersRect = useResizeObserver(
    filtersRef,
    getBorderBoxSizeHeight,
    header.height > 0, // Only measure filters height, when header measurement is available.
  );
  const { height = 0 } = filtersRect || {};

  return {
    dimensions: { height },
    filtersRef,
  };
};
