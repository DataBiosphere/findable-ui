import { updateAuthorizationStatus } from "./actions";
import {
  AUTHORIZATION_STATUS,
  AuthorizationAction,
  AuthorizationActionKind,
  AuthorizationState,
} from "./types";

/**
 * Authorization reducer.
 * @param state - State.
 * @param action - Action.
 * @returns state.
 */
export function authorizationReducer(
  state: AuthorizationState,
  action: AuthorizationAction
): AuthorizationState {
  const { payload, type } = action;
  switch (type) {
    case AuthorizationActionKind.RequestAuthorization: {
      return { ...state, status: AUTHORIZATION_STATUS.PENDING };
    }
    case AuthorizationActionKind.ResetState: {
      return { ...state, ...state.initialState };
    }
    case AuthorizationActionKind.UpdateAuthorizationStatus: {
      return updateAuthorizationStatus(state, payload);
    }
    default:
      return state;
  }
}
