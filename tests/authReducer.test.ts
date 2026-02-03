import { authReducer } from "../src/auth/reducers/auth";
import {
  requestAuth,
  resetAuthState,
  updateAuthState,
} from "../src/auth/dispatch/auth";
import { AUTH_STATUS, AuthState } from "../src/auth/types/auth";

const INITIAL_STATE: AuthState = {
  initialState: {
    isAuthenticated: false,
    status: AUTH_STATUS.SETTLED,
  },
  isAuthenticated: false,
  status: AUTH_STATUS.SETTLED,
};

const AUTHENTICATED_STATE: AuthState = {
  initialState: {
    isAuthenticated: false,
    status: AUTH_STATUS.SETTLED,
  },
  isAuthenticated: true,
  status: AUTH_STATUS.SETTLED,
};

describe("authReducer", () => {
  describe("RequestAuth action", () => {
    it("sets status to PENDING", () => {
      const result = authReducer(INITIAL_STATE, requestAuth());
      expect(result.status).toBe(AUTH_STATUS.PENDING);
      expect(result.isAuthenticated).toBe(false);
    });

    it("preserves other state properties", () => {
      const result = authReducer(AUTHENTICATED_STATE, requestAuth());
      expect(result.status).toBe(AUTH_STATUS.PENDING);
      expect(result.isAuthenticated).toBe(true);
    });
  });

  describe("ResetState action", () => {
    it("resets to initial state", () => {
      const modifiedState: AuthState = {
        ...INITIAL_STATE,
        isAuthenticated: true,
        status: AUTH_STATUS.PENDING,
      };
      const result = authReducer(modifiedState, resetAuthState());
      expect(result.isAuthenticated).toBe(false);
      expect(result.status).toBe(AUTH_STATUS.SETTLED);
    });
  });

  describe("UpdateAuthState action", () => {
    it("updates isAuthenticated", () => {
      const result = authReducer(
        INITIAL_STATE,
        updateAuthState({ isAuthenticated: true }),
      );
      expect(result.isAuthenticated).toBe(true);
      expect(result.status).toBe(AUTH_STATUS.SETTLED);
    });

    it("updates status", () => {
      const result = authReducer(
        INITIAL_STATE,
        updateAuthState({ status: AUTH_STATUS.PENDING }),
      );
      expect(result.status).toBe(AUTH_STATUS.PENDING);
      expect(result.isAuthenticated).toBe(false);
    });

    it("updates multiple properties", () => {
      const result = authReducer(
        INITIAL_STATE,
        updateAuthState({ isAuthenticated: true, status: AUTH_STATUS.PENDING }),
      );
      expect(result.isAuthenticated).toBe(true);
      expect(result.status).toBe(AUTH_STATUS.PENDING);
    });
  });
});
