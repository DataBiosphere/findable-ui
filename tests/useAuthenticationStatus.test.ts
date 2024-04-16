import {
  LOGIN_STATUS_NOT_STARTED,
  LOGIN_STATUS_NOT_SUPPORTED,
} from "../src/hooks/useAuthentication/common/constants";
import {
  AUTHENTICATION_STATUS,
  LoginResponse,
  LoginStatus,
  REQUEST_STATUS,
} from "../src/hooks/useAuthentication/common/entities";
import { getAuthenticationStatus } from "../src/hooks/useAuthentication/useAuthenticationStatus";

const TEST_LOGIN_IS_COMPLETE = "login is complete";
const TEST_LOGIN_NOT_STARTED = "login not started";
const TEST_USER_PROFILE_AND_TERRA_AND_TOS_IS_COMPLETE =
  "user profile, terra and terms of service is complete";
const TEST_USER_PROFILE_AND_TERRA_IS_COMPLETE =
  "user profile and terra is complete";
const TEST_USER_PROFILE_IS_COMPLETE = "user profile is complete";

describe("useAuthenticationStatus", () => {
  // Login statuses - completed, successful.
  const LOGIN_STATUS_COMPLETED_SUCCESS: LoginStatus<LoginResponse> = {
    isSuccess: true,
    isSupported: true,
    requestStatus: REQUEST_STATUS.COMPLETED,
    response: {} as LoginResponse,
  };

  describe("Calculate Authentication Status", () => {
    describe("getAuthenticationStatus", () => {
      describe("endpoints are configured", () => {
        test(TEST_LOGIN_NOT_STARTED, () => {
          const authenticationStatus = getAuthenticationStatus([
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_NOT_STARTED,
          ]);
          expect(authenticationStatus).toEqual(
            AUTHENTICATION_STATUS.INCOMPLETE
          );
        });
        test(TEST_USER_PROFILE_IS_COMPLETE, () => {
          const authenticationStatus = getAuthenticationStatus([
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_COMPLETED_SUCCESS,
          ]);
          expect(authenticationStatus).toEqual(
            AUTHENTICATION_STATUS.INCOMPLETE
          );
        });
        test(TEST_USER_PROFILE_AND_TERRA_IS_COMPLETE, () => {
          const authenticationStatus = getAuthenticationStatus([
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_COMPLETED_SUCCESS,
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_COMPLETED_SUCCESS,
          ]);
          expect(authenticationStatus).toEqual(
            AUTHENTICATION_STATUS.INCOMPLETE
          );
        });
        test(TEST_USER_PROFILE_AND_TERRA_AND_TOS_IS_COMPLETE, () => {
          const authenticationStatus = getAuthenticationStatus([
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_COMPLETED_SUCCESS,
            LOGIN_STATUS_COMPLETED_SUCCESS,
            LOGIN_STATUS_COMPLETED_SUCCESS,
          ]);
          expect(authenticationStatus).toEqual(
            AUTHENTICATION_STATUS.INCOMPLETE
          );
        });
        test(TEST_LOGIN_IS_COMPLETE, () => {
          const authenticationStatus = getAuthenticationStatus([
            LOGIN_STATUS_COMPLETED_SUCCESS,
            LOGIN_STATUS_COMPLETED_SUCCESS,
            LOGIN_STATUS_COMPLETED_SUCCESS,
            LOGIN_STATUS_COMPLETED_SUCCESS,
          ]);
          expect(authenticationStatus).toEqual(AUTHENTICATION_STATUS.COMPLETED);
        });
      });
      describe("NIH endpoint is not configured", () => {
        test(TEST_LOGIN_NOT_STARTED, () => {
          const authenticationStatus = getAuthenticationStatus([
            LOGIN_STATUS_NOT_SUPPORTED,
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_NOT_STARTED,
          ]);
          expect(authenticationStatus).toEqual(
            AUTHENTICATION_STATUS.INCOMPLETE
          );
        });
        test(TEST_USER_PROFILE_IS_COMPLETE, () => {
          const authenticationStatus = getAuthenticationStatus([
            LOGIN_STATUS_NOT_SUPPORTED,
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_COMPLETED_SUCCESS,
          ]);
          expect(authenticationStatus).toEqual(
            AUTHENTICATION_STATUS.INCOMPLETE
          );
        });
        test(TEST_USER_PROFILE_AND_TERRA_IS_COMPLETE, () => {
          const authenticationStatus = getAuthenticationStatus([
            LOGIN_STATUS_NOT_SUPPORTED,
            LOGIN_STATUS_COMPLETED_SUCCESS,
            LOGIN_STATUS_NOT_STARTED,
            LOGIN_STATUS_COMPLETED_SUCCESS,
          ]);
          expect(authenticationStatus).toEqual(
            AUTHENTICATION_STATUS.INCOMPLETE
          );
        });
        test(TEST_LOGIN_IS_COMPLETE, () => {
          const authenticationStatus = getAuthenticationStatus([
            LOGIN_STATUS_NOT_SUPPORTED,
            LOGIN_STATUS_COMPLETED_SUCCESS,
            LOGIN_STATUS_COMPLETED_SUCCESS,
            LOGIN_STATUS_COMPLETED_SUCCESS,
          ]);
          expect(authenticationStatus).toEqual(AUTHENTICATION_STATUS.COMPLETED);
        });
      });
      describe("Terra endpoint is not configured", () => {
        test(TEST_LOGIN_NOT_STARTED, () => {
          const authenticationStatus = getAuthenticationStatus([
            LOGIN_STATUS_NOT_SUPPORTED,
            LOGIN_STATUS_NOT_SUPPORTED,
            LOGIN_STATUS_NOT_SUPPORTED,
            LOGIN_STATUS_NOT_STARTED,
          ]);
          expect(authenticationStatus).toEqual(
            AUTHENTICATION_STATUS.INCOMPLETE
          );
        });
        test(TEST_LOGIN_IS_COMPLETE, () => {
          const authenticationStatus = getAuthenticationStatus([
            LOGIN_STATUS_NOT_SUPPORTED,
            LOGIN_STATUS_NOT_SUPPORTED,
            LOGIN_STATUS_NOT_SUPPORTED,
            LOGIN_STATUS_COMPLETED_SUCCESS,
          ]);
          expect(authenticationStatus).toEqual(AUTHENTICATION_STATUS.COMPLETED);
        });
      });
    });
  });
});
