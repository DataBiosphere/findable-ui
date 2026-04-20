import { useEffect, useState } from "react";
import { useAuthentication } from "../../auth/hooks/useAuthentication";
import { LoginStatus, TERRA_PROFILE_STATUS } from "../types/common";
import { TerraNIHResponse } from "../types/terra-nih";
import { TerraResponse } from "../types/terra-profile";
import { TerraTermsOfServiceResponse } from "../types/terra-tos";
import { getProfileStatus } from "../utils";
import { useFetchTerraNIHProfile } from "./useFetchTerraNIHProfile";
import { useFetchTerraProfile } from "./useFetchTerraProfile";
import { useFetchTerraTermsOfService } from "./useFetchTerraTermsOfService";

/**
 * Fetch profiles return type.
 */
export interface UseFetchProfiles {
  isAuthenticated: boolean;
  isComplete: boolean;
  isProfileActive: boolean;
  terraNIHProfileLoginStatus: LoginStatus<TerraNIHResponse>;
  terraProfileLoginStatus: LoginStatus<TerraResponse>;
  terraTOSLoginStatus: LoginStatus<TerraTermsOfServiceResponse>;
}

/**
 * Fetches all Terra profiles.
 * @param token - Token.
 * @returns fetch profiles state.
 */
export const useFetchProfiles = (token?: string): UseFetchProfiles => {
  const [status, setStatus] = useState<TERRA_PROFILE_STATUS>(
    TERRA_PROFILE_STATUS.PENDING,
  );
  const {
    authenticationState: { profile },
  } = useAuthentication();
  const isUserAuthenticated = !!profile;
  const terraNIHProfileLoginStatus = useFetchTerraNIHProfile(token);
  const terraProfileLoginStatus = useFetchTerraProfile(token);
  const terraTOSLoginStatus = useFetchTerraTermsOfService(token);

  useEffect(() => {
    setStatus(
      getProfileStatus(
        isUserAuthenticated,
        terraNIHProfileLoginStatus,
        terraProfileLoginStatus,
        terraTOSLoginStatus,
      ),
    );
  }, [
    isUserAuthenticated,
    terraNIHProfileLoginStatus,
    terraProfileLoginStatus,
    terraTOSLoginStatus,
  ]);

  return {
    isAuthenticated: isUserAuthenticated,
    isComplete: status !== TERRA_PROFILE_STATUS.PENDING,
    isProfileActive: status === TERRA_PROFILE_STATUS.AUTHENTICATED,
    terraNIHProfileLoginStatus,
    terraProfileLoginStatus,
    terraTOSLoginStatus,
  };
};
