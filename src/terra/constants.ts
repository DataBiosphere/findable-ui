import { LoginStatus, REQUEST_STATUS } from "./types/common";
import { TerraNIHResponse } from "./types/terra-nih";
import { TerraResponse } from "./types/terra-profile";
import { TerraTermsOfServiceResponse } from "./types/terra-tos";

/**
 * Login response type - union of all Terra response types.
 */
export type LoginResponse =
  | TerraResponse
  | TerraNIHResponse
  | TerraTermsOfServiceResponse;

/**
 * Login status: failed.
 */
export const LOGIN_STATUS_FAILED: LoginStatus<LoginResponse> = {
  isSuccess: false,
  isSupported: true,
  requestStatus: REQUEST_STATUS.FAILED,
  response: undefined,
};

/**
 * Login status: not started.
 */
export const LOGIN_STATUS_NOT_STARTED: LoginStatus<LoginResponse> = {
  isSuccess: false,
  isSupported: true,
  requestStatus: REQUEST_STATUS.NOT_STARTED,
  response: undefined,
};

/**
 * Login status: not supported.
 */
export const LOGIN_STATUS_NOT_SUPPORTED: LoginStatus<LoginResponse> = {
  isSuccess: false,
  isSupported: false,
  requestStatus: REQUEST_STATUS.NOT_STARTED,
  response: undefined,
};

/**
 * Login status: pending.
 */
export const LOGIN_STATUS_PENDING: LoginStatus<LoginResponse> = {
  isSuccess: false,
  isSupported: true,
  requestStatus: REQUEST_STATUS.PENDING,
  response: undefined,
};

/**
 * Terra service ID.
 */
export const TERRA_SERVICE_ID = "terra";
