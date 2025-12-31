import { TableKey } from "../../state/tables/types";
import { TablesActionKind } from "../types";
import { UrlToStateAction, UrlToStatePayload } from "./types";

/**
 * Action creator for URL >> state sync.
 * @param tableKey - Table key.
 * @returns Action with payload and action type.
 */
export function urlToState(
  tableKey: TableKey,
): (payload: Omit<UrlToStatePayload, "tableKey">) => UrlToStateAction {
  return (payload: Omit<UrlToStatePayload, "tableKey">) => {
    return {
      payload: { ...payload, tableKey },
      type: TablesActionKind.UrlToState,
    };
  };
}
