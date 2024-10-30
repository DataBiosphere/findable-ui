import { useAuthentication } from "../../../providers/authentication/authentication/hook";
import { UseProfile } from "./types";

/**
 * Authentication hook.
 * @returns authentication context.
 */
export const useProfile = (): UseProfile => {
  const {
    authenticationState: { profile },
  } = useAuthentication();
  return {
    profile,
  };
};
