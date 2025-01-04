import { Dispatch } from "react";
import { AuthAction, AuthContextProps } from "../../authentication/auth/types";
import {
  AuthenticationAction,
  AuthenticationContextProps,
} from "../../authentication/authentication/types";
import {
  CredentialsAction,
  CredentialsContextProps,
} from "../../authentication/credentials/types";
import {
  TokenAction,
  TokenContextProps,
} from "../../authentication/token/types";

export interface SessionReducer {
  authenticationReducer: AuthenticationContextProps;
  authReducer: Omit<AuthContextProps, "service">;
  credentialsReducer: CredentialsContextProps;
  tokenReducer: TokenContextProps;
}

export interface SessionDispatch {
  authDispatch: Dispatch<AuthAction> | null;
  authenticationDispatch: Dispatch<AuthenticationAction> | null;
  credentialsDispatch: Dispatch<CredentialsAction> | null;
  tokenDispatch: Dispatch<TokenAction> | null;
}
