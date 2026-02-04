import { Profile, UserProfile } from "../../../auth/types/authentication";

export interface UseProfile {
  isLoading: boolean;
  profile: Profile<UserProfile>;
}
