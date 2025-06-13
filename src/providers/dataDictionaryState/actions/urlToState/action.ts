import { parseJsonQueryParam } from "../../../../utils/parseJsonQueryParam";
import { DATA_DICTIONARY_URL_PARAMS } from "../../dictionaries/constants";
import { buildNextDictionaries } from "../../dictionaries/state";
import { DataDictionaryState } from "../../types";
import { UrlToStatePayload } from "./types";

/**
 * Reducer function to handle the "URL >> state sync" action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function urlToStateAction(
  state: DataDictionaryState,
  payload: UrlToStatePayload
): DataDictionaryState {
  if (typeof payload.query.dictionary !== "string") return state;
  return {
    ...state,
    dictionaries: buildNextDictionaries(state, payload.query.dictionary, {
      columnFilters: parseJsonQueryParam(
        payload.query[DATA_DICTIONARY_URL_PARAMS.FILTER],
        []
      ),
      globalFilter: payload.query[DATA_DICTIONARY_URL_PARAMS.GLOBAL_FILTER],
    }),
  };
}
