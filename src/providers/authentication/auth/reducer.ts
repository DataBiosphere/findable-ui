import { updateAuthState } from "./actions";
import { AuthAction, AuthActionKind, AuthState } from "./types";

/**
 * Auth reducer.
 * @param state - State.
 * @param action - Action.
 * @returns state.
 */
export function authReducer(state: AuthState, action: AuthAction): AuthState {
  const { payload, type } = action;
  switch (type) {
    case AuthActionKind.ResetState: {
      return { ...state, ...state.initialState };
    }
    case AuthActionKind.UpdateAuthState: {
      return updateAuthState(state, payload);
    }
    default:
      return state;
  }
}
