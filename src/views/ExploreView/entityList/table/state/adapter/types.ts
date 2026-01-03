import { TableOptions } from "@tanstack/react-table";

export interface UseAdapter<T = unknown> {
  adapter: Required<
    Pick<TableOptions<T>, "onColumnFiltersChange" | "onPaginationChange">
  >;
}
