import { CategoryKey, CategoryValueKey } from "../../../entities";
import { useCallback } from "react";
import { Table } from "@tanstack/react-table";
import { UseTableFilters } from "./types";
import { VIEW_KIND } from "../../../categories/views/types";
import { updater } from "./updater";

export const useTableFilters = <T = unknown>(
  table: Table<T>,
  options?: { onClearPreset?: () => void },
): UseTableFilters => {
  /**
   * Apply filter value to table column by category key.
   */
  const onFilterChange = useCallback(
    (
      categoryKey: CategoryKey,
      selectedCategoryValue: CategoryValueKey,
      viewKind?: VIEW_KIND,
    ) => {
      const column = table.getColumn(categoryKey);

      if (!column) {
        console.warn(`Column ${categoryKey} not found.`);
        return;
      }

      // Range filtering.
      if (viewKind === VIEW_KIND.RANGE) {
        column.setFilterValue(selectedCategoryValue);
        options?.onClearPreset?.();
        return;
      }

      // Select filtering.
      column.setFilterValue(updater(selectedCategoryValue));
      options?.onClearPreset?.();
    },
    [options, table],
  );

  /**
   * Clear all filters.
   */
  const onFilterReset = useCallback(() => {
    table.resetColumnFilters();
    options?.onClearPreset?.();
  }, [options, table]);

  return { onFilterChange, onFilterReset };
};
