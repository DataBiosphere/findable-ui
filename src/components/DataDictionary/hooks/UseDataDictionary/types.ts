import { ColumnDef, RowData } from "@tanstack/react-table";
import { Attribute, Class } from "../../../../common/entities";

export interface UseDataDictionary<T extends RowData = Attribute> {
  classes: Class<T>[];
  columnDefs: ColumnDef<T, T[keyof T]>[];
}
