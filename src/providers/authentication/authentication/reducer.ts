import { updateAuthenticationAction } from "./actions";
import {
  AUTHENTICATION_STATUS,
  AuthenticationAction,
  AuthenticationActionKind,
  AuthenticationState,
} from "./types";

/**
 * Authentication reducer.
 * Reducer for user profile and status.
 * @param state - State.
 * @param action - Action.
 * @returns state.
 */
export function authenticationReducer(
  state: AuthenticationState,
  action: AuthenticationAction
): AuthenticationState {
  const { payload, type } = action;
  switch (type) {
    case AuthenticationActionKind.RequestAuthentication: {
      return { ...state, status: AUTHENTICATION_STATUS.PENDING };
    }
    case AuthenticationActionKind.ResetState: {
      return { ...state, ...state.initialState };
    }
    case AuthenticationActionKind.UpdateAuthentication: {
      return updateAuthenticationAction(state, payload);
    }
    default:
      return state;
  }
}
