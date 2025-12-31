import { TableState } from "@tanstack/react-table";

export type TableKey = string;

export type TableStateKeys =
  | "columnFilters"
  | "columnOrder"
  | "columnVisibility"
  | "expanded"
  | "grouping"
  | "pagination"
  | "rowPreview"
  | "rowSelection"
  | "sorting";

export type TableStates = Record<TableKey, Pick<TableState, TableStateKeys>>;
