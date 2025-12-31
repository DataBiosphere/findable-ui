import { TablesActionKind } from "../types";
import { StateToUrlAction, StateToUrlPayload } from "./types";

/**
 * Action creator for state >> URL sync.
 * @param payload - Payload.
 * @returns Action with payload and action type.
 */
export function stateToUrl(payload: StateToUrlPayload): StateToUrlAction {
  return {
    payload,
    type: TablesActionKind.StateToUrl,
  };
}
