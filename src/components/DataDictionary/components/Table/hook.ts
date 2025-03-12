import { Table, useReactTable } from "@tanstack/react-table";
import { Attribute } from "../../../../common/entities";
import { COLUMN_DEFS } from "./columns/columnDef";
import { useTableOptions } from "./options/hook";

export const useTable = (data: Attribute[]): Table<Attribute> => {
  const tableOptions = useTableOptions();
  return useReactTable<Attribute>({
    ...tableOptions,
    columns: COLUMN_DEFS,
    data,
  });
};
