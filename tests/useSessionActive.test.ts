import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { TransformRouteFn } from "../src/hooks/useRouteHistory";
import {
  AUTH_STATUS,
  AuthState,
} from "../src/providers/authentication/auth/types";

const AUTH_STATE_AUTHENTICATED_SETTLED: AuthState = {
  isAuthenticated: true,
  status: AUTH_STATUS.SETTLED,
};

const AUTH_STATE_PENDING: AuthState = {
  isAuthenticated: false,
  status: AUTH_STATUS.PENDING,
};

const AUTH_STATE_UNAUTHENTICATED_SETTLED: AuthState = {
  isAuthenticated: false,
  status: AUTH_STATUS.SETTLED,
};

const ROOT_PATH = "/";
const ROUTES = ["/login", "/route1", "/route2"];

jest.unstable_mockModule("next/router", () => {
  return {
    ...jest.requireActual<typeof import("next/router")>("next/router"),
    default: {
      push: jest.fn(),
    },
  };
});
jest.unstable_mockModule("../src/hooks/useRouteHistory", () => ({
  useRouteHistory: jest.fn(),
}));

const Router = (await import("next/router")).default;
const { useRouteHistory } = await import("../src/hooks/useRouteHistory");
const { useSessionActive } = await import(
  "../src/hooks/authentication/session/useSessionActive"
);

const MOCK_USE_ROUTE_HISTORY = useRouteHistory as jest.MockedFunction<
  typeof useRouteHistory
>;

describe("useSessionActive", () => {
  beforeEach(() => {
    MOCK_USE_ROUTE_HISTORY.mockReset();
    MOCK_USE_ROUTE_HISTORY.mockReturnValue({
      callbackUrl: jest.fn(
        (transformFn?: TransformRouteFn | undefined) =>
          transformFn?.(ROUTES) ?? ROOT_PATH
      ),
    });
  });

  test("does not redirect if auth status is PENDING", () => {
    renderHook(() => useSessionActive(AUTH_STATE_PENDING));
    expect(Router.push).not.toHaveBeenCalled();
  });

  test("redirects if auth status is SETTLED", () => {
    renderHook(() => useSessionActive(AUTH_STATE_UNAUTHENTICATED_SETTLED));
    expect(Router.push).toHaveBeenCalled();
  });

  test("redirects to callback URL if auth status is SETTLED", () => {
    renderHook(() => useSessionActive(AUTH_STATE_AUTHENTICATED_SETTLED));
    expect(Router.push).toHaveBeenCalledWith(ROUTES[1]);
  });
});
