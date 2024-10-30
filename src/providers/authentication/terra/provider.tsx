import React, { useEffect } from "react";
import { authenticationComplete } from "../authentication/dispatch";
import { useAuthentication } from "../authentication/hook";
import { updateCredentials } from "../credentials/dispatch";
import { useCredentials } from "../credentials/hook";
import { TerraProfileContext } from "./context";
import { useFetchProfiles } from "./hooks/useFetchProfiles";
import { TerraProfileProviderProps } from "./types";

export function TerraProfileProvider({
  children,
  token,
}: TerraProfileProviderProps): JSX.Element {
  const { authenticationDispatch } = useAuthentication();
  const { credentialsDispatch } = useCredentials();
  const {
    isComplete,
    isProfileActive,
    terraNIHProfileLoginStatus,
    terraProfileLoginStatus,
    terraTOSLoginStatus,
  } = useFetchProfiles(token);

  useEffect(() => {
    if (!isComplete) return;
    authenticationDispatch?.(authenticationComplete());
    if (!isProfileActive) return;
    credentialsDispatch?.(updateCredentials(token));
  }, [
    authenticationDispatch,
    credentialsDispatch,
    isComplete,
    isProfileActive,
    token,
  ]);

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
