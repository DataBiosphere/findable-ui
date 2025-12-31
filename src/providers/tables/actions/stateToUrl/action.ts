import { META_COMMAND } from "../../../../hooks/stateSyncManager/hooks/UseMetaCommands/types";
import { TablesState } from "../../state/types";
import { ROUTER_METHOD, StateToUrlPayload } from "./types";

/**
 * Reducer function to handle the "state >> URL sync" action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
export function stateToUrlAction(
  state: TablesState,
  payload: StateToUrlPayload,
): TablesState {
  const command =
    payload.method === ROUTER_METHOD.PUSH
      ? META_COMMAND.STATE_TO_URL_PUSH
      : META_COMMAND.STATE_TO_URL_REPLACE;
  return { ...state, meta: { command } };
}
