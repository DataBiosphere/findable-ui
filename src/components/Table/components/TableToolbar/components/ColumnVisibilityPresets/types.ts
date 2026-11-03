import type { RowData, Table } from "@tanstack/react-table";
import type { BaseComponentProps } from "../../../../../types";

/**
 * Props for the ColumnVisibilityPresets component.
 */
export interface ColumnVisibilityPresetsProps<
  T extends RowData,
> extends BaseComponentProps {
  tableInstance: Table<T>;
}
