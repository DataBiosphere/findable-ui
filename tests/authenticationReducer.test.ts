import { authenticationReducer } from "../src/auth/reducers/authentication";
import {
  requestAuthentication,
  resetAuthenticationState,
  updateAuthentication,
} from "../src/auth/dispatch/authentication";
import {
  AUTHENTICATION_STATUS,
  AuthenticationState,
  UserProfile,
} from "../src/auth/types/authentication";

const TEST_PROFILE: UserProfile = {
  email: "test@example.com",
  image: "https://example.com/image.jpg",
  name: "Test User",
};

const INITIAL_STATE: AuthenticationState = {
  initialState: {
    profile: undefined,
    status: AUTHENTICATION_STATUS.SETTLED,
  },
  profile: undefined,
  status: AUTHENTICATION_STATUS.SETTLED,
};

const AUTHENTICATED_STATE: AuthenticationState = {
  initialState: {
    profile: undefined,
    status: AUTHENTICATION_STATUS.SETTLED,
  },
  profile: TEST_PROFILE,
  status: AUTHENTICATION_STATUS.SETTLED,
};

describe("authenticationReducer", () => {
  describe("RequestAuthentication action", () => {
    it("sets status to PENDING", () => {
      const result = authenticationReducer(
        INITIAL_STATE,
        requestAuthentication(),
      );
      expect(result.status).toBe(AUTHENTICATION_STATUS.PENDING);
      expect(result.profile).toBeUndefined();
    });

    it("preserves profile when requesting", () => {
      const result = authenticationReducer(
        AUTHENTICATED_STATE,
        requestAuthentication(),
      );
      expect(result.status).toBe(AUTHENTICATION_STATUS.PENDING);
      expect(result.profile).toEqual(TEST_PROFILE);
    });
  });

  describe("ResetState action", () => {
    it("resets to initial state", () => {
      const modifiedState: AuthenticationState = {
        ...INITIAL_STATE,
        profile: TEST_PROFILE,
        status: AUTHENTICATION_STATUS.PENDING,
      };
      const result = authenticationReducer(
        modifiedState,
        resetAuthenticationState(),
      );
      expect(result.profile).toBeUndefined();
      expect(result.status).toBe(AUTHENTICATION_STATUS.SETTLED);
    });
  });

  describe("UpdateAuthentication action", () => {
    it("updates profile", () => {
      const result = authenticationReducer(
        INITIAL_STATE,
        updateAuthentication({ profile: TEST_PROFILE }),
      );
      expect(result.profile).toEqual(TEST_PROFILE);
      expect(result.status).toBe(AUTHENTICATION_STATUS.SETTLED);
    });

    it("updates status", () => {
      const result = authenticationReducer(
        INITIAL_STATE,
        updateAuthentication({ status: AUTHENTICATION_STATUS.PENDING }),
      );
      expect(result.status).toBe(AUTHENTICATION_STATUS.PENDING);
      expect(result.profile).toBeUndefined();
    });

    it("clears profile when set to undefined", () => {
      const result = authenticationReducer(
        AUTHENTICATED_STATE,
        updateAuthentication({ profile: undefined }),
      );
      expect(result.profile).toBeUndefined();
    });

    it("updates multiple properties", () => {
      const result = authenticationReducer(
        INITIAL_STATE,
        updateAuthentication({
          profile: TEST_PROFILE,
          status: AUTHENTICATION_STATUS.PENDING,
        }),
      );
      expect(result.profile).toEqual(TEST_PROFILE);
      expect(result.status).toBe(AUTHENTICATION_STATUS.PENDING);
    });
  });
});
