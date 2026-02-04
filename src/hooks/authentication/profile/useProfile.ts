import { useAuth } from "../../../auth/hooks/useAuth";
import { useAuthentication } from "../../../auth/hooks/useAuthentication";
import { AUTH_STATUS } from "../../../auth/types/auth";
import { UseProfile } from "./types";

/**
 * Profile hook - returns user profile.
 * @returns user profile.
 */
export const useProfile = (): UseProfile => {
  const {
    authState: { status },
  } = useAuth();
  const {
    authenticationState: { profile },
  } = useAuthentication();
  return {
    isLoading: status === AUTH_STATUS.PENDING,
    profile: profile,
  };
};
