import { useContext } from "react";
import { CredentialsContext } from "../contexts/credentials";
import { CredentialsContextProps } from "../types/credentials";

/**
 * Credentials hook.
 * @returns credentials context.
 */
export const useCredentials = (): CredentialsContextProps => {
  return useContext<CredentialsContextProps>(CredentialsContext);
};
