import {
  ColumnDef,
  RowData,
  Table,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { Attribute } from "../../../../common/entities";
import { useTableOptions } from "./options/hook";

export const useTable = <T extends RowData = Attribute>(
  data: T[],
  columnDefs: ColumnDef<T, T[keyof T]>[],
  tableOptions?: Omit<TableOptions<T>, "columns" | "data" | "getCoreRowModel">
): Table<T> => {
  // Default table options.
  const defaultTableOptions = useTableOptions<T>();

  // Table instance.
  return useReactTable<T>({
    ...defaultTableOptions, // TODO - merge initial state!
    ...tableOptions,
    columns: columnDefs,
    data,
  });
};
