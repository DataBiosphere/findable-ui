/**
 * Terra profile response.
 */
export interface TerraResponse {
  enabled: TerraResponseEnabled;
  userInfo: TerraResponseUserInfo;
}

/**
 * Terra enabled flags.
 */
interface TerraResponseEnabled {
  adminEnabled: boolean;
  allUsersGroup: boolean;
  google: boolean;
  ldap: boolean;
  tosAccepted: boolean;
}

/**
 * Terra user info.
 */
interface TerraResponseUserInfo {
  userEmail: string;
  userSubjectId: string;
}
