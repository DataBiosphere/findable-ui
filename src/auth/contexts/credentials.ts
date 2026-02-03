import { createContext } from "react";
import { DEFAULT_CREDENTIALS_STATE } from "../constants/credentials";
import { CredentialsContextProps } from "../types/credentials";

/**
 * Credentials context.
 */
export const CredentialsContext = createContext<CredentialsContextProps>({
  credentialsDispatch: null,
  credentialsState: DEFAULT_CREDENTIALS_STATE,
});
