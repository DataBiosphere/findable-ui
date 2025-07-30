import { RowData, Table } from "@tanstack/react-table";
import { SurfaceProps } from "../../../surfaces/types";

export interface ColumnFiltersAdapterProps<T extends RowData> {
  renderSurface: (props: SurfaceProps) => JSX.Element | null;
  table: Table<T>;
}
