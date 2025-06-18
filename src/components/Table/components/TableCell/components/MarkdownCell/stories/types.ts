import { CellContext, RowData } from "@tanstack/react-table";

export type GetValue = CellContext<RowData, string>["getValue"];
