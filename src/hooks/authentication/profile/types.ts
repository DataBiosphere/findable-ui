import {
  Profile,
  UserProfile,
} from "../../../providers/authentication/authentication/types";

export interface UseProfile {
  profile: Profile<UserProfile>;
}
