import { jest } from "@jest/globals";
import { LOGIN_STATUS_NOT_STARTED } from "../src/hooks/useAuthentication/common/constants";
import {
  LoginStatus,
  REQUEST_STATUS,
} from "../src/hooks/useAuthentication/common/entities";
import { GoogleResponse } from "../src/hooks/useAuthentication/useFetchGoogleProfile";
import { TerraResponse } from "../src/hooks/useAuthentication/useFetchTerraProfile";
import { TerraTermsOfServiceResponse } from "../src/hooks/useAuthentication/useFetchTerraTermsOfService";

jest.unstable_mockModule("react-idle-timer", () => ({
  useIdleTimer: jest.fn(),
}));

const { shouldReleaseToken } = await import("../src/providers/authentication");

describe("authentication", () => {
  // Boolean constants.
  const IS_NOT_SUCCESS = false;
  const IS_NOT_SUPPORTED = false;
  const IS_SUCCESS = true;
  const IS_SUPPORTED = true;
  // Response objects.
  const GOOGLE_RESPONSE = {} as GoogleResponse;
  const TERRA_RESPONSE = {} as TerraResponse;
  const TERRA_TOS_RESPONSE = {} as TerraTermsOfServiceResponse;
  // Login statuses - not started, not supported.
  const LOGIN_STATUS_NOT_STARTED_NOT_SUPPORTED_TERRA: LoginStatus<TerraResponse> =
    {
      isSuccess: IS_NOT_SUCCESS,
      isSupported: IS_NOT_SUPPORTED,
      requestStatus: REQUEST_STATUS.NOT_STARTED,
      response: TERRA_RESPONSE,
    };
  const LOGIN_STATUS_NOT_STARTED_NOT_SUPPORTED_TERRA_TOS: LoginStatus<TerraTermsOfServiceResponse> =
    {
      isSuccess: IS_NOT_SUCCESS,
      isSupported: IS_NOT_SUPPORTED,
      requestStatus: REQUEST_STATUS.NOT_STARTED,
      response: TERRA_TOS_RESPONSE,
    };
  // Login statuses - not started, supported.
  const LOGIN_STATUS_NOT_STARTED_SUPPORTED_TERRA =
    LOGIN_STATUS_NOT_STARTED as LoginStatus<TerraResponse>;
  const LOGIN_STATUS_NOT_STARTED_SUPPORTED_TERRA_TOS =
    LOGIN_STATUS_NOT_STARTED as LoginStatus<TerraTermsOfServiceResponse>;
  const LOGIN_STATUS_NOT_STARTED_SUPPORTED_USER_PROFILE =
    LOGIN_STATUS_NOT_STARTED as LoginStatus<GoogleResponse>;
  // Login statuses - completed, not successful.
  const LOGIN_STATUS_COMPLETED_NOT_SUCCESS_TERRA_TOS: LoginStatus<TerraTermsOfServiceResponse> =
    {
      isSuccess: IS_NOT_SUCCESS,
      isSupported: IS_SUPPORTED,
      requestStatus: REQUEST_STATUS.COMPLETED,
      response: TERRA_TOS_RESPONSE,
    };
  const LOGIN_STATUS_COMPLETED_NOT_SUCCESS_USER_PROFILE: LoginStatus<GoogleResponse> =
    {
      isSuccess: IS_NOT_SUCCESS,
      isSupported: IS_SUPPORTED,
      requestStatus: REQUEST_STATUS.COMPLETED,
      response: GOOGLE_RESPONSE,
    };
  // Login statuses - completed, successful.
  const LOGIN_STATUS_COMPLETED_SUCCESS_TERRA: LoginStatus<TerraResponse> = {
    isSuccess: IS_SUCCESS,
    isSupported: IS_SUPPORTED,
    requestStatus: REQUEST_STATUS.COMPLETED,
    response: TERRA_RESPONSE,
  };
  const LOGIN_STATUS_COMPLETED_SUCCESS_TERRA_TOS: LoginStatus<TerraTermsOfServiceResponse> =
    {
      isSuccess: IS_SUCCESS,
      isSupported: IS_SUPPORTED,
      requestStatus: REQUEST_STATUS.COMPLETED,
      response: TERRA_TOS_RESPONSE,
    };
  const LOGIN_STATUS_COMPLETED_SUCCESS_USER_PROFILE: LoginStatus<GoogleResponse> =
    {
      isSuccess: IS_SUCCESS,
      isSupported: IS_SUPPORTED,
      requestStatus: REQUEST_STATUS.COMPLETED,
      response: GOOGLE_RESPONSE,
    };

  describe("Should Release Token", () => {
    describe("shouldReleaseToken", () => {
      describe("Terra endpoint is configured", () => {
        test("login not started", () => {
          const releaseToken = shouldReleaseToken(
            LOGIN_STATUS_NOT_STARTED_SUPPORTED_USER_PROFILE,
            LOGIN_STATUS_NOT_STARTED_SUPPORTED_TERRA,
            LOGIN_STATUS_NOT_STARTED_SUPPORTED_TERRA_TOS
          );
          expect(releaseToken).toBeFalsy();
        });
        test("login completed and Terra terms of service is not successful", () => {
          const releaseToken = shouldReleaseToken(
            LOGIN_STATUS_COMPLETED_SUCCESS_USER_PROFILE,
            LOGIN_STATUS_COMPLETED_SUCCESS_TERRA,
            LOGIN_STATUS_COMPLETED_NOT_SUCCESS_TERRA_TOS
          );
          expect(releaseToken).toBeFalsy();
        });
        test("login completed and Terra terms of service is successful", () => {
          const releaseToken = shouldReleaseToken(
            LOGIN_STATUS_COMPLETED_SUCCESS_USER_PROFILE,
            LOGIN_STATUS_COMPLETED_SUCCESS_TERRA,
            LOGIN_STATUS_COMPLETED_SUCCESS_TERRA_TOS
          );
          expect(releaseToken).toBeTruthy();
        });
      });
      describe("Terra endpoint is not configured", () => {
        test("login not started", () => {
          const releaseToken = shouldReleaseToken(
            LOGIN_STATUS_NOT_STARTED_SUPPORTED_USER_PROFILE,
            LOGIN_STATUS_NOT_STARTED_NOT_SUPPORTED_TERRA,
            LOGIN_STATUS_NOT_STARTED_NOT_SUPPORTED_TERRA_TOS
          );
          expect(releaseToken).toBeFalsy();
        });
        test("user profile is not successful", () => {
          const releaseToken = shouldReleaseToken(
            LOGIN_STATUS_COMPLETED_NOT_SUCCESS_USER_PROFILE,
            LOGIN_STATUS_NOT_STARTED_NOT_SUPPORTED_TERRA,
            LOGIN_STATUS_NOT_STARTED_NOT_SUPPORTED_TERRA_TOS
          );
          expect(releaseToken).toBeFalsy();
        });
        test("user profile is successful", () => {
          const releaseToken = shouldReleaseToken(
            LOGIN_STATUS_COMPLETED_SUCCESS_USER_PROFILE,
            LOGIN_STATUS_NOT_STARTED_NOT_SUPPORTED_TERRA,
            LOGIN_STATUS_NOT_STARTED_NOT_SUPPORTED_TERRA_TOS
          );
          expect(releaseToken).toBeTruthy();
        });
      });
    });
  });
});
