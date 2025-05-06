import { ColumnDef, Table, useReactTable } from "@tanstack/react-table";
import { Attribute, AttributeValueTypes } from "../../../../common/entities";
import { useTableOptions } from "./options/hook";

export const useTable = (
  data: Attribute[],
  columnDefs: ColumnDef<Attribute, AttributeValueTypes>[]
): Table<Attribute> => {
  const tableOptions = useTableOptions();
  return useReactTable<Attribute>({
    ...tableOptions,
    columns: columnDefs,
    data,
  });
};
