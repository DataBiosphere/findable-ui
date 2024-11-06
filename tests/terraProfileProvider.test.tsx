import { jest } from "@jest/globals";
import { render } from "@testing-library/react";
import React from "react";
import { DEFAULT_AUTHENTICATION_STATE } from "../src/providers/authentication/authentication/constants";
import { authenticationComplete } from "../src/providers/authentication/authentication/dispatch";
import { DEFAULT_CREDENTIALS_STATE } from "../src/providers/authentication/credentials/constants";
import { updateCredentials } from "../src/providers/authentication/credentials/dispatch";

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

jest.unstable_mockModule(
  "../src/providers/authentication/authentication/hook",
  () => ({
    useAuthentication: jest.fn(),
  })
);
jest.unstable_mockModule(
  "../src/providers/authentication/credentials/hook",
  () => ({
    useCredentials: jest.fn(),
  })
);
jest.unstable_mockModule(
  "../src/providers/authentication/terra/hooks/useFetchProfiles",
  () => ({
    useFetchProfiles: jest.fn(),
  })
);

const { useAuthentication } = await import(
  "../src/providers/authentication/authentication/hook"
);
const { useCredentials } = await import(
  "../src/providers/authentication/credentials/hook"
);
const { useFetchProfiles } = await import(
  "../src/providers/authentication/terra/hooks/useFetchProfiles"
);
const { TerraProfileProvider } = await import(
  "../src/providers/authentication/terra/provider"
);

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
  const mockAuthenticationDispatch = jest.fn();
  const mockCredentialsDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    MOCK_USE_AUTHENTICATION.mockReturnValue({
      authenticationDispatch: mockAuthenticationDispatch,
      authenticationState: DEFAULT_AUTHENTICATION_STATE,
    });
    MOCK_USE_CREDENTIALS.mockReturnValue({
      credentialsDispatch: mockCredentialsDispatch,
      credentialsState: DEFAULT_CREDENTIALS_STATE,
    });
    MOCK_USE_FETCH_PROFILES.mockReturnValue(PROFILE_PENDING);
  });

  it("does not dispatch actions when terra profile is incomplete", () => {
    render(
      <TerraProfileProvider token={TOKEN}>
        <div>Child Component</div>
      </TerraProfileProvider>
    );
    expect(mockAuthenticationDispatch).not.toHaveBeenCalled();
    expect(mockCredentialsDispatch).not.toHaveBeenCalled();
  });

  it("calls authenticationComplete dispatch when terra profile is SETTLED and INACTIVE", () => {
    MOCK_USE_FETCH_PROFILES.mockReturnValue(PROFILE_SETTLED_INACTIVE);
    render(
      <TerraProfileProvider token={TOKEN}>
        <div>Child Component</div>
      </TerraProfileProvider>
    );
    expect(mockAuthenticationDispatch).toHaveBeenCalledWith(
      authenticationComplete()
    );
    expect(mockCredentialsDispatch).not.toHaveBeenCalled();
  });

  it("dispatches authenticationComplete and updateCredentials when terra profile is SETTLED and ACTIVE", () => {
    MOCK_USE_FETCH_PROFILES.mockReturnValue(PROFILE_SETTLED_ACTIVE);
    render(
      <TerraProfileProvider token={TOKEN}>
        <div>Child Component</div>
      </TerraProfileProvider>
    );
    expect(mockAuthenticationDispatch).toHaveBeenCalledWith(
      authenticationComplete()
    );
    expect(mockCredentialsDispatch).toHaveBeenCalledWith(
      updateCredentials(TOKEN)
    );
  });
});
