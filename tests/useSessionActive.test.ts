import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { AUTH_STATUS, AuthState } from "../src/auth/types/auth";
import {
  AUTHENTICATION_STATUS,
  AuthenticationState,
} from "../src/auth/types/authentication";
import { TransformRouteFn } from "../src/hooks/useRouteHistory";

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

const AUTHENTICATION_STATE_PENDING: AuthenticationState = {
  profile: undefined,
  status: AUTHENTICATION_STATUS.PENDING,
};

const AUTHENTICATION_STATE_SETTLED: AuthenticationState = {
  profile: { email: "", name: "" },
  status: AUTHENTICATION_STATUS.SETTLED,
};

const ROOT_PATH = "/";
const ROUTES = ["/login", "/route1", "/route2"];

let mockRouterQuery: Record<string, string | string[] | undefined> = {};

jest.unstable_mockModule("next/router", () => {
  return {
    ...jest.requireActual<typeof import("next/router")>("next/router"),
    default: {
      push: jest.fn(),
    },
    useRouter: jest.fn(() => ({ query: mockRouterQuery })),
  };
});
jest.unstable_mockModule("../src/hooks/useRouteHistory", () => ({
  useRouteHistory: jest.fn(),
}));

const Router = (await import("next/router")).default;
const { useRouteHistory } = await import("../src/hooks/useRouteHistory");
const { useSessionActive } =
  await import("../src/hooks/authentication/session/useSessionActive");

const MOCK_USE_ROUTE_HISTORY = useRouteHistory as jest.MockedFunction<
  typeof useRouteHistory
>;

describe("useSessionActive", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRouterQuery = {};
    MOCK_USE_ROUTE_HISTORY.mockReset();
    MOCK_USE_ROUTE_HISTORY.mockReturnValue({
      callbackUrl: jest.fn(
        (transformFn?: TransformRouteFn | undefined) =>
          transformFn?.(ROUTES) ?? ROOT_PATH,
      ),
    });
  });

  test("does not redirect if auth status and authentication status is PENDING", () => {
    renderHook(() =>
      useSessionActive(AUTH_STATE_PENDING, AUTHENTICATION_STATE_PENDING),
    );
    expect(Router.push).not.toHaveBeenCalled();
  });

  test("does not redirect if auth status is PENDING and authentication status is SETTLED", () => {
    renderHook(() =>
      useSessionActive(AUTH_STATE_PENDING, AUTHENTICATION_STATE_SETTLED),
    );
    expect(Router.push).not.toHaveBeenCalled();
  });

  test("redirects if auth status and authentication status is SETTLED", () => {
    renderHook(() =>
      useSessionActive(
        AUTH_STATE_UNAUTHENTICATED_SETTLED,
        AUTHENTICATION_STATE_SETTLED,
      ),
    );
    expect(Router.push).toHaveBeenCalled();
  });

  test("redirects to callback URL if auth status is SETTLED and authentication status is SETTLED", () => {
    renderHook(() =>
      useSessionActive(
        AUTH_STATE_AUTHENTICATED_SETTLED,
        AUTHENTICATION_STATE_SETTLED,
      ),
    );
    expect(Router.push).toHaveBeenCalledWith(ROUTES[1]);
  });

  test("prefers router.query.callbackUrl over route-history fallback", () => {
    mockRouterQuery = { callbackUrl: "/from-query" };
    renderHook(() =>
      useSessionActive(
        AUTH_STATE_AUTHENTICATED_SETTLED,
        AUTHENTICATION_STATE_SETTLED,
      ),
    );
    expect(Router.push).toHaveBeenCalledWith("/from-query");
  });

  test("falls back to route history when router.query.callbackUrl is an empty string", () => {
    mockRouterQuery = { callbackUrl: "" };
    renderHook(() =>
      useSessionActive(
        AUTH_STATE_AUTHENTICATED_SETTLED,
        AUTHENTICATION_STATE_SETTLED,
      ),
    );
    expect(Router.push).toHaveBeenCalledWith(ROUTES[1]);
  });

  test("falls back to route history when router.query.callbackUrl is an absolute URL (open-redirect guard)", () => {
    mockRouterQuery = { callbackUrl: "https://evil.example/phish" };
    renderHook(() =>
      useSessionActive(
        AUTH_STATE_AUTHENTICATED_SETTLED,
        AUTHENTICATION_STATE_SETTLED,
      ),
    );
    expect(Router.push).toHaveBeenCalledWith(ROUTES[1]);
  });

  test("falls back to route history when router.query.callbackUrl is protocol-relative", () => {
    mockRouterQuery = { callbackUrl: "//evil.example/phish" };
    renderHook(() =>
      useSessionActive(
        AUTH_STATE_AUTHENTICATED_SETTLED,
        AUTHENTICATION_STATE_SETTLED,
      ),
    );
    expect(Router.push).toHaveBeenCalledWith(ROUTES[1]);
  });
});
