import { DataDictionaryState } from "../../types";
import { UpdateStateFromUrlPayload } from "./types";

export function areEqualStateAndUrl(
  state: DataDictionaryState,
  payload: UpdateStateFromUrlPayload
): boolean {
  const { columnFilters } = state;

  // Default to empty array if no filter to match empty column filters `[]`.
  const { filter = "[]" } = payload;

  // Test for equality - stringifying column filters should yield the same string as filter.
  return JSON.stringify(columnFilters) === filter;
}
