import { OutlinedInputProps } from "@mui/material";
import { RowData, Table } from "@tanstack/react-table";
import { BaseComponentProps } from "components/types";

export interface GlobalFilterProps<T extends RowData>
  extends BaseComponentProps,
    OutlinedInputProps {
  table: Table<T>;
}
