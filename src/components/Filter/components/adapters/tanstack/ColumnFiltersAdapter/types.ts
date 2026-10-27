import {
  RowData,
  Table,
  TableMeta as TanStackTableMeta,
} from "@tanstack/react-table";
import { JSX } from "react";
import {
  FILTER_SORT,
  type FilterSortConfig,
} from "../../../../../../common/filters/sort/config/types";
import { CategoryGroup } from "../../../../../../config/entities";
import { SurfaceProps } from "../../../surfaces/types";

/**
 * Props for the ColumnFiltersAdapter component.
 */
export interface ColumnFiltersAdapterProps<T extends RowData> {
  renderSurface: (props: SurfaceProps) => JSX.Element | null;
  table: Table<T>;
}

/**
 * Column filters options added to the TanStack table meta: the category groups to group the filters by, and the filter value sort.
 * The filter sort is either the default sort, or a filter sort config with the default sort and an optional comparator; setting a default sort also enables the filter sort control.
 */
export interface ColumnFiltersTableMeta<
  T extends RowData,
> extends TanStackTableMeta<T> {
  categoryGroups?: CategoryGroup[];
  filterSort?: FILTER_SORT | FilterSortConfig;
}
