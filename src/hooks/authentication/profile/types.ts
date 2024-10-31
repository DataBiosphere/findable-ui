import {
  Profile,
  UserProfile,
} from "../../../providers/authentication/authentication/types";

export interface UseProfile {
  isLoading: boolean;
  profile: Profile<UserProfile>;
}
