import { ExpandedOptions, RowData } from "@tanstack/react-table";
import { EXPANDED_OPTIONS } from "./constants";

/**
 * Returns the table's row expanding options; expanding is off.
 * @returns Expanded options.
 */
export function useExpandedOptions<T extends RowData>(): ExpandedOptions<T> {
  return { ...EXPANDED_OPTIONS };
}
