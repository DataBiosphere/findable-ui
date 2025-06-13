import { RowData, Table } from "@tanstack/react-table";
import { Attribute } from "../../../../../../common/entities";
import { BaseComponentProps } from "../../../../../types";

export interface ColumnFilterTagsProps<T extends RowData = Attribute>
  extends BaseComponentProps {
  table: Table<T>;
}
