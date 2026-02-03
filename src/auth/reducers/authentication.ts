import {
  AUTHENTICATION_STATUS,
  AuthenticationAction,
  AuthenticationActionKind,
  AuthenticationState,
  UpdateAuthenticationPayload,
} from "../types/authentication";

/**
 * Update authentication action.
 * @param state - State.
 * @param payload - Payload.
 * @returns state.
 */
function updateAuthenticationAction(
  state: AuthenticationState,
  payload: UpdateAuthenticationPayload,
): AuthenticationState {
  return {
    ...state,
    ...payload,
  };
}

/**
 * Authentication reducer.
 * Reducer for user profile and status.
 * @param state - State.
 * @param action - Action.
 * @returns state.
 */
export function authenticationReducer(
  state: AuthenticationState,
  action: AuthenticationAction,
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
