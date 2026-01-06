import { useReducer } from "react";
import { DEFAULT_CREDENTIALS_STATE } from "../../../providers/authentication/credentials/constants";
import { credentialsReducer } from "../../../providers/authentication/credentials/reducer";
import { CredentialsContextProps } from "../../../providers/authentication/credentials/types";

export const useCredentialsReducer = (): CredentialsContextProps => {
  const [credentialsState, credentialsDispatch] = useReducer(
    credentialsReducer,
    undefined,
    () => DEFAULT_CREDENTIALS_STATE,
  );
  return { credentialsDispatch, credentialsState };
};
