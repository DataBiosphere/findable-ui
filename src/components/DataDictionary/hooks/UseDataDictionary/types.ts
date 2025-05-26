import { RowData, Table } from "@tanstack/react-table";
import { Attribute, Class } from "../../../../common/entities";

export interface UseDataDictionary<T extends RowData = Attribute> {
  classes: Class<T>[];
  title: string;
  table: Table<T>;
}
