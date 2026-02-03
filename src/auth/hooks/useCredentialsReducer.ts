import { useReducer } from "react";
import { DEFAULT_CREDENTIALS_STATE } from "../constants/credentials";
import { credentialsReducer } from "../reducers/credentials";
import { CredentialsContextProps } from "../types/credentials";

/**
 * Credentials reducer hook.
 * @returns credentials state and dispatch.
 */
export const useCredentialsReducer = (): CredentialsContextProps => {
  const [credentialsState, credentialsDispatch] = useReducer(
    credentialsReducer,
    undefined,
    () => DEFAULT_CREDENTIALS_STATE,
  );
  return { credentialsDispatch, credentialsState };
};
