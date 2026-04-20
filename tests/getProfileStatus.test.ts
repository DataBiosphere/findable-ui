import {
  LoginStatus,
  REQUEST_STATUS,
  TERRA_PROFILE_STATUS,
} from "../src/terra/types/common";
import { TerraNIHResponse } from "../src/terra/types/terra-nih";
import { TerraResponse } from "../src/terra/types/terra-profile";
import { TerraTermsOfServiceResponse } from "../src/terra/types/terra-tos";
import { getProfileStatus } from "../src/terra/utils";

const LOGIN_STATUS_NIH_COMPLETED: LoginStatus<TerraNIHResponse> = {
  isSuccess: true,
  isSupported: true,
  requestStatus: REQUEST_STATUS.COMPLETED,
  response: undefined,
};

const LOGIN_STATUS_TERRA_COMPLETED: LoginStatus<TerraResponse> = {
  isSuccess: true,
  isSupported: true,
  requestStatus: REQUEST_STATUS.COMPLETED,
  response: undefined,
};

const LOGIN_STATUS_TOS_COMPLETED: LoginStatus<TerraTermsOfServiceResponse> = {
  isSuccess: true,
  isSupported: true,
  requestStatus: REQUEST_STATUS.COMPLETED,
  response: undefined,
};

const LOGIN_STATUS_TOS_COMPLETED_UNSUCCESSFUL: LoginStatus<TerraTermsOfServiceResponse> =
  {
    isSuccess: false,
    isSupported: true,
    requestStatus: REQUEST_STATUS.COMPLETED,
    response: undefined,
  };

const LOGIN_STATUS_NIH_NOT_STARTED: LoginStatus<TerraNIHResponse> = {
  isSuccess: false,
  isSupported: true,
  requestStatus: REQUEST_STATUS.NOT_STARTED,
  response: undefined,
};

const LOGIN_STATUS_TERRA_NOT_STARTED: LoginStatus<TerraResponse> = {
  isSuccess: false,
  isSupported: true,
  requestStatus: REQUEST_STATUS.NOT_STARTED,
  response: undefined,
};

const LOGIN_STATUS_TOS_NOT_STARTED: LoginStatus<TerraTermsOfServiceResponse> = {
  isSuccess: false,
  isSupported: true,
  requestStatus: REQUEST_STATUS.NOT_STARTED,
  response: undefined,
};

const LOGIN_STATUS_NIH_PENDING: LoginStatus<TerraNIHResponse> = {
  isSuccess: false,
  isSupported: true,
  requestStatus: REQUEST_STATUS.PENDING,
  response: undefined,
};

const LOGIN_STATUS_TERRA_PENDING: LoginStatus<TerraResponse> = {
  isSuccess: false,
  isSupported: true,
  requestStatus: REQUEST_STATUS.PENDING,
  response: undefined,
};

const LOGIN_STATUS_TOS_PENDING: LoginStatus<TerraTermsOfServiceResponse> = {
  isSuccess: false,
  isSupported: true,
  requestStatus: REQUEST_STATUS.PENDING,
  response: undefined,
};

const LOGIN_STATUS_NIH_UNSUPPORTED: LoginStatus<TerraNIHResponse> = {
  isSuccess: false,
  isSupported: false,
  requestStatus: REQUEST_STATUS.NOT_STARTED,
  response: undefined,
};

const LOGIN_STATUS_TERRA_UNSUPPORTED: LoginStatus<TerraResponse> = {
  isSuccess: false,
  isSupported: false,
  requestStatus: REQUEST_STATUS.NOT_STARTED,
  response: undefined,
};

const LOGIN_STATUS_TOS_UNSUPPORTED: LoginStatus<TerraTermsOfServiceResponse> = {
  isSuccess: false,
  isSupported: false,
  requestStatus: REQUEST_STATUS.NOT_STARTED,
  response: undefined,
};

