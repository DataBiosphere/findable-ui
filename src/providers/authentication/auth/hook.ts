import { useContext } from "react";
import { AuthContext } from "./context";
import { AuthContextProps } from "./types";

/**
 * Auth hook.
 * @returns auth context.
 */
export const useAuth = (): AuthContextProps => {
  return useContext<AuthContextProps>(AuthContext);
};
