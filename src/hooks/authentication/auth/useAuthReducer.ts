import { useReducer } from "react";
import { DEFAULT_AUTH_STATE } from "../../../providers/authentication/auth/constants";
import { authReducer } from "../../../providers/authentication/auth/reducer";
import { AuthContextProps } from "../../../providers/authentication/auth/types";
import { initializer } from "../../../providers/authentication/common/utils";

export const useAuthReducer = (
  initialState = DEFAULT_AUTH_STATE,
): Omit<AuthContextProps, "service"> => {
  const [authState, authDispatch] = useReducer(
    authReducer,
    initialState,
    initializer,
  );
  return { authDispatch, authState };
};
