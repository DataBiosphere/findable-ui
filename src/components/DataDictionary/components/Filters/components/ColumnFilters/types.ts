import { RowData, Table } from "@tanstack/react-table";
import { Attribute } from "../../../../../../common/entities";

export interface ColumnFiltersProps<T extends RowData = Attribute> {
  table: Table<T>;
}
