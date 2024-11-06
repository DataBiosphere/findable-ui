import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import Router from "next/router";

const ROOT_PATH = "/";
const ROUTES = ["/route1", "/route2", "/route3", "/route4"];

jest.unstable_mockModule("next/router", async () => {
  const original =
    jest.requireActual<typeof import("next/router")>("next/router");
  return {
    __esModule: true,
    ...original,
    useRouter: jest.fn(),
  };
});
jest.unstable_mockModule("../src/hooks/useRouteRoot", () => ({
  useRouteRoot: jest.fn(),
}));

const { useRouter } = await import("next/router");
const { useRouteRoot } = await import("../src/hooks/useRouteRoot");
const { useRouteHistory } = await import("../src/hooks/useRouteHistory");

const MOCK_USE_ROUTER = useRouter as jest.MockedFunction<typeof useRouter>;
const MOCK_USE_ROUTE_ROOT = useRouteRoot as jest.MockedFunction<
  typeof useRouteRoot
>;

describe("useRouteHistory", () => {
  beforeEach(async () => {
    MOCK_USE_ROUTE_ROOT.mockReset();
    MOCK_USE_ROUTER.mockReset();
    MOCK_USE_ROUTER.mockReturnValue({
      asPath: ROUTES[0],
      back: jest.fn(),
      basePath: "",
      beforePopState: jest.fn(),
      events: {
        emit: jest.fn(),
        off: jest.fn(),
        on: jest.fn(),
      },
      forward: jest.fn(),
      isFallback: false,
      isLocaleDomain: false,
      isPreview: false,
      isReady: true,
      pathname: ROUTES[0],
      prefetch: jest.fn(() => Promise.resolve()),
      push: jest.fn(() => Promise.resolve(true)),
      query: {},
      reload: jest.fn(),
      replace: jest.fn(() => Promise.resolve(true)),
      route: ROUTES[0],
    });
    MOCK_USE_ROUTE_ROOT.mockReturnValue(ROOT_PATH);
  });

  test("returns the root path when no previous route exists", () => {
    const { result } = renderHook(() => useRouteHistory());
    expect(result.current.callbackUrl()).toEqual(ROOT_PATH);
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
    expect(result.current.callbackUrl()).toBe(ROUTES[2]);
  });

  test("uses transform function if provided", () => {
    const { result } = renderHook(() => useRouteHistory(4));
    act(() => {
      Router.events.emit("routeChangeComplete", ROUTES[1]); // Route is third in stack at index 2 e.g. [3, 2, 1, 0]
      Router.events.emit("routeChangeComplete", ROUTES[2]);
      Router.events.emit("routeChangeComplete", ROUTES[3]); // Route is first in stack at index 0 e.g. [3, 2, 1, 0]
    });
    const transformFn = (routes: string[]): string => routes[2]; // Pick the third route in the stack at index 2.
    expect(result.current.callbackUrl(transformFn)).toBe(ROUTES[1]);
  });

  test("returns root path when transform function is provided but history stack lacks sufficient entries", () => {
    const { result } = renderHook(() => useRouteHistory());
    const transformFn = (routes: string[]): string => routes[2];
    expect(result.current.callbackUrl(transformFn)).toBe(ROOT_PATH);
  });
});
