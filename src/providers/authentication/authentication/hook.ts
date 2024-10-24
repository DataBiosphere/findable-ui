import { useContext } from "react";
import { AuthenticationContext } from "./context";
import { AuthenticationContextProps } from "./types";

/**
 * Authentication hook.
 * @returns authentication context.
 */
export const useAuthentication = (): AuthenticationContextProps => {
  return useContext(AuthenticationContext);
};
