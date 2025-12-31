import { TableState } from "@tanstack/react-table";

export type QueryKey = [
  "entities",
  string,
  string,
  Pick<TableState, "columnFilters" | "sorting" | "pagination">,
];
