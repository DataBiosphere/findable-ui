import { ColumnDef, Table, useReactTable } from "@tanstack/react-table";
import { Attribute } from "../../../../common/entities";
import { useTableOptions } from "./options/hook";

export const useTable = (
  data: Attribute[],
  columnDefs: ColumnDef<Attribute, Attribute[keyof Attribute]>[]
): Table<Attribute> => {
  const tableOptions = useTableOptions();
  return useReactTable<Attribute>({
    ...tableOptions,
    columns: columnDefs,
    data,
  });
};
