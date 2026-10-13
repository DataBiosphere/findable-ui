import { MenuProps } from "@mui/material";
import { Column, RowData } from "@tanstack/react-table";
import { BaseComponentProps } from "../../../../types";
import { StyledButton } from "./columnFilter.styles";

/**
 * Props for the ColumnFilter component.
 */
export interface ColumnFilterProps<T extends RowData>
  extends BaseComponentProps, Omit<MenuProps, "anchorEl" | "onClose" | "open"> {
  Button?: typeof StyledButton;
  column: Column<T>;
}
