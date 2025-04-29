import { RowData, Table, useReactTable } from "@tanstack/react-table";
import { useTableCoreOptions } from "./coreOptions/hook";
import { useColumnFiltersOptions } from "./featureOptions/columnFilters/hook";
import { useExpandedOptions } from "./featureOptions/expanded/hook";
import { useFacetedOptions } from "./featureOptions/faceted/hook";
import { useGroupingOptions } from "./featureOptions/grouping/hook";
import { usePaginationOptions } from "./featureOptions/pagination/hook";
import { useRowPreviewOptions } from "./featureOptions/rowPreview/hook";
import { useRowSelectionOptions } from "./featureOptions/rowSelection/hook";
import { useSortingOptions } from "./featureOptions/sorting/hook";
import { useVisibilityOptions } from "./featureOptions/visibility/hook";
import { useTableOptions } from "./tableOptions/hook";

/**
 * Returns the table instance.
 * @returns Table instance.
 */
export function useTable<T extends RowData>(): Table<T> {
  // Table core options i.e. columns, data, state, etc.
  // Excludes initial state.
  const tableCoreOptions = useTableCoreOptions<T>();

  // Table feature options i.e. column filters, row selection, etc.
  const columnFiltersOptions = useColumnFiltersOptions<T>();
  const expandedOptions = useExpandedOptions<T>();
  const facetedOptions = useFacetedOptions<T>();
  const groupingOptions = useGroupingOptions();
  const paginationOptions = usePaginationOptions();
  const rowPreviewOptions = useRowPreviewOptions();
  const rowSelectionOptions = useRowSelectionOptions<T>();
  const sortingOptions = useSortingOptions<T>();
  const visibilityOptions = useVisibilityOptions();

  // Custom options i.e. initial state or other overrides.
  const tableOptions = useTableOptions<T>();

  // Table instance.
  return useReactTable({
    ...tableCoreOptions,
    ...columnFiltersOptions,
    ...expandedOptions,
    ...facetedOptions,
    ...groupingOptions,
    ...paginationOptions,
    ...rowPreviewOptions,
    ...rowSelectionOptions,
    ...sortingOptions,
    ...visibilityOptions,
    ...tableOptions,
  });
}
