import Router, { useRouter } from "next/router";
import React, { createContext, ReactNode, useCallback } from "react";
import { useIdleTimer } from "react-idle-timer";
import { LOGIN_STATUS_NOT_STARTED } from "../hooks/useAuthentication/common/constants";
import {
  AUTHENTICATION_STATUS,
  LoginStatus,
} from "../hooks/useAuthentication/common/entities";
import { useAuthenticationComplete } from "../hooks/useAuthentication/useAuthenticationComplete";
import { useAuthenticationStatus } from "../hooks/useAuthentication/useAuthenticationStatus";
import {
  useFetchGoogleProfile,
  UserProfile,
} from "../hooks/useAuthentication/useFetchGoogleProfile";
import {
  TerraNIHResponse,
  useFetchTerraNIHProfile,
} from "../hooks/useAuthentication/useFetchTerraNIHProfile";
import {
  TerraResponse,
  useFetchTerraProfile,
} from "../hooks/useAuthentication/useFetchTerraProfile";
import {
  TerraTermsOfServiceResponse,
  useFetchTerraTermsOfService,
} from "../hooks/useAuthentication/useFetchTerraTermsOfService";
import { useTokenClient } from "../hooks/useAuthentication/useTokenClient";
import { useConfig } from "../hooks/useConfig";
import { INACTIVITY_PARAM } from "../hooks/useSessionTimeout";

// Template constants
export const ROUTE_LOGIN = "/login";

type AuthenticateUserFn = () => void;
type RequestAuthenticationFn = () => void;

/**
 * Model of authentication context.
 */
export interface AuthContextProps {
  authenticateUser: AuthenticateUserFn;
  authenticationStatus: AUTHENTICATION_STATUS;
  isAuthenticated: boolean;
  isEnabled: boolean;
  requestAuthentication: RequestAuthenticationFn;
  terraNIHProfileLoginStatus: LoginStatus<TerraNIHResponse>;
  terraProfileLoginStatus: LoginStatus<TerraResponse>;
  terraTOSLoginStatus: LoginStatus<TerraTermsOfServiceResponse>;
  token?: string;
  userProfile?: UserProfile;
}

/**
 * Auth context for storing and using auth-related state.
 */
export const AuthContext = createContext<AuthContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  authenticateUser: () => {},
  authenticationStatus: AUTHENTICATION_STATUS.INCOMPLETE,
  isAuthenticated: false,
  isEnabled: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default state.
  requestAuthentication: () => {},
  terraNIHProfileLoginStatus:
    LOGIN_STATUS_NOT_STARTED as LoginStatus<TerraNIHResponse>,
  terraProfileLoginStatus:
    LOGIN_STATUS_NOT_STARTED as LoginStatus<TerraResponse>,
  terraTOSLoginStatus:
    LOGIN_STATUS_NOT_STARTED as LoginStatus<TerraTermsOfServiceResponse>,
  token: undefined,
  userProfile: undefined,
});

interface Props {
  children: ReactNode | ReactNode[];
  sessionTimeout?: number;
}

/**
 * Auth provider for consuming components to subscribe to changes in auth-related state.
 * @param props - Component inputs.
 * @param props.children - Set of children components that can possibly consume the query provider.
 * @param props.sessionTimeout - If provided, will set the value for a session timeout (in milliseconds).
 * @returns Provider element to be used by consumers to both update authentication state and subscribe to changes in authentication state.
 */
export function AuthProvider({ children, sessionTimeout }: Props): JSX.Element {
  const { config } = useConfig();
  const { authentication, redirectRootToPath } = config;
  const { basePath } = useRouter();
  const { token, tokenClient } = useTokenClient();
  const terraNIHProfileLoginStatus = useFetchTerraNIHProfile(token);
  const terraProfileLoginStatus = useFetchTerraProfile(token);
  const terraTOSLoginStatus = useFetchTerraTermsOfService(token);
  const userProfileLoginStatus = useFetchGoogleProfile(token);
  const isEnabled = Boolean(authentication);
  const isAuthenticated = userProfileLoginStatus.isSuccess;
  const releaseToken = shouldReleaseToken(
    userProfileLoginStatus,
    terraProfileLoginStatus,
    terraTOSLoginStatus
  );
  const authenticationStatus = useAuthenticationStatus(
    userProfileLoginStatus,
    terraProfileLoginStatus,
    terraTOSLoginStatus,
    terraNIHProfileLoginStatus
  );

  // Handle completion of authentication process.
  useAuthenticationComplete(authenticationStatus);

  /**
   * If sessionTimeout is set and user is authenticated, the app will reload and redirect to
   * origin, including base path, root path, and query param.
   */
  useIdleTimer({
    onIdle: () =>
      isAuthenticated &&
      sessionTimeout &&
      (window.location.href =
        window.location.origin +
        basePath +
        redirectRootToPath +
        "?" +
        `${INACTIVITY_PARAM}=true`),
    timeout: sessionTimeout,
  });

  /**
   * Requests access token and authenticates user.
   */
  const authenticateUser = useCallback((): void => {
    tokenClient.requestAccessToken();
  }, [tokenClient]);

  /**
   * Navigates to login page.
   */
  const requestAuthentication = useCallback((): void => {
    Router.push(ROUTE_LOGIN);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        authenticationStatus,
        isAuthenticated,
        isEnabled,
        requestAuthentication,
        terraNIHProfileLoginStatus,
        terraProfileLoginStatus,
        terraTOSLoginStatus,
        token: releaseToken ? token : undefined,
        userProfile: userProfileLoginStatus.response,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Token is released for the following conditions:
 * - Terra endpoint is configured and the terms of service response is successful, or
 * - Terra endpoint is not configured and the user profile response is successful.
 * @param userProfileLoginStatus - User profile login status.
 * @param terraProfileLoginStatus - Terra profile login status.
 * @param terraTOSLoginStatus - Terra terms of service login status.
 * @returns true if the token should be released.
 */
export function shouldReleaseToken(
  userProfileLoginStatus: LoginStatus<UserProfile>,
  terraProfileLoginStatus: LoginStatus<TerraResponse>,
  terraTOSLoginStatus: LoginStatus<TerraTermsOfServiceResponse>
): boolean {
  if (terraProfileLoginStatus.isSupported) {
    return terraTOSLoginStatus.isSuccess;
  }
  return userProfileLoginStatus.isSuccess;
}
