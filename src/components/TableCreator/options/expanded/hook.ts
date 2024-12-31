import { ExpandedOptions, RowData } from "@tanstack/react-table";
import { EXPANDED_OPTIONS } from "./constants";

export function useExpandedOptions<T extends RowData>(): ExpandedOptions<T> {
  return { ...EXPANDED_OPTIONS };
}
