import { useContext } from "react";
import { AuthenticationContext } from "../contexts/authentication";
import { AuthenticationContextProps } from "../types/authentication";

/**
 * Authentication hook.
 * @returns authentication context.
 */
export const useAuthentication = (): AuthenticationContextProps => {
  return useContext(AuthenticationContext);
};
