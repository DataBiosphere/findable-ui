import React, { useReducer } from "react";
import { CredentialsContext } from "./context";
import { credentialsReducer } from "./reducer";
import {
  CredentialsAction,
  CredentialsContextProps,
  CredentialsProviderProps,
  CredentialsState,
} from "./types";
import { initCredentials } from "./utils";

export function CredentialsProvider<C>({
  children,
}: CredentialsProviderProps): JSX.Element {
  const [credentialsState, credentialsDispatch] = useReducer(
    (s: CredentialsState<C>, a: CredentialsAction<C>) =>
      credentialsReducer(s, a),
    initCredentials<C>()
  );
  return (
    <CredentialsContext.Provider
      value={
        {
          credentialsDispatch,
          credentialsState,
        } as CredentialsContextProps<unknown>
      }
    >
      {children}
    </CredentialsContext.Provider>
  );
}
