import { CellContext, RowData } from "@tanstack/react-table";
import { MarkdownCellProps } from "../types";

export type GetValue = CellContext<RowData, MarkdownCellProps>["getValue"];
