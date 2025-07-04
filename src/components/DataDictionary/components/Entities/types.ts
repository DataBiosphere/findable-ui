import { RowData, Table } from "@tanstack/react-table";
import { Attribute } from "../../../../common/entities";
import { LayoutSpacing } from "../../../../hooks/UseLayoutSpacing/types";

export interface ClassesProps<T extends RowData = Attribute> {
  spacing?: LayoutSpacing;
  table: Table<T>;
}
