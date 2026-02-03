import { createContext } from "react";
import { DEFAULT_AUTH_STATE } from "../constants/auth";
import { AuthContextProps } from "../types/auth";

/**
 * Auth context.
 */
export const AuthContext = createContext<AuthContextProps>({
  authDispatch: null,
  authState: DEFAULT_AUTH_STATE,
  service: undefined,
});
