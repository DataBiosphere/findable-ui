import { CellContext, ColumnDef, ColumnSort } from "@tanstack/react-table";
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
import { Table } from "../Table/table";

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

const createCell = <T extends object>(config: ColumnConfig<T>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- We can't determine the cell type
  function CellCreator({ row }: CellContext<T, any>): JSX.Element {
    return (
      <ComponentCreator
        components={[config.componentConfig]}
        response={row.original}
      />
    );
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
      columns.map(({ disableHiding, disableSorting, ...columnConfig }) => ({
        accessorKey: columnConfig.id,
        cell: createCell(columnConfig),
        enableHiding: !disableHiding,
        enableSorting: !disableSorting,
        filterFn: arrIncludesSome,
        header: columnConfig.header,
        id: columnConfig.id,
        meta: {
          columnPinned: columnConfig.columnPinned,
          header: columnConfig.header,
          width: columnConfig.width,
        },
        sortingFn: sortingFn,
      })),
    [columns]
  );
  const initialState = getInitialState(columns, defaultSort);
  return (
    <div>
      <Loading
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
    </div>
  );
};
