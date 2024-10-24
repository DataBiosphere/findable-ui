import { Dispatch } from "react";
import {
  AuthenticationAction,
  AuthenticationContextProps,
} from "../../authentication/types";
import {
  AuthorizationAction,
  AuthorizationContextProps,
} from "../../authorization/types";
import {
  CredentialsAction,
  CredentialsContextProps,
} from "../../credentials/types";
import { TokenAction, TokenContextProps } from "../../token/types";

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
