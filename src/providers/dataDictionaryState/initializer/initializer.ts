import { UseDataDictionaryInitialArgs } from "../hooks/UseDataDictionaryInitialArgs/types";
import { DataDictionaryState } from "../types";
import { INITIAL_DATA_DICTIONARY_STATE } from "./constants";
import { initDictionaries } from "./utils";

/**
 * Initializer function for the data dictionary reducer, returning initial state.
 * @param initialArgs - Initial arguments.
 * @param initialArgs.dataDictionaries - Data dictionary configs.
 * @returns The initialized data dictionary state.
 */
export function initializer({
  dataDictionaries,
}: UseDataDictionaryInitialArgs): DataDictionaryState {
  // If no data dictionary configs are provided, return default initial state.
  if (!dataDictionaries) return INITIAL_DATA_DICTIONARY_STATE;

  return {
    dictionaries: initDictionaries(dataDictionaries),
    meta: null,
  };
}
