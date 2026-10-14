import { Row, RowData, Table } from "@tanstack/react-table";
import { Attribute } from "../../../../common/entities";

/**
 * Props for the Entity component.
 */
export interface EntityProps<T extends RowData = Attribute> {
  row: Row<T>;
  table: Table<T>;
}
