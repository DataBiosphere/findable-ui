import { Table, TableOptions, useReactTable } from "@tanstack/react-table";
import { CORE_OPTIONS } from "../../../../../../../components/Table/options/core/constants";
import { COLUMN_FILTERS_OPTIONS } from "../../../../../../../components/Table/featureOptions/columnFilters/constants";
import { SORTING_OPTIONS } from "../../../../../../../components/Table/featureOptions/sorting/constants";
import { TABLE_DOWNLOAD_OPTIONS } from "../../../../../../../components/Table/featureOptions/tableDownload/constants";
import { VISIBILITY_OPTIONS } from "../../../../../../../components/Table/featureOptions/visibility/constants";
import { EXPANDED_OPTIONS } from "../../../../../../../components/Table/featureOptions/expanded/constants";
import { GROUPING_OPTIONS } from "../../../../../../../components/Table/featureOptions/grouping/constants";
import { ROW_SELECTION_OPTIONS } from "../../../../../../../components/Table/featureOptions/rowSelection/constants";
import { ROW_PREVIEW_OPTIONS } from "../../../../../../../components/Table/featureOptions/rowPreview/constants";
import { PAGINATION_OPTIONS } from "../../../../../../../components/Table/featureOptions/pagination/constants";

// with manual pagination, do we actually need pagination model?

/**
 * Hook for client-side filter strategy table creation.
 *
 * @template T - Entity type.
 * @param params - Parameters.
 * @param params.columns - Columns.
 * @param params.data - Dataset.
 * @param params.getRowId - Row ID getter.
 * @param params.state - Table state.
 * @param params.options - TanStack table options.
 * @returns TanStack table instance.
 */
export const useTable = <T = unknown>({
  columns,
  data,
  getRowId,
  state,
  ...options
}: Omit<TableOptions<T>, "getCoreRowModel">): Table<T> => {
  return useReactTable({
    columns,
    data,
    getRowId,
    ...COLUMN_FILTERS_OPTIONS,
    ...CORE_OPTIONS,
    ...EXPANDED_OPTIONS,
    ...GROUPING_OPTIONS,
    ...PAGINATION_OPTIONS,
    ...SORTING_OPTIONS,
    ...ROW_PREVIEW_OPTIONS,
    ...ROW_SELECTION_OPTIONS,
    ...TABLE_DOWNLOAD_OPTIONS,
    ...VISIBILITY_OPTIONS,
    ...options,
    pageCount: data.length,
    state,
  });
};
