import { StateSyncManagerContext } from "../../hooks/stateSyncManager/types";
import { DATA_DICTIONARY_URL_PARAMS } from "../../providers/dataDictionaryState/dictionaries/constants";
import { DataDictionaryState } from "../../providers/dataDictionaryState/types";

/**
 * Builds the state sync manager context object for URL-state synchronization.
 * - Command: The meta command that signals a URL update operation is needed e.g. "STATE_TO_URL_PUSH" or "STATE_TO_URL_REPLACE".
 * - ParamKeys: Expected list of URL parameter keys that should be synchronized with state e.g. "filter".
 * - Query: Dictionary related query object from state that should be synchronized with the URL.
 * @param dataDictionaryState - Data dictionary state.
 * @param dictionary - Dictionary ID.
 * @returns The state sync manager context.
 */
export function buildStateSyncManagerContext(
  dataDictionaryState: DataDictionaryState,
  dictionary: string
): StateSyncManagerContext {
  return {
    command: dataDictionaryState.meta?.command,
    paramKeys: Object.values(DATA_DICTIONARY_URL_PARAMS),
    query: dataDictionaryState.dictionaries?.[dictionary]?.query,
  };
}
