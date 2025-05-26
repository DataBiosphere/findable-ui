import {
  ColumnDef,
  RowData,
  Table,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { Attribute, Class } from "../../../../common/entities";
import { useTableOptions } from "./options/hook";
import { buildClassMeta, buildTableData } from "./utils";

export const useTable = <T extends RowData = Attribute>(
  classes: Class<T>[],
  columnDefs: ColumnDef<T, T[keyof T]>[],
  tableOptions?: Omit<TableOptions<T>, "columns" | "data" | "getCoreRowModel">
): Table<T> => {
  // Build table data.
  const data = useMemo(() => buildTableData(classes), [classes]);

  // Default table options.
  const defaultTableOptions = useTableOptions<T>();

  // Build class meta.
  const classMeta = useMemo(() => buildClassMeta(classes), [classes]);

  // Table instance.
  return useReactTable<T>({
    ...defaultTableOptions,
    ...tableOptions,
    columns: columnDefs,
    data,
    meta: { classMeta },
  });
};
