import { useAuth } from "../../../providers/authentication/auth/hook";
import { AUTH_STATUS } from "../../../providers/authentication/auth/types";
import { useAuthentication } from "../../../providers/authentication/authentication/hook";
import { UseProfile } from "./types";

/**
 * Authentication hook.
 * @returns authentication context.
 */
export const useProfile = (): UseProfile => {
  const {
    authState: { isAuthenticated, status },
  } = useAuth();
  const {
    authenticationState: { profile },
  } = useAuthentication();
  return {
    isLoading: status === AUTH_STATUS.PENDING,
    profile: isAuthenticated ? profile : undefined, // Release the profile only when the user is authenticated.
  };
};
