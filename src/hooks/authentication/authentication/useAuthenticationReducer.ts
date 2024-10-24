import { useReducer } from "react";
import { DEFAULT_AUTHENTICATION_STATE } from "../../../providers/authentication/authentication/constants";
import { authenticationReducer } from "../../../providers/authentication/authentication/reducer";
import { AuthenticationContextProps } from "../../../providers/authentication/authentication/types";
import { initializer } from "../../../providers/authentication/common/utils";

export const useAuthenticationReducer = (
  initialState = DEFAULT_AUTHENTICATION_STATE
): AuthenticationContextProps => {
  const [authenticationState, authenticationDispatch] = useReducer(
    authenticationReducer,
    initialState,
    initializer
  );
  return { authenticationDispatch, authenticationState };
};
