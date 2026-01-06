import { RowData, RowSelectionOptions } from "@tanstack/react-table";
import { ROW_SELECTION_OPTIONS } from "./constants";

export function useRowSelectionOptions<
  T extends RowData,
>(): RowSelectionOptions<T> {
  return { ...(ROW_SELECTION_OPTIONS as RowSelectionOptions<T>) };
}
