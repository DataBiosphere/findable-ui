import { ColumnFiltersState, TableState } from "@tanstack/react-table";
import { DATA_DICTIONARY_URL_PARAMS } from "./constants";

/**
 * Extracts dictionary state properties that should be synchronized with URL parameters.
 * This function maps specific properties from the dictionary state to a format
 * that can be used to generate URL query parameters.
 * The extracted properties are:
 * - dictionary: Dictionary key (string).
 * - filter: Applied column filters (ColumnFiltersState).
 * - search: Applied global filter (GlobalFilterTableState) - typed as string or undefined.
 * @param dictionary - Dictionary key.
 * @param state - Dictionary table state.
 * @returns Object with properties ready for URL query serialization.
 */
export function extractDictionaryUrlState(
  dictionary: string,
  state: Partial<TableState>
): Record<string, string | ColumnFiltersState | undefined> {
  return {
    dictionary,
    [DATA_DICTIONARY_URL_PARAMS.COLUMN_FILTERS]: state.columnFilters || [],
    [DATA_DICTIONARY_URL_PARAMS.GLOBAL_FILTER]: state.globalFilter,
  };
}
