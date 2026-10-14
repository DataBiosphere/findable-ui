import { RowData, Table } from "@tanstack/react-table";
import { Attribute } from "../../../../common/entities";

/**
 * Props for the Filters component.
 */
export interface FiltersProps<T extends RowData = Attribute> {
  table: Table<T>;
}
