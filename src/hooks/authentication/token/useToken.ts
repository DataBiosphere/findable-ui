import { useCredentials } from "../../../auth/hooks/useCredentials";
import { UseToken } from "./types";

export const useToken = (): UseToken => {
  const {
    credentialsState: { credentials: token },
  } = useCredentials();
  return { token };
};
