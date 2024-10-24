import { createContext } from "react";
import { DEFAULT_CREDENTIALS_STATE } from "./constants";
import { CredentialsContextProps } from "./types";

export const CredentialsContext = createContext<CredentialsContextProps>({
  credentialsDispatch: null,
  credentialsState: DEFAULT_CREDENTIALS_STATE,
});
