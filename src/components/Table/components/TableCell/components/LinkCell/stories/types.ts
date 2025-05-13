import { LinkProps } from "@mui/material";
import { CellContext, RowData } from "@tanstack/react-table";

export type GetValue = CellContext<RowData, LinkProps>["getValue"];
