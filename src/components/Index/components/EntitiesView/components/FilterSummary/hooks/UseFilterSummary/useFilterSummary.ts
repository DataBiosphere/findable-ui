import { useMemo, useRef } from "react";
import {
  getBorderBoxSize,
  useResizeObserver,
} from "../../../../../../../../hooks/useResizeObserver";
import { CategoryFilter } from "../../../../../../../Filter/components/Filters/filters";
import { getSummaries, getSVGWidth } from "../../utils";
import { UseFilterSummary } from "./types";

export const useFilterSummary = (
  categoryFilters: CategoryFilter[]
): UseFilterSummary => {
  const summariesRef = useRef<HTMLDivElement>(null);
  const summariesRect = useResizeObserver(summariesRef, getBorderBoxSize);
  const summaries = useMemo(
    () => getSummaries(categoryFilters),
    [categoryFilters]
  );
  const width = getSVGWidth(summariesRect?.width);
  return { summaries, summariesRef, width };
};
