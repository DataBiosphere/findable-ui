import { useAuthentication } from "../../../providers/authentication/authentication/hook";
import { AUTHENTICATION_STATUS } from "../../../providers/authentication/authentication/types";
import { UseProfile } from "./types";

/**
 * Authentication hook.
 * @returns authentication context.
 */
export const useProfile = (): UseProfile => {
  const {
    authenticationState: { profile, status },
  } = useAuthentication();
  return {
    isLoading: status === AUTHENTICATION_STATUS.PENDING,
    profile,
  };
};
