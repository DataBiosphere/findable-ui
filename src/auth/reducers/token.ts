import { DEFAULT_TOKEN_STATE } from "../constants/token";
import { TokenAction, TokenActionKind, TokenState } from "../types/token";

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
