import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { AuthContextProps } from "../types/auth";

/**
 * Auth hook.
 * @returns auth context.
 */
export const useAuth = (): AuthContextProps => {
  return useContext<AuthContextProps>(AuthContext);
};
