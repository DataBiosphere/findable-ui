import { Credentials } from "../../../auth/types/credentials";

/**
 * Return value of the useToken hook.
 */
export interface UseToken {
  token: Credentials;
}
