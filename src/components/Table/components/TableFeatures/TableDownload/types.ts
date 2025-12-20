import { RowData, Table } from "@tanstack/react-table";
import { BaseComponentProps } from "../../../../types";

export interface TableDownloadProps<
  T extends RowData,
> extends BaseComponentProps {
  table: Table<T>;
}