describe("getProfileStatus", () => {
  test("not authenticated, services not started", () => {
    expect(
      getProfileStatus(
        false,
        LOGIN_STATUS_NIH_NOT_STARTED,
        LOGIN_STATUS_TERRA_NOT_STARTED,
        LOGIN_STATUS_TOS_NOT_STARTED,
      ),
    ).toBe(TERRA_PROFILE_STATUS.PENDING);
  });

  test("not authenticated, services unsupported", () => {
    expect(
      getProfileStatus(
        false,
        LOGIN_STATUS_NIH_UNSUPPORTED,
        LOGIN_STATUS_TERRA_UNSUPPORTED,
        LOGIN_STATUS_TOS_UNSUPPORTED,
      ),
    ).toBe(TERRA_PROFILE_STATUS.PENDING);
  });

  test("not authenticated, services completed", () => {
    expect(
      getProfileStatus(
        false,
        LOGIN_STATUS_NIH_COMPLETED,
        LOGIN_STATUS_TERRA_COMPLETED,
        LOGIN_STATUS_TOS_COMPLETED,
      ),
    ).toBe(TERRA_PROFILE_STATUS.PENDING);
  });

  test("authenticated, services not started", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_NOT_STARTED,
        LOGIN_STATUS_TERRA_NOT_STARTED,
        LOGIN_STATUS_TOS_NOT_STARTED,
      ),
    ).toBe(TERRA_PROFILE_STATUS.PENDING);
  });

  test("authenticated, services pending", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_PENDING,
        LOGIN_STATUS_TERRA_PENDING,
        LOGIN_STATUS_TOS_PENDING,
      ),
    ).toBe(TERRA_PROFILE_STATUS.PENDING);
  });

  test("authenticated, nih pending, other services completed", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_PENDING,
        LOGIN_STATUS_TERRA_COMPLETED,
        LOGIN_STATUS_TOS_COMPLETED,
      ),
    ).toBe(TERRA_PROFILE_STATUS.PENDING);
  });

  test("authenticated, terra pending, other services completed", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_COMPLETED,
        LOGIN_STATUS_TERRA_PENDING,
        LOGIN_STATUS_TOS_COMPLETED,
      ),
    ).toBe(TERRA_PROFILE_STATUS.PENDING);
  });

  test("authenticated, tos pending, other services completed", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_COMPLETED,
        LOGIN_STATUS_TERRA_COMPLETED,
        LOGIN_STATUS_TOS_PENDING,
      ),
    ).toBe(TERRA_PROFILE_STATUS.PENDING);
  });

  test("authenticated, nih completed, terra pending, tos not started", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_COMPLETED,
        LOGIN_STATUS_TERRA_PENDING,
        LOGIN_STATUS_TOS_NOT_STARTED,
      ),
    ).toBe(TERRA_PROFILE_STATUS.PENDING);
  });

  test("authenticated, nih not started, terra completed, tos pending", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_NOT_STARTED,
        LOGIN_STATUS_TERRA_COMPLETED,
        LOGIN_STATUS_TOS_PENDING,
      ),
    ).toBe(TERRA_PROFILE_STATUS.PENDING);
  });

  test("authenticated, nih pending, terra not started, tos completed", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_PENDING,
        LOGIN_STATUS_TERRA_NOT_STARTED,
        LOGIN_STATUS_TOS_COMPLETED,
      ),
    ).toBe(TERRA_PROFILE_STATUS.PENDING);
  });

  test("authenticated, services unsupported", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_UNSUPPORTED,
        LOGIN_STATUS_TERRA_UNSUPPORTED,
        LOGIN_STATUS_TOS_UNSUPPORTED,
      ),
    ).toBe(TERRA_PROFILE_STATUS.AUTHENTICATED);
  });

  test("authenticated, services completed, tos unsuccessful", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_COMPLETED,
        LOGIN_STATUS_TERRA_COMPLETED,
        LOGIN_STATUS_TOS_COMPLETED_UNSUCCESSFUL,
      ),
    ).toBe(TERRA_PROFILE_STATUS.UNAUTHENTICATED);
  });

  test("authenticated, nih unsupported, terra completed, tos completed unsuccessfully", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_UNSUPPORTED,
        LOGIN_STATUS_TERRA_COMPLETED,
        LOGIN_STATUS_TOS_COMPLETED_UNSUCCESSFUL,
      ),
    ).toBe(TERRA_PROFILE_STATUS.UNAUTHENTICATED);
  });

  test("authenticated, nih unsupported, other services completed", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_UNSUPPORTED,
        LOGIN_STATUS_TERRA_COMPLETED,
        LOGIN_STATUS_TOS_COMPLETED,
      ),
    ).toBe(TERRA_PROFILE_STATUS.AUTHENTICATED);
  });

  test("authenticated, terra completed, other services unsupported", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_UNSUPPORTED,
        LOGIN_STATUS_TERRA_COMPLETED,
        LOGIN_STATUS_TOS_UNSUPPORTED,
      ),
    ).toBe(TERRA_PROFILE_STATUS.UNAUTHENTICATED);
  });

  test("authenticated, services completed", () => {
    expect(
      getProfileStatus(
        true,
        LOGIN_STATUS_NIH_COMPLETED,
        LOGIN_STATUS_TERRA_COMPLETED,
        LOGIN_STATUS_TOS_COMPLETED,
      ),
    ).toBe(TERRA_PROFILE_STATUS.AUTHENTICATED);
  });
});
