import { Dispatch } from "react";
import {
  AuthenticationAction,
  AuthenticationContextProps,
} from "../../authentication/authentication/types";
import {
  AuthorizationAction,
  AuthorizationContextProps,
} from "../../authentication/authorization/types";
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
  authorizationReducer: AuthorizationContextProps;
  credentialsReducer: CredentialsContextProps;
  tokenReducer: TokenContextProps;
}

export interface SessionDispatch {
  authenticationDispatch: Dispatch<AuthenticationAction> | null;
  authorizationDispatch: Dispatch<AuthorizationAction> | null;
  credentialsDispatch: Dispatch<CredentialsAction> | null;
  tokenDispatch: Dispatch<TokenAction> | null;
}
