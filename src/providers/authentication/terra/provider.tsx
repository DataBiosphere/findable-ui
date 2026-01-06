import { useEffect, JSX } from "react";
import { authComplete } from "../auth/dispatch";
import { useAuth } from "../auth/hook";
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
  const { authDispatch } = useAuth();
  const { authenticationDispatch } = useAuthentication();
  const { credentialsDispatch } = useCredentials();
  const {
    isAuthenticated,
    isComplete,
    isProfileActive,
    terraNIHProfileLoginStatus,
    terraProfileLoginStatus,
    terraTOSLoginStatus,
  } = useFetchProfiles(token);

  useEffect(() => {
    // Dispatch only when terra profile is available:
    // - Login errors are managed by the login service.
    // - Logout operations handle resetting credentials, authentication and auth state.
    if (!isComplete) return; // Terra profile status is still "PENDING".
    // Release authentication only when terra profile status is either "AUTHENTICATED" or "UNAUTHENTICATED" i.e. not "PENDING".
    authenticationDispatch?.(authenticationComplete()); // Authentication `status` is "SETTLED".
    authDispatch?.(authComplete({ isAuthenticated })); // Auth `status` is "SETTLED", and `isAuthenticated` is either "true" or "false".
    if (!isProfileActive) return;
    // Release credentials only when terra profile is "AUTHENTICATED".
    credentialsDispatch?.(updateCredentials(token));
  }, [
    authDispatch,
    authenticationDispatch,
    credentialsDispatch,
    isAuthenticated,
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
