import { RowData, Table } from "@tanstack/react-table";
import type {
  Attribute,
  DataDictionaryDownload,
} from "../../../../common/entities";

/**
 * Props for the Filters component.
 */
export interface FiltersProps<T extends RowData = Attribute> {
  download?: DataDictionaryDownload;
  table: Table<T>;
}
