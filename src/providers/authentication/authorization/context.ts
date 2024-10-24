import { createContext } from "react";
import { DEFAULT_AUTHORIZATION_STATE } from "./constants";
import { AuthorizationContextProps } from "./types";

export const AuthorizationContext = createContext<AuthorizationContextProps>({
  authorizationDispatch: null,
  authorizationState: DEFAULT_AUTHORIZATION_STATE,
});
