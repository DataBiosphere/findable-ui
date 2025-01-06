import { createContext } from "react";
import { DEFAULT_AUTHENTICATION_STATE } from "./constants";
import { AuthenticationContextProps } from "./types";

export const AuthenticationContext = createContext<AuthenticationContextProps>({
  authenticationDispatch: null,
  authenticationState: DEFAULT_AUTHENTICATION_STATE,
});
