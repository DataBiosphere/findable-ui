import { RowData, TableOptions } from "@tanstack/react-table";
import { useGroupingOptions } from "../options/grouping/hook";

export function useTableOptions<T extends RowData>(
  tableOptions?: Partial<TableOptions<T>>
): Partial<TableOptions<T>> {
  const groupingOptions = useGroupingOptions();
  return { ...groupingOptions, ...tableOptions };
}
