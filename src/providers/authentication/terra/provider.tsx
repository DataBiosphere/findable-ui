import React, { useEffect, useMemo } from "react";
import { useAuth } from "../auth/hook";
import { updateAuthorization } from "../authorization/dispatch";
import { useAuthorization } from "../authorization/hook";
import { TerraProfileContext } from "./context";
import { useFetchTerraNIHProfile } from "./hooks/useFetchTerraNIHProfile";
import { useFetchTerraProfile } from "./hooks/useFetchTerraProfile";
import { useFetchTerraTermsOfService } from "./hooks/useFetchTerraTermsOfService";
import { TerraProfileProviderProps } from "./types";
import { getAuthorizationStatus } from "./utils";

export function TerraProfileProvider({
  children,
  token,
}: TerraProfileProviderProps): JSX.Element {
  const {
    authState: { isAuthenticated },
  } = useAuth();
  const { authorizationDispatch } = useAuthorization();
  const terraNIHProfileLoginStatus = useFetchTerraNIHProfile(token);
  const terraProfileLoginStatus = useFetchTerraProfile(token);
  const terraTOSLoginStatus = useFetchTerraTermsOfService(token);
  const authorizationStatus = useMemo(
    () =>
      getAuthorizationStatus(
        isAuthenticated,
        terraNIHProfileLoginStatus,
        terraProfileLoginStatus,
        terraTOSLoginStatus
      ),
    [
      isAuthenticated,
      terraNIHProfileLoginStatus,
      terraProfileLoginStatus,
      terraTOSLoginStatus,
    ]
  );

  useEffect(() => {
    authorizationDispatch?.(updateAuthorization(authorizationStatus));
  }, [authorizationDispatch, authorizationStatus]);

  return (
    <TerraProfileContext.Provider
      value={{
        terraNIHProfileLoginStatus,
        terraProfileLoginStatus,
        terraTOSLoginStatus,
      }}
    >
      {children}
    </TerraProfileContext.Provider>
  );
}
