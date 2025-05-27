import { Row, RowData, Table } from "@tanstack/react-table";
import { Attribute } from "../../../../common/entities";
import { LayoutSpacing } from "../../hooks/UseLayoutSpacing/types";

export interface EntityProps<T extends RowData = Attribute> {
  row: Row<T>;
  spacing?: LayoutSpacing;
  table: Table<T>;
}
