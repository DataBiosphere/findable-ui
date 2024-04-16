import { LoginResponse, LoginStatus, REQUEST_STATUS } from "./entities";

export const LOGIN_STATUS_FAILED: LoginStatus<LoginResponse> = {
  isSuccess: false,
  isSupported: true,
  requestStatus: REQUEST_STATUS.FAILED,
  response: undefined,
};

export const LOGIN_STATUS_NOT_STARTED: LoginStatus<LoginResponse> = {
  isSuccess: false,
  isSupported: true,
  requestStatus: REQUEST_STATUS.NOT_STARTED,
  response: undefined,
};

export const LOGIN_STATUS_NOT_SUPPORTED: LoginStatus<LoginResponse> = {
  isSuccess: false,
  isSupported: false,
  requestStatus: REQUEST_STATUS.NOT_STARTED,
  response: undefined,
};
