import { Row, RowData, Table } from "@tanstack/react-table";
import { Class } from "common/entities";

export type ClassMeta = Record<
  Class["name"],
  Pick<Class, "description" | "title">
>;

export interface TableProps<T extends RowData> {
  row: Row<T>;
  table: Table<T>;
}
