import { jest } from "@jest/globals";
import { render } from "@testing-library/react";
import { DEFAULT_AUTHENTICATION_STATE } from "../src/auth/constants/authentication";
import { DEFAULT_CREDENTIALS_STATE } from "../src/auth/constants/credentials";
import { authenticationComplete } from "../src/auth/dispatch/authentication";
import { updateCredentials } from "../src/auth/dispatch/credentials";
import { AUTH_STATUS } from "../src/auth/types/auth";

const TOKEN = "test-token";

const PROFILE_PENDING = {
  isComplete: false,
  isProfileActive: false,
};

const PROFILE_SETTLED_ACTIVE = {
  isComplete: true,
  isProfileActive: true,
};

const PROFILE_SETTLED_INACTIVE = {
  isComplete: true,
  isProfileActive: false,
};

jest.unstable_mockModule("../src/auth/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));
jest.unstable_mockModule("../src/auth/hooks/useAuthentication", () => ({
  useAuthentication: jest.fn(),
}));
jest.unstable_mockModule("../src/auth/hooks/useCredentials", () => ({
  useCredentials: jest.fn(),
}));
jest.unstable_mockModule("../src/terra/hooks/useFetchProfiles", () => ({
  useFetchProfiles: jest.fn(),
}));

const { useAuth } = await import("../src/auth/hooks/useAuth");
const { useAuthentication } =
  await import("../src/auth/hooks/useAuthentication");
const { useCredentials } = await import("../src/auth/hooks/useCredentials");
const { useFetchProfiles } =
  await import("../src/terra/hooks/useFetchProfiles");
const { TerraProfileProvider } = await import("../src/terra/provider");

const MOCK_AUTH_DISPATCH = jest.fn();
const MOCK_AUTHENTICATION_DISPATCH = jest.fn();
const MOCK_CREDENTIALS_DISPATCH = jest.fn();
const MOCK_USE_AUTH = useAuth as jest.MockedFunction<typeof useAuth>;
const MOCK_USE_AUTHENTICATION = useAuthentication as jest.MockedFunction<
  typeof useAuthentication
>;
const MOCK_USE_CREDENTIALS = useCredentials as jest.MockedFunction<
  typeof useCredentials
>;
const MOCK_USE_FETCH_PROFILES = useFetchProfiles as jest.MockedFunction<
  () => Partial<ReturnType<typeof useFetchProfiles>>
>;

describe("TerraProfileProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    MOCK_USE_AUTH.mockReturnValue({
      authDispatch: MOCK_AUTH_DISPATCH,
      authState: { isAuthenticated: false, status: AUTH_STATUS.PENDING },
      service: undefined,
    });
    MOCK_USE_AUTHENTICATION.mockReturnValue({
      authenticationDispatch: MOCK_AUTHENTICATION_DISPATCH,
      authenticationState: DEFAULT_AUTHENTICATION_STATE,
    });
    MOCK_USE_CREDENTIALS.mockReturnValue({
      credentialsDispatch: MOCK_CREDENTIALS_DISPATCH,
      credentialsState: DEFAULT_CREDENTIALS_STATE,
    });
    MOCK_USE_FETCH_PROFILES.mockReturnValue(PROFILE_PENDING);
  });

  it("does not dispatch actions when terra profile is incomplete", () => {
    render(
      <TerraProfileProvider token={TOKEN}>
        <div>Child Component</div>
      </TerraProfileProvider>,
    );
    expect(MOCK_AUTHENTICATION_DISPATCH).not.toHaveBeenCalled();
    expect(MOCK_CREDENTIALS_DISPATCH).not.toHaveBeenCalled();
  });

  it("calls authenticationComplete dispatch when terra profile is SETTLED and INACTIVE", () => {
    MOCK_USE_FETCH_PROFILES.mockReturnValue(PROFILE_SETTLED_INACTIVE);
    render(
      <TerraProfileProvider token={TOKEN}>
        <div>Child Component</div>
      </TerraProfileProvider>,
    );
    expect(MOCK_AUTHENTICATION_DISPATCH).toHaveBeenCalledWith(
      authenticationComplete(),
    );
    expect(MOCK_CREDENTIALS_DISPATCH).not.toHaveBeenCalled();
  });

  it("dispatches authenticationComplete and updateCredentials when terra profile is SETTLED and ACTIVE", () => {
    MOCK_USE_FETCH_PROFILES.mockReturnValue(PROFILE_SETTLED_ACTIVE);
    render(
      <TerraProfileProvider token={TOKEN}>
        <div>Child Component</div>
      </TerraProfileProvider>,
    );
    expect(MOCK_AUTHENTICATION_DISPATCH).toHaveBeenCalledWith(
      authenticationComplete(),
    );
    expect(MOCK_CREDENTIALS_DISPATCH).toHaveBeenCalledWith(
      updateCredentials(TOKEN),
    );
  });
});
