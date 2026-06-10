import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import { TransformRouteFn } from "../src/hooks/useRouteHistory";

const ROOT_PATH = "/";
const ROUTES = ["/login", "/route1", "/route2"];
const PROVIDER_ID = "google";

let mockRouterQuery: Record<string, string | string[] | undefined> = {};

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ({ query: mockRouterQuery })),
}));
jest.unstable_mockModule("../src/hooks/useRouteHistory", () => ({
  useRouteHistory: jest.fn(),
}));
jest.unstable_mockModule("../src/nextauth/service", () => ({
  service: { login: jest.fn(), logout: jest.fn() },
}));

const { useRouteHistory } = await import("../src/hooks/useRouteHistory");
const { service } = await import("../src/nextauth/service");
const { useNextAuthService } =
  await import("../src/nextauth/hooks/useNextAuthService");

const MOCK_USE_ROUTE_HISTORY = useRouteHistory as jest.MockedFunction<
  typeof useRouteHistory
>;
const MOCK_LOGIN = service.login as jest.MockedFunction<typeof service.login>;

describe("useNextAuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRouterQuery = {};
    MOCK_LOGIN.mockReset();
    MOCK_USE_ROUTE_HISTORY.mockReset();
    MOCK_USE_ROUTE_HISTORY.mockReturnValue({
      callbackUrl: jest.fn(
        (transformFn?: TransformRouteFn | undefined) =>
          transformFn?.(ROUTES) ?? ROOT_PATH,
      ),
    });
  });

  test("requestLogin uses route-history fallback when query.callbackUrl is absent", () => {
    const { result } = renderHook(() => useNextAuthService());
    act(() => result.current.requestLogin(PROVIDER_ID));
    expect(MOCK_LOGIN).toHaveBeenCalledWith(PROVIDER_ID, {
      callbackUrl: ROUTES[1],
    });
  });

  test("requestLogin prefers a same-origin query.callbackUrl over route history", () => {
    mockRouterQuery = { callbackUrl: "/from-query" };
    const { result } = renderHook(() => useNextAuthService());
    act(() => result.current.requestLogin(PROVIDER_ID));
    expect(MOCK_LOGIN).toHaveBeenCalledWith(PROVIDER_ID, {
      callbackUrl: "/from-query",
    });
  });

  test("requestLogin falls back to route history when query.callbackUrl is empty", () => {
    mockRouterQuery = { callbackUrl: "" };
    const { result } = renderHook(() => useNextAuthService());
    act(() => result.current.requestLogin(PROVIDER_ID));
    expect(MOCK_LOGIN).toHaveBeenCalledWith(PROVIDER_ID, {
      callbackUrl: ROUTES[1],
    });
  });

  test("requestLogin rejects an absolute URL in query.callbackUrl (open-redirect guard)", () => {
    mockRouterQuery = { callbackUrl: "https://evil.example/phish" };
    const { result } = renderHook(() => useNextAuthService());
    act(() => result.current.requestLogin(PROVIDER_ID));
    expect(MOCK_LOGIN).toHaveBeenCalledWith(PROVIDER_ID, {
      callbackUrl: ROUTES[1],
    });
  });

  test("requestLogin rejects a protocol-relative URL in query.callbackUrl", () => {
    mockRouterQuery = { callbackUrl: "//evil.example/phish" };
    const { result } = renderHook(() => useNextAuthService());
    act(() => result.current.requestLogin(PROVIDER_ID));
    expect(MOCK_LOGIN).toHaveBeenCalledWith(PROVIDER_ID, {
      callbackUrl: ROUTES[1],
    });
  });
});
