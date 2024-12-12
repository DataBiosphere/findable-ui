import { useCredentials } from "../../../providers/authentication/credentials/hook";
import { UseToken } from "./types";

export const useToken = (): UseToken => {
  const {
    credentialsState: { credentials: token },
  } = useCredentials();
  return { token };
};
