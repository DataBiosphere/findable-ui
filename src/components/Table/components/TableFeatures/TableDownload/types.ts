import { RowData, Table } from "@tanstack/react-table";
import { BaseComponentProps } from "../../../../types";

/**
 * Props for the TableDownload component.
 */
export interface TableDownloadProps<
  T extends RowData,
> extends BaseComponentProps {
  table: Table<T>;
}
