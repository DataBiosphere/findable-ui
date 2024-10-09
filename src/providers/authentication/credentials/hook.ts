import { Context, useContext } from "react";
import { CredentialsContext } from "./context";
import { CredentialsContextProps } from "./types";

/**
 * Credentials hook.
 * @returns credentials context.
 */
export const useCredentials = <C>(): CredentialsContextProps<C> => {
  return useContext<CredentialsContextProps<C>>(
    CredentialsContext as Context<CredentialsContextProps<C>>
  );
};
