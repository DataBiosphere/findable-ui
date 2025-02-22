import { createContext } from "react";
import { LoginGuardContextProps } from "./common/types";

/**
 * LoginGuardContext provides a way to trigger a login process. Default value is a
 * no-op function.
 */
export const LoginGuardContext = createContext<LoginGuardContextProps>({
  requireLogin: () => {},
});
