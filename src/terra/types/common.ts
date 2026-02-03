import { ReactNode } from "react";
import { TokenState } from "../../auth/types/token";

/**
 * Terra profile status enum.
 */
export enum TERRA_PROFILE_STATUS {
  AUTHENTICATED = "AUTHENTICATED",
  PENDING = "PENDING",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}

/**
 * Request status enum.
 */
export enum REQUEST_STATUS {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  NOT_STARTED = "NOT_STARTED",
  PENDING = "PENDING",
}

/**
 * Terra profile provider props.
 */
export interface TerraProfileProviderProps {
  children: ReactNode;
  token: TokenState["token"];
}

/**
 * Login response error.
 */
export interface LoginResponseError {
  message: string;
  source: string;
  statusCode: number;
}

/**
 * Login status.
 */
export interface LoginStatus<T> {
  isSuccess: boolean;
  isSupported: boolean;
  requestStatus: REQUEST_STATUS;
  response: T | undefined;
}

/**
 * Auth service configuration.
 */
export interface AuthService {
  endpoint: Record<string, string>;
  id: string;
}
