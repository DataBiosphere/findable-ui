import { useReducer } from "react";
import { DEFAULT_AUTH_STATE } from "../constants/auth";
import { authReducer } from "../reducers/auth";
import { AuthContextProps, AuthState } from "../types/auth";
import { initializer } from "../utils/initializer";

/**
 * Auth reducer hook.
 * @param initialState - Initial state.
 * @returns auth state and dispatch.
 */
export const useAuthReducer = (
  initialState: AuthState = DEFAULT_AUTH_STATE,
): Omit<AuthContextProps, "service"> => {
  const [authState, authDispatch] = useReducer(
    authReducer,
    initialState,
    initializer,
  );
  return { authDispatch, authState };
};
