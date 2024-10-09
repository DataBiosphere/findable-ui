import { createContext } from "react";
import { CredentialsContextProps } from "./types";
import { initCredentials } from "./utils";

export const CredentialsContext = createContext<
  CredentialsContextProps<unknown>
>({
  credentialsDispatch: null,
  credentialsState: initCredentials<unknown>(),
});
