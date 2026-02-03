import { Dispatch, ElementType, ReactNode } from "react";
import { AuthAction, AuthContextProps } from "../auth/types/auth";
import {
  AuthenticationAction,
  AuthenticationContextProps,
} from "../auth/types/authentication";
import {
  CredentialsAction,
  CredentialsContextProps,
} from "../auth/types/credentials";
import {
  TokenAction,
  TokenContextProps,
  TokenState,
} from "../auth/types/token";

/**
 * Google Sign-In authentication provider props.
 */
export interface GoogleSignInAuthenticationProviderProps {
  children: ReactNode | ReactNode[];
  SessionController?: ElementType;
  timeout?: number;
}

/**
 * Google profile from Google's userinfo endpoint.
 */
export interface GoogleProfile {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  hd: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
}

/**
 * Session controller props.
 */
export interface SessionControllerProps {
  children: ReactNode | ReactNode[];
  token: TokenState["token"];
}

/**
 * Session reducer - all reducers needed for Google Sign-In.
 */
export interface SessionReducer {
  authenticationReducer: AuthenticationContextProps;
  authReducer: Omit<AuthContextProps, "service">;
  credentialsReducer: CredentialsContextProps;
  tokenReducer: TokenContextProps;
}

/**
 * Session dispatch - all dispatch functions needed for Google Sign-In.
 */
export interface SessionDispatch {
  authDispatch: Dispatch<AuthAction> | null;
  authenticationDispatch: Dispatch<AuthenticationAction> | null;
  credentialsDispatch: Dispatch<CredentialsAction> | null;
  tokenDispatch: Dispatch<TokenAction> | null;
}

/**
 * Token set parameters from Google OAuth response.
 */
export interface TokenSetParameters {
  access_token: string;
}
