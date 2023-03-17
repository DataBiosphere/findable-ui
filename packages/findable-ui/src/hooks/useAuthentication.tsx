import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../providers/authentication";

/**
 * Returns authentication context.
 * @returns authentication context.
 */
export const useAuthentication = (): AuthContextProps => {
  return useContext(AuthContext);
};
