import { RowData, Table } from "@tanstack/react-table";
import { ROW_DIRECTION } from "../../common/entities";

export interface TableHeadProps<T extends RowData> {
  rowDirection: ROW_DIRECTION;
  tableInstance: Table<T>;
}
