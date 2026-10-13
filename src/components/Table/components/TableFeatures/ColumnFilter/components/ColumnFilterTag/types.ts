import { ChipProps } from "@mui/material";
import { Column, RowData } from "@tanstack/react-table";
import { BaseComponentProps } from "../../../../../../types";

/**
 * Props for the ColumnFilterTag component.
 */
export interface ColumnFilterTagProps<T extends RowData>
  extends BaseComponentProps, ChipProps {
  column: Column<T>;
}
