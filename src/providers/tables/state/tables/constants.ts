import { TableState } from "@tanstack/react-table";
import { TableStateKeys } from "./types";

export const DEFAULT_TABLE_STATE: Pick<TableState, TableStateKeys> = {
  columnFilters: [],
  columnOrder: [],
  columnVisibility: {},
  expanded: {},
  grouping: [],
  pagination: { pageIndex: 0, pageSize: 25 },
  rowPreview: {},
  rowSelection: {},
  sorting: [],
};
