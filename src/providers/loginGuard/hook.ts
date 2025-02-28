import { useContext } from "react";
import { LoginGuardContextProps } from "./common/types";
import { LoginGuardContext } from "./context";

/**
 * Custom hook to access the LoginGuard context. This hook returns an object
 * containing the "requireLogin" function, which allows triggering the application's
 * login process.
 *
 * @returns The current LoginGuard context value.
 */
export function useLoginGuard(): LoginGuardContextProps {
  return useContext<LoginGuardContextProps>(LoginGuardContext);
}
