import { RowData, TableOptions } from "@tanstack/react-table";
import { Attribute, Class } from "../../../../common/entities";

export interface UseDataDictionaryConfig<T extends RowData = Attribute> {
  classes: Class<T>[];
  description?: string;
  tableOptions: Omit<TableOptions<T>, "data" | "getCoreRowModel">;
  title: string;
}
