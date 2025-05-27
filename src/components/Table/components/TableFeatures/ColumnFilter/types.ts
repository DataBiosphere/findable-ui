import { Button, MenuProps } from "@mui/material";
import { Column, RowData } from "@tanstack/react-table";
import { BaseComponentProps } from "../../../../types";

export interface ColumnFilterProps<T extends RowData>
  extends BaseComponentProps,
    Omit<MenuProps, "anchorEl" | "onClose" | "open"> {
  Button?: typeof Button;
  column: Column<T>;
}
