import {
  CellContext,
  ColumnDef,
  CoreOptions,
  RowData,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { ColumnConfig, ListViewConfig } from "../../config/entities";
import { PAPER_PANEL_STYLE } from "../common/Paper/paper";
import { ComponentCreator } from "../ComponentCreator/ComponentCreator";
import { Loading } from "../Loading/loading";
import { COLUMN_DEF } from "../Table/common/columnDef";
import { arrIncludesSome, sortingFn } from "../Table/common/utils";
import { Table } from "../Table/table";
import { buildBaseColumnDef } from "./common/utils";
import { useTableOptions } from "./options/hook";
import { TableCreator as TableCreatorContainer } from "./tableCreator.styles";

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
        (acc, columnConfig) => {
          acc.push({
            ...buildBaseColumnDef(columnConfig),
            cell: createCell(columnConfig),
            filterFn: arrIncludesSome,
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
    <TableCreatorContainer>
      <Loading
        appear={false}
        loading={loading || false}
        panelStyle={PAPER_PANEL_STYLE.FLUID}
      />
      <Table<T>
        columns={columnDefs}
        getRowId={getRowId}
        items={items}
        listView={listView}
        loading={loading}
        tableOptions={tableOptions}
      />
    </TableCreatorContainer>
  );
};
