import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import Router, { NextRouter } from "next/router";

const ROOT_PATH = "/";
const ROUTES = ["/route1", "/route2", "/route3", "/route4"];

jest.unstable_mockModule("next/router", () => {
  return {
    ...jest.requireActual<typeof import("next/router")>("next/router"),
    useRouter: jest.fn(),
  };
});
jest.unstable_mockModule("../src/hooks/useRouteRoot", () => ({
  useRouteRoot: jest.fn(),
}));

const { useRouter } = await import("next/router");
const { useRouteRoot } = await import("../src/hooks/useRouteRoot");
const { useRouteHistory } = await import("../src/hooks/useRouteHistory");

const MOCK_USE_ROUTER = useRouter as jest.MockedFunction<
  () => Partial<NextRouter>
>;
const MOCK_USE_ROUTE_ROOT = useRouteRoot as jest.MockedFunction<
  typeof useRouteRoot
>;

describe("useRouteHistory", () => {
  beforeEach(() => {
    MOCK_USE_ROUTE_ROOT.mockReset();
    MOCK_USE_ROUTER.mockReset();
    MOCK_USE_ROUTER.mockReturnValue({
      asPath: ROUTES[0],
    });
    MOCK_USE_ROUTE_ROOT.mockReturnValue(ROOT_PATH);
  });

  test("returns the root path when no previous route exists", () => {
    const { result } = renderHook(() => useRouteHistory());
    expect(result.current.callbackUrl()).toBe(ROOT_PATH);
  });

  test("updates history on route change", () => {
    const { result } = renderHook(() => useRouteHistory());
    act(() => {
      Router.events.emit("routeChangeComplete", ROUTES[1]);
      Router.events.emit("routeChangeComplete", ROUTES[2]);
    });
    expect(result.current.callbackUrl()).toBe(ROUTES[1]);
  });

  test("does not add duplicate routes to history", () => {
    const { result } = renderHook(() => useRouteHistory());
    act(() => {
      Router.events.emit("routeChangeComplete", ROUTES[2]);
      Router.events.emit("routeChangeComplete", ROUTES[2]);
    });
    expect(result.current.callbackUrl()).toBe(ROUTES[0]);
  });

  test("limits history length to maxHistory", () => {
    const { result } = renderHook(() => useRouteHistory(2));
    act(() => {
      Router.events.emit("routeChangeComplete", ROUTES[1]);
      Router.events.emit("routeChangeComplete", ROUTES[2]);
      Router.events.emit("routeChangeComplete", ROUTES[3]);
    });
    // Use `callbackUrl` with a transform function to capture the full history.
    let history;
    result.current.callbackUrl((routes) => {
      history = routes;
      return ROOT_PATH;
    });
    // After emitting the routes, the history stack is [ROUTES[3], ROUTES[2].
    expect(history).toHaveLength(2);
    expect(history).toEqual([ROUTES[3], ROUTES[2]]);
  });

  test("uses transform function if provided", () => {
    const { result } = renderHook(() => useRouteHistory(4));
    act(() => {
      Router.events.emit("routeChangeComplete", ROUTES[1]);
      Router.events.emit("routeChangeComplete", ROUTES[2]);
      Router.events.emit("routeChangeComplete", ROUTES[3]);
    });
    // After emitting the routes, the history stack is [ROUTES[3], ROUTES[2], ROUTES[1], ROUTES[0]].
    const transformFn = (routes: string[]): string => routes[2];
    expect(result.current.callbackUrl(transformFn)).toBe(ROUTES[1]);
  });

  test("returns root path when transform function is provided but history stack lacks sufficient entries", () => {
    const { result } = renderHook(() => useRouteHistory());
    const transformFn = (routes: string[]): string => routes[2];
    expect(result.current.callbackUrl(transformFn)).toBe(ROOT_PATH);
  });
});
