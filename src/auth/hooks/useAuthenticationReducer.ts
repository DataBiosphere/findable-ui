import { useReducer } from "react";
import { DEFAULT_AUTHENTICATION_STATE } from "../constants/authentication";
import { authenticationReducer } from "../reducers/authentication";
import {
  AuthenticationContextProps,
  AuthenticationState,
} from "../types/authentication";
import { initializer } from "../utils/initializer";

/**
 * Authentication reducer hook.
 * @param initialState - Initial state.
 * @returns authentication state and dispatch.
 */
export const useAuthenticationReducer = (
  initialState: AuthenticationState = DEFAULT_AUTHENTICATION_STATE,
): AuthenticationContextProps => {
  const [authenticationState, authenticationDispatch] = useReducer(
    authenticationReducer,
    initialState,
    initializer,
  );
  return { authenticationDispatch, authenticationState };
};
