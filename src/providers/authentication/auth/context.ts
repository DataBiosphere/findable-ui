import { createContext } from "react";
import { DEFAULT_AUTH_STATE } from "./constants";
import { AuthContextProps } from "./types";

export const AuthContext = createContext<AuthContextProps>({
  authDispatch: null,
  authState: DEFAULT_AUTH_STATE,
  service: undefined,
});
