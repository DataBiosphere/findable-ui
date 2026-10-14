import { Profile, UserProfile } from "../../../auth/types/authentication";

/**
 * Return value of the useProfile hook.
 */
export interface UseProfile {
  isLoading: boolean;
  profile: Profile<UserProfile>;
}
