import {
  RowData,
  Table,
  TableMeta as TanStackTableMeta,
} from "@tanstack/react-table";
import { CategoryGroup } from "../../../../../../config/entities";
import { SurfaceProps } from "../../../surfaces/types";

export interface ColumnFiltersAdapterProps<T extends RowData> {
  renderSurface: (props: SurfaceProps) => JSX.Element | null;
  table: Table<T>;
}
export interface ColumnFiltersTableMeta<T extends RowData>
  extends TanStackTableMeta<T> {
  categoryGroups?: CategoryGroup[];
}
