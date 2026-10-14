import { useCredentials } from "../../../auth/hooks/useCredentials";
import { UseToken } from "./types";

/**
 * Returns the current access token from the credentials state.
 * @returns The access token; undefined when not signed in.
 */
export const useToken = (): UseToken => {
  const {
    credentialsState: { credentials: token },
  } = useCredentials();
  return { token };
};
