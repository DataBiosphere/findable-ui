import { useEffect, useState } from "react";
import { useAuthentication } from "../../authentication/hook";
import { TERRA_PROFILE_STATUS } from "../types";
import { getProfileStatus } from "../utils";
import { LoginStatus } from "./common/entities";
import {
  TerraNIHResponse,
  useFetchTerraNIHProfile,
} from "./useFetchTerraNIHProfile";
import { TerraResponse, useFetchTerraProfile } from "./useFetchTerraProfile";
import {
  TerraTermsOfServiceResponse,
  useFetchTerraTermsOfService,
} from "./useFetchTerraTermsOfService";

export interface UseFetchProfiles {
  isAuthenticated: boolean;
  isComplete: boolean;
  isProfileActive: boolean;
  terraNIHProfileLoginStatus: LoginStatus<TerraNIHResponse>;
  terraProfileLoginStatus: LoginStatus<TerraResponse>;
  terraTOSLoginStatus: LoginStatus<TerraTermsOfServiceResponse>;
}

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
