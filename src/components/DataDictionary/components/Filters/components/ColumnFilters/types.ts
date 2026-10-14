import { RowData, Table } from "@tanstack/react-table";
import { Attribute } from "../../../../../../common/entities";

/**
 * Props for the ColumnFilters component.
 */
export interface ColumnFiltersProps<T extends RowData = Attribute> {
  table: Table<T>;
}
