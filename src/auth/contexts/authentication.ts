import { createContext } from "react";
import { DEFAULT_AUTHENTICATION_STATE } from "../constants/authentication";
import { AuthenticationContextProps } from "../types/authentication";

/**
 * Authentication context.
 */
export const AuthenticationContext = createContext<AuthenticationContextProps>({
  authenticationDispatch: null,
  authenticationState: DEFAULT_AUTHENTICATION_STATE,
});
