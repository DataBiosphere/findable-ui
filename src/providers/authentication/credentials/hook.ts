import { useContext } from "react";
import { CredentialsContext } from "./context";
import { CredentialsContextProps } from "./types";

/**
 * Credentials hook.
 * @returns credentials context.
 */
export const useCredentials = (): CredentialsContextProps => {
  return useContext<CredentialsContextProps>(CredentialsContext);
};
