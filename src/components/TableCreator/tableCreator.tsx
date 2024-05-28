import { CellContext, ColumnDef, ColumnSort } from "@tanstack/react-table";
import { HeaderContext, RowData } from "@tanstack/table-core";
import React, { useMemo } from "react";
import { Pagination } from "../../common/entities";
import { ColumnConfig, ListViewConfig } from "../../config/entities";
import { PAPER_PANEL_STYLE } from "../common/Paper/paper";
import { ComponentCreator } from "../ComponentCreator/ComponentCreator";
import { Loading } from "../Loading/loading";
import {
  arrIncludesSome,
  getInitialState,
  sortingFn,
} from "../Table/common/utils";
import { RowSelectionCell } from "../Table/components/TableCell/components/RowSelectionCell/rowSelectionCell";
import { HeadSelectionCell } from "../Table/components/TableHead/components/HeadSelectionCell/headSelectionCell";
import { Table } from "../Table/table";
import { COLUMN_CONFIGS } from "./common/constants";
import { buildBaseColumnDef } from "./common/utils";
import { TableCreator as TableCreatorContainer } from "./tableCreator.styles";

export interface TableCreatorProps<T> {
  columns: ColumnConfig<T>[];
  defaultSort: ColumnSort | undefined;
  items: T[];
  listView?: ListViewConfig;
  loading?: boolean;
  pageCount?: number;
  pages: number;
  pageSize: number;
  pagination?: Pagination;
  total?: number;
}

const createCell = <T extends RowData>(config: ColumnConfig<T>) =>
  function CellCreator({ row }: CellContext<T, unknown>): JSX.Element {
    return (
      <ComponentCreator
        components={[config.componentConfig]}
        response={row.original}
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

export const TableCreator = <T extends object>({
  columns,
  defaultSort,
  items,
  listView,
  loading,
  pageCount,
  pages,
  pageSize,
  pagination,
  total,
}: TableCreatorProps<T>): JSX.Element => {
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
  const initialState = getInitialState(columns, defaultSort);
  return (
    <TableCreatorContainer>
      <Loading
        appear={false}
        loading={loading || false}
        panelStyle={PAPER_PANEL_STYLE.FLUID}
      />
      <Table<T>
        columns={columnDefs}
        count={pageCount}
        initialState={initialState}
        items={items}
        listView={listView}
        loading={loading}
        pages={pages}
        pageSize={pageSize}
        pagination={pagination}
        total={total}
      />
    </TableCreatorContainer>
  );
};
