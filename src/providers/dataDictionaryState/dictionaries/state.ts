import { TableState } from "@tanstack/react-table";
import { stateToUrlQuery } from "../../../utils/stateToUrlQuery";
import { DataDictionaryState } from "../types";
import { DictionariesContext } from "./types";
import { extractDictionaryUrlState as extractUrlState } from "./utils";

/**
 * Builds the next dictionaries context.
 * @param state - State.
 * @param dictionaryKey - Dictionary key.
 * @param nextDictionaryState - Next dictionary state.
 * @returns Next dictionaries context.
 */
export function buildNextDictionaries(
  state: DataDictionaryState,
  dictionaryKey: string,
  nextDictionaryState: Partial<TableState>,
): DictionariesContext {
  // Clone the dictionaries.
  const dictionaries: DictionariesContext = { ...state.dictionaries };

  for (const [key, dictionary] of Object.entries(dictionaries)) {
    // Clone the dictionary context.
    const dictionaryContext = { ...dictionary };

    // If the dictionary key is a match, update the dictionary context.
    if (key === dictionaryKey) {
      // Update the dictionary state.
      dictionaryContext.state = { ...dictionary.state, ...nextDictionaryState };

      // Grab param values from the updated dictionary state.
      const { columnFilters, globalFilter } = dictionaryContext.state;

      // Update the dictionary query.
      dictionaryContext.query = stateToUrlQuery(
        extractUrlState(key, { columnFilters, globalFilter }),
      );
    }

    // Update the dictionary context.
    dictionaries[key] = dictionaryContext;
  }

  return dictionaries;
}
