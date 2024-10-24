import { useContext } from "react";
import { AuthorizationContext } from "./context";
import { AuthorizationContextProps } from "./types";

/**
 * Authorization hook.
 * @returns authorization context.
 */
export const useAuthorization = (): AuthorizationContextProps => {
  return useContext<AuthorizationContextProps>(AuthorizationContext);
};
