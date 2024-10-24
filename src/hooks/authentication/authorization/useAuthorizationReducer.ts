import { useReducer } from "react";
import { DEFAULT_AUTHORIZATION_STATE } from "../../../providers/authentication/authorization/constants";
import { authorizationReducer } from "../../../providers/authentication/authorization/reducer";
import { AuthorizationContextProps } from "../../../providers/authentication/authorization/types";
import { initializer } from "../../../providers/authentication/common/utils";

export const useAuthorizationReducer = (
  initialState = DEFAULT_AUTHORIZATION_STATE
): AuthorizationContextProps => {
  const [authorizationState, authorizationDispatch] = useReducer(
    authorizationReducer,
    initialState,
    initializer
  );
  return { authorizationDispatch, authorizationState };
};
