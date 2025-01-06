import {
  CellContext,
  ColumnDef,
  CoreOptions,
  HeaderContext,
  RowData,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { ColumnConfig, ListViewConfig } from "../../config/entities";
import { PAPER_PANEL_STYLE } from "../common/Paper/paper";
import { ComponentCreator } from "../ComponentCreator/ComponentCreator";
import { Loading } from "../Loading/loading";
import { COLUMN_DEF } from "../Table/common/columnDef";
import { arrIncludesSome, sortingFn } from "../Table/common/utils";
import { RowSelectionCell } from "../Table/components/TableCell/components/RowSelectionCell/rowSelectionCell";
import { HeadSelectionCell } from "../Table/components/TableHead/components/HeadSelectionCell/headSelectionCell";
import { Table } from "../Table/table";
import { COLUMN_CONFIGS } from "./common/constants";
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

const createHeaderSelectionCell = <T extends RowData>() =>
  function CellCreator({ table }: HeaderContext<T, unknown>): JSX.Element {
    return <HeadSelectionCell tableInstance={table} />;
  };

const createRowSelectionCell = <T extends RowData>() =>
  function CellCreator({ row }: CellContext<T, unknown>): JSX.Element {
    return <RowSelectionCell row={row} />;
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
          /* Initialize column definitions with the "select" column */
          {
            ...buildBaseColumnDef(COLUMN_CONFIGS.SELECT),
            cell: createRowSelectionCell(),
            header: createHeaderSelectionCell(),
          },
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
