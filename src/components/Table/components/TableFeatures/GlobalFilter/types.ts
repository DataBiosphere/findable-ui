import { OutlinedInputProps } from "@mui/material";
import { RowData, Table } from "@tanstack/react-table";
import type { BaseComponentProps } from "../../../../types";

/**
 * Props for the GlobalFilter component.
 */
export interface GlobalFilterProps<T extends RowData>
  extends BaseComponentProps, OutlinedInputProps {
  table: Table<T>;
}
