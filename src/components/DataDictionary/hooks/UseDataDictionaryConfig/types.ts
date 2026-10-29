import { RowData, TableOptions } from "@tanstack/react-table";
import type {
  Attribute,
  Class,
  DataDictionaryDownload,
} from "../../../../common/entities";

/**
 * Return type for the useDataDictionaryConfig hook.
 */
export interface UseDataDictionaryConfig<T extends RowData = Attribute> {
  classes: Class<T>[];
  description?: string;
  download?: DataDictionaryDownload;
  tableOptions: Omit<TableOptions<T>, "data" | "getCoreRowModel">;
  title: string;
}
