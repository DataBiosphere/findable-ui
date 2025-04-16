import {
  CellContext,
  ColumnDef,
  CoreOptions,
  RowData,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { ColumnConfig, ListViewConfig } from "../../config/entities";
import { ComponentCreator } from "../ComponentCreator/ComponentCreator";
import { COLUMN_DEF } from "../Table/common/columnDef";
import { sortingFn } from "../Table/common/utils";
import { Table } from "../Table/table";
import { buildBaseColumnDef } from "./common/utils";
import { useTableOptions } from "./options/hook";

export interface TableCreatorProps<T> {
  columns: ColumnConfig<T>[];
  getRowId?: CoreOptions<T>["getRowId"];
  items: T[];
  listView?: ListViewConfig;
  loading?: boolean;
}

const createCell = <T extends RowData = RowData, TData = unknown>(
  config: ColumnConfig<T>
) =>
  function CellCreator(cellContext: CellContext<T, TData>): JSX.Element {
    return (
      <ComponentCreator
        components={[config.componentConfig]}
        response={cellContext.row.original}
        viewContext={{ cellContext }}
      />
    );
  };

export const TableCreator = <T extends RowData>({
  columns,
  getRowId,
  items,
  listView,
  loading,
}: TableCreatorProps<T>): JSX.Element => {
  const tableOptions = useTableOptions<T>();
  const columnDefs: ColumnDef<T>[] = useMemo(
    () =>
      columns.reduce(
        (
          acc,
          {
            /**
             * Selects `arrIncludesSome` as the default filter function.
             * Although the type of `ColumnFilter["value"]` is declared as `unknown`, in the context of entity lists,
             * the filter value is consistently an array.
             * This facilitates selection of multiple values for filtering, even when the individual cell value is a single string.
             * The same approach applies to column definitions using "inNumberRange", where the filter value is expected to be an array
             * representing a range of numbers.
             */
            filterFn = "arrIncludesSome",
            ...columnConfig
          }
        ) => {
          acc.push({
            ...buildBaseColumnDef(columnConfig),
            cell: createCell(columnConfig),
            filterFn,
            sortingFn: sortingFn,
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
    [columns]
  );
  return (
    <Table<T>
      columns={columnDefs}
      getRowId={getRowId}
      items={items}
      listView={listView}
      loading={loading}
      tableOptions={tableOptions}
    />
  );
};
