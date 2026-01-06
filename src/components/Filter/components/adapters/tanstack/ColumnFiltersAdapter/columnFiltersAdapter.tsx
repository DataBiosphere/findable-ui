import { RowData } from "@tanstack/react-table";
import { JSX, useCallback } from "react";
import { VIEW_KIND } from "../../../../../../common/categories/views/types";
import {
  CategoryKey,
  CategoryValueKey,
  CLEAR_ALL,
  ClearAll,
} from "../../../../../../common/entities";
import { updater } from "../../../../../Table/components/TableFeatures/ColumnFilter/utils";
import { useUpdateFilterSort } from "./hooks/UseUpdateFilterSort/hook";
import { ColumnFiltersAdapterProps } from "./types";
import { buildColumnFilters, getColumnFiltersCount } from "./utils";

export const ColumnFiltersAdapter = <T extends RowData>({
  renderSurface,
  table,
}: ColumnFiltersAdapterProps<T>): JSX.Element | null => {
  const {
    enabled: filterSortEnabled,
    filterSort,
    onFilterSortChange,
  } = useUpdateFilterSort(table);

  const categoryFilters = buildColumnFilters(table, filterSort);
  const count = getColumnFiltersCount(table);

  const onFilter = useCallback(
    (
      categoryKey: CategoryKey | ClearAll,
      selectedCategoryValue: CategoryValueKey,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- `selected` is not required by TanStack adapter.
      _selected: boolean,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- `categorySection` is not required by TanStack adapter.
      _categorySection?: string,
      viewKind?: VIEW_KIND,
    ) => {
      if (categoryKey === CLEAR_ALL) {
        table.resetColumnFilters(true);
        return;
      }

      // Range filters use direct value assignment (e.g., [min, max] tuple for numeric ranges).
      if (viewKind === VIEW_KIND.RANGE) {
        table.getColumn(categoryKey)?.setFilterValue(selectedCategoryValue);
        return;
      }

      // Select filters use an updater function to toggle individual values in/out of the filter array.
      table
        .getColumn(categoryKey)
        ?.setFilterValue(updater(selectedCategoryValue));
    },
    [table],
  );

  return renderSurface({
    categoryFilters,
    count,
    filterSort,
    filterSortEnabled,
    onFilter,
    onFilterSortChange,
  });
};
