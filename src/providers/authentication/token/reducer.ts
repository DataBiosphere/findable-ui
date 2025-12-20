import { DEFAULT_TOKEN_STATE } from "./constants";
import { TokenAction, TokenActionKind, TokenState } from "./types";

/**
 * Token reducer.
 * @param state - State.
 * @param action - Action.
 * @returns state.
 */
export function tokenReducer(
  state: TokenState,
  action: TokenAction,
): TokenState {
  const { payload, type } = action;
  switch (type) {
    case TokenActionKind.ResetState:
      return DEFAULT_TOKEN_STATE;
    case TokenActionKind.UpdateToken:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
