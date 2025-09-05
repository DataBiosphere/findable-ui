import {
  ColumnDef,
  ColumnSort,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  RowSelectionState,
  TableState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo } from "react";
import { track } from "../../../common/analytics/analytics";
import {
  EVENT_NAME,
  EVENT_PARAM,
  SORT_DIRECTION,
} from "../../../common/analytics/entities";
import { useConfig } from "../../../hooks/useConfig";
import { useExploreMode } from "../../../hooks/useExploreMode/useExploreMode";
import { useExploreState } from "../../../hooks/useExploreState";
import { ExploreActionKind } from "../../../providers/exploreState";
import { DEFAULT_PAGINATION_STATE } from "../../../providers/exploreState/initializer/constants";
import { arrIncludesSome } from "../../Table/columnDef/columnFilters/filterFn";
import { COLUMN_DEF } from "../../Table/common/columnDef";
import {
  buildCategoryViews,
  getFacetedUniqueValuesWithArrayValues,
  getTableStatePagination,
  isClientFilteringEnabled,
  sortingFn,
} from "../../Table/common/utils";
import { getFacetedMinMaxValues } from "../../Table/featureOptions/facetedColumn/getFacetedMinMaxValues";
import { ROW_POSITION } from "../../Table/features/RowPosition/constants";
import { ROW_PREVIEW } from "../../Table/features/RowPreview/constants";
import { RowPreviewState } from "../../Table/features/RowPreview/entities";
import { TABLE_DOWNLOAD } from "../../Table/features/TableDownload/constants";
import { buildBaseColumnDef } from "../../TableCreator/common/utils";
import { useTableOptions } from "../../TableCreator/options/hook";
import { createCell } from "./coreOptions/columns/cellFactory";
import { UseTable, UseTableProps } from "./types";

