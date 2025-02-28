import { createContext } from "react";
import { LoginGuardCallback, LoginGuardContextProps } from "./common/types";

/**
 * LoginGuardContext provides a way to trigger a login process. Default value is to
 * call the callback immediately, if specified.
 */
export const LoginGuardContext = createContext<LoginGuardContextProps>({
  requireLogin: (callback?: LoginGuardCallback) => {
    callback?.();
  },
});
