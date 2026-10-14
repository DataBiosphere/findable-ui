import { RowData, Table } from "@tanstack/react-table";
import { Attribute } from "../../../../common/entities";

/**
 * Props for the Entities component.
 */
export interface ClassesProps<T extends RowData = Attribute> {
  table: Table<T>;
}
