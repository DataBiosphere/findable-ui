import {
  ColumnDef,
  RowData,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import { Attribute } from "../../../../common/entities";
import { useTableOptions } from "./options/hook";

export const useTable = <T extends RowData = Attribute>(
  data: T[],
  columnDefs: ColumnDef<T, T[keyof T]>[]
): Table<T> => {
  // Table options.
  const tableOptions = useTableOptions<T>();

  // Table instance.
  return useReactTable<T>({
    ...tableOptions,
    columns: columnDefs,
    data,
  });
};
