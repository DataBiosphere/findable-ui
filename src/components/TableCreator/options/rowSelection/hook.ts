import { RowData, RowSelectionOptions } from "@tanstack/react-table";
import { ROW_SELECTION_OPTIONS } from "./constants";

/**
 * Returns the table's row selection options; row selection is off.
 * @returns Row selection options.
 */
export function useRowSelectionOptions<
  T extends RowData,
>(): RowSelectionOptions<T> {
  return { ...(ROW_SELECTION_OPTIONS as RowSelectionOptions<T>) };
}
