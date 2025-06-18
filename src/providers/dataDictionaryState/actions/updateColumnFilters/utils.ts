import { ColumnFiltersState, functionalUpdate } from "@tanstack/react-table";
import { DataDictionaryState } from "../../types";
import { UpdateColumnFiltersPayload } from "./types";

/**
 * Builds the next column filters state for the current dictionary.
 * Uses TanStack updater to update the column filters state.
 * @param state - State.
 * @param payload - Payload.
 * @returns column filters state.
 */
export function buildNextColumnFilters(
  state: DataDictionaryState,
  payload: UpdateColumnFiltersPayload
): ColumnFiltersState {
  return functionalUpdate(
    payload.updaterOrValue,
    getOldColumnFilters(state, payload)
  );
}

/**
 * Retrieves the current "old" column filters state.
 * @param state - State.
 * @param payload - Payload.
 * @returns old column filters state.
 */
function getOldColumnFilters(
  state: DataDictionaryState,
  payload: UpdateColumnFiltersPayload
): ColumnFiltersState {
  // Grab the dictionary.
  const dictionary = state.dictionaries[payload.dictionary];

  // If the dictionary is not found, return an empty array.
  if (!dictionary) return [];

  // Grab column filters from dictionary state.
  const { columnFilters = [] } = dictionary.state;
  return columnFilters;
}
