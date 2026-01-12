import { Table } from "@tanstack/react-table";
import { useCallback } from "react";
import { VIEW_KIND } from "../../../categories/views/types";
import { CategoryKey, CategoryValueKey } from "../../../entities";
import { usePreset } from "../../../../views/ExploreView/entityList/filters/hooks/UsePreset/hook";
import { UseTableFilters, UseTableFiltersOptions } from "./types";
import { updater } from "./updater";

/**
 * Hook to manage table filters including select, range, and preset filtering.
 * @param table - TanStack Table instance.
 * @param entityListType - Entity identifier for preset state management.
 * @param options - Options including presetMap for preset handling.
 * @returns Object containing onFilterChange and onFilterReset functions.
 */
export const useTableFilters = <T = unknown>(
  table: Table<T>,
  entityListType: string,
  options?: UseTableFiltersOptions,
): UseTableFilters => {
  const { onPreset } = usePreset(
    table,
    entityListType,
    options?.getPresetTableState,
  );

  /**
   * Apply filter value to table column by category key.
   */
  const onFilterChange = useCallback(
    (
      categoryKey: CategoryKey,
      selectedCategoryValue: CategoryValueKey,
      viewKind?: VIEW_KIND,
    ) => {
      // Preset filtering.
      if (viewKind === VIEW_KIND.PRESET) {
        onPreset(String(selectedCategoryValue));
        return;
      }

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
    [onPreset, options, table],
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