export const useTable = <T extends RowData>({
  entityListType,
}: // eslint-disable-next-line sonarjs/cognitive-complexity -- TODO fix complexity
UseTableProps): UseTable<T> => {
  const { entityConfig } = useConfig();
  const exploreMode = useExploreMode();
  const { exploreDispatch, exploreState } = useExploreState();
  const tableOptions = useTableOptions<T>();
  const {
    entityPageState,
    filterState,
    listItems,
    paginationState,
    rowPreview,
    tabValue,
  } = exploreState;
  const { getId: getRowId, list } = entityConfig;
  const { columns: columnsConfig } = list;
  const { columnVisibility, grouping, rowSelection, sorting } =
    entityPageState[tabValue];
  const { currentPage, pageSize, rows: pageCount } = paginationState;
  const clientFiltering = isClientFilteringEnabled(exploreMode);
  const pagination = useMemo(
    () => getTableStatePagination(currentPage - 1, pageSize),
    [currentPage, pageSize]
  );

  const columnDefs: ColumnDef<T>[] = useMemo(
    () =>
      columnsConfig.reduce(
        (
          acc,
          {
            /**
             * Applies the custom `arrIncludesSome` filter function as the default for multi-value filtering.
             * Although `ColumnFilter["value"]` is typed as `unknown`, in practice it's consistently an array (`unknown[]`) in entity lists.
             * This custom filter function supports multi-select filtering, even when individual cell values are single strings.
             * This override of TanStack's default `arrIncludesSome` resolves a limitation where the base implementation
             * does not support matching an array of filter values against a single string cell value.
             * For range filtering, specify TanStack's `inNumberRange` filter function on the column definition.
             */
            filterFn = "arrIncludesSome",
            ...columnConfig
          }
        ) => {
          acc.push({
            ...buildBaseColumnDef<T>(columnConfig),
            cell: createCell(columnConfig),
            filterFn,
            sortingFn,
          });
          return acc;
        },
        [
          /* Initialize column definitions with the "row position" column */
          COLUMN_DEF.ROW_POSITION,
          /* Initialize column definitions with the "row selection" column */
          COLUMN_DEF.ROW_SELECTION,
        ] as ColumnDef<T>[]
      ),
    [columnsConfig]
  );

  const onSortingChange = (updater: Updater<ColumnSort[]>): void => {
    // TODO(cc) memoize `onSortingChange` with `useCallback`.
    // TODO(cc) copy `onSortingChange` to ../options/sorting/hook.ts see src/components/Table/options/grouping/hook.ts for example.
    exploreDispatch({
      payload: typeof updater === "function" ? updater(sorting) : updater,
      type: ExploreActionKind.UpdateSorting,
    });
    // Execute GTM tracking.
    // TODO(cc) update tracking to handle sorting of multiple columns.
    // TODO(cc) GTM tracking when `onSortingChange` is triggered only tracks the first column sorted, and takes the value from explore state which is not updated yet.
    track(EVENT_NAME.ENTITY_TABLE_SORTED, {
      [EVENT_PARAM.ENTITY_NAME]: exploreState.tabValue,
      [EVENT_PARAM.COLUMN_NAME]: sorting?.[0]?.id, // TODO(cc) sorting should always be at least `[]` and never `undefined`.
      [EVENT_PARAM.SORT_DIRECTION]: sorting?.[0]?.desc // TODO(cc) sorting should always be at least `[]` and never `undefined`.
        ? SORT_DIRECTION.DESC
        : SORT_DIRECTION.ASC,
    });
  };

  const onRowPreviewChange = useCallback(
    (updater: Updater<RowPreviewState>): void => {
      exploreDispatch({
        payload: typeof updater === "function" ? updater(rowPreview) : updater,
        type: ExploreActionKind.UpdateRowPreview,
      });
    },
    [exploreDispatch, rowPreview]
  );

  const onRowSelectionChange = useCallback(
    (updater: Updater<RowSelectionState>): void => {
      // TODO(cc) refactor `onRowSelectionChange` to /options/rowSelection/hook.ts see onGroupingChange.
      exploreDispatch({
        payload:
          typeof updater === "function" ? updater(rowSelection) : updater,
        type: ExploreActionKind.UpdateRowSelection,
      });
    },
    [exploreDispatch, rowSelection]
  );

  const state: Partial<TableState> = {
    columnVisibility,
    grouping,
    pagination,
    rowPreview,
    rowSelection,
    sorting,
  };

  /**
   * TODO: Update `ColumnConfig` to follow the `ColumnDef` API of TanStack Table.
   * - Standardize column definitions to leverage the full power of TanStack Table's feature set and improve compatibility.
   * TODO: Define `sorting` directly within `ListConfig` via the `tableOptions.initialState` property.
   * - This will simplify the configuration structure and centralize table state definitions, reducing redundancy and improving clarity.
   */
  const table = useReactTable<T>({
    _features: [ROW_POSITION, ROW_PREVIEW, TABLE_DOWNLOAD],
    columns: columnDefs,
    data: listItems || [],
    enableColumnFilters: true, // client-side filtering.
    enableFilters: true, // client-side filtering.
    enableMultiSort: clientFiltering, // TODO(cc) move to sorting options; default to false and let the table options in config flag this value.
    filterFns: { arrIncludesSome },
    getCoreRowModel: getCoreRowModel(),
    getFacetedMinMaxValues: clientFiltering
      ? getFacetedMinMaxValues()
      : undefined,
    getFacetedRowModel: clientFiltering ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: clientFiltering
      ? getFacetedUniqueValuesWithArrayValues()
      : undefined,
    getFilteredRowModel: clientFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    getRowId,
    getSortedRowModel: clientFiltering ? getSortedRowModel() : undefined,
    manualPagination: true,
    manualSorting: !clientFiltering,
    onRowPreviewChange,
    onRowSelectionChange,
    onSortingChange,
    pageCount,
    state,
    ...tableOptions,
  });

  const { getAllColumns, getRowModel, getState } = table;

  const allColumns = getAllColumns();
  const { columnFilters } = getState();
  const { rows } = getRowModel();

  // Sets react table column filters `columnFilters` state - for client-side filtering only - with update of filterState.
  useEffect(() => {
    if (clientFiltering) {
      table.setColumnFilters(
        filterState.map(({ categoryKey, value }) => ({
          id: categoryKey,
          value,
        }))
      );
    }
  }, [clientFiltering, filterState, table]);

  // Process explore response - client-side filtering only.
  useEffect(() => {
    if (entityListType !== tabValue) return;
    if (!listItems || listItems.length === 0) return;
    if (clientFiltering) {
      exploreDispatch({
        payload: {
          listItems,
          loading: false,
          paginationResponse: {
            ...DEFAULT_PAGINATION_STATE,
            pageSize: rows.filter(({ getIsGrouped }) => !getIsGrouped()).length,
            rows: rows.filter(({ getIsGrouped }) => !getIsGrouped()).length,
          },
          selectCategories: buildCategoryViews(allColumns, columnFilters),
        },
        type: ExploreActionKind.ProcessExploreResponse,
      });
    }
  }, [
    allColumns,
    clientFiltering,
    columnFilters,
    entityListType,
    exploreDispatch,
    listItems,
    rows,
    tabValue,
  ]);

  return { table };
};
