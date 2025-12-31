import { buildNextTablesByGroupKey } from "providers/tables/state/tables/updater";
import { parseJsonQueryParam } from "../../../../utils/parseJsonQueryParam";
import { PARAM } from "../../state/queries/constants";
import { TablesState } from "../../state/types";
import { UrlToStatePayload } from "./types";
import { ColumnFiltersState } from "@tanstack/react-table";

/**
 * Reducer function to handle the "URL >> state sync" action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function urlToStateAction(
  state: TablesState,
  payload: UrlToStatePayload,
): TablesState {
  if (typeof payload.query.dictionary !== "string") return state;
  return {
    ...state,
    tables: buildNextTablesByGroupKey(state, payload.query.dictionary, {
      columnFilters: parseJsonQueryParam<ColumnFiltersState>(
        payload.query[PARAM.COLUMN_FILTERS],
        [],
      )!, // Non-null assertion safe: default value [] ensures return type is ColumnFiltersState.
    }),
  };
}
