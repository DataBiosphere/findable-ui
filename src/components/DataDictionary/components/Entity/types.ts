import { ColumnDef, RowData } from "@tanstack/react-table";
import { Attribute, Class } from "../../../../common/entities";
import { LayoutSpacing } from "../../hooks/UseLayoutSpacing/types";

export interface EntityProps<T extends RowData = Attribute> {
  class: Class<T>;
  columnDefs: ColumnDef<T, T[keyof T]>[];
  spacing?: LayoutSpacing;
}
