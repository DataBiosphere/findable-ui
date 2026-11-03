import { jest } from "@jest/globals";
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { Component, type JSX, type ReactNode } from "react";
import type { SiteConfig } from "../src/config/entities";
import { getRequests, mockGlobalFetch } from "./utils/fetchMock";

type TestSiteConfig = Pick<SiteConfig, "dataSource">;

const SITE_CONFIG: TestSiteConfig = {
  dataSource: { url: "https://service.data/" },
};

const API_PATH = "https://service.data/atlases";
const TOKEN = "test-token";

let token: string | undefined;

jest.unstable_mockModule("../src/config/config", () => ({
  // `getConfig` is mocked with only the relevant parts of the site config included in the return value
  getConfig: jest.fn((): TestSiteConfig => SITE_CONFIG),
}));
jest.unstable_mockModule("../src/hooks/authentication/token/useToken", () => ({
  useToken: jest.fn(() => ({ token })),
}));
jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({
    config: {
      entities: [
        { apiPath: API_PATH, route: "atlases" },
        { route: "platforms" }, // Client-side fetched: no API path.
      ],
    },
  })),
}));

const { useQuery } =
  await import("../src/views/ExploreView/entityList/data/strategies/SSFetchCSFilter/query/useQuery");
const { DataExplorerError } = await import("../src/types/error");

interface Deferred {
  resolve: (body: string) => void;
}

/**
 * Error boundary recording the error it catches.
 */
class ErrorBoundary extends Component<
  { children: ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    this.props.onError(error);
  }

  render(): ReactNode {
    return this.state.hasError ? null : this.props.children;
  }
}

/**
 * Creates a wrapper with an error boundary, and no query client unless an app's is given: the hook uses its own.
 * @param onError - Called with the error caught by the error boundary.
 * @param appQueryClient - An app's query client, provided above the hook, if any.
 * @returns Wrapper.
 */
function makeWrapper(
  onError: (error: Error) => void = jest.fn(),
  appQueryClient?: QueryClient,
): ({ children }: { children: ReactNode }) => JSX.Element {
  return function Wrapper({ children }: { children: ReactNode }): JSX.Element {
    const boundary = (
      <ErrorBoundary onError={onError}>{children}</ErrorBoundary>
    );
    if (!appQueryClient) return boundary;
    return (
      <QueryClientProvider client={appQueryClient}>
        {boundary}
      </QueryClientProvider>
    );
  };
}

/**
 * Returns a response body listing the given entity IDs.
 * @param ids - Entity IDs.
 * @returns Response body.
 */
function responseBody(...ids: string[]): string {
  return JSON.stringify(ids.map((id) => ({ id })));
}

beforeAll(mockGlobalFetch);

beforeEach(() => {
  fetchMock.resetMocks();
  token = undefined;
});

describe("useQuery", () => {
  it("keeps the current query's response when a request made before signing in resolves last", async () => {
    // Responses resolve when the test says so, in request order.
    const pending: Deferred[] = [];
    fetchMock.mockResponse(
      () => new Promise<string>((resolve) => pending.push({ resolve })),
    );

    // The list is requested while signed out.
    const { rerender, result } = renderHook(() => useQuery("atlases"), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(pending).toHaveLength(1));

    // The user signs in before the list arrives: the list is requested again with the token.
    token = TOKEN;
    rerender();
    await waitFor(() => expect(pending).toHaveLength(2));
    const [signedOutRequest, signedInRequest] = getRequests();
    expect(signedOutRequest.headers.get("Authorization")).toBeNull();
    expect(signedInRequest.headers.get("Authorization")).toBe(
      `Bearer ${TOKEN}`,
    );

    // The earlier request is cancelled.
    await waitFor(() => expect(signedOutRequest.signal.aborted).toBe(true));
    expect(signedInRequest.signal.aborted).toBe(false);

    // The signed-in response arrives first.
    pending[1].resolve(responseBody("signed-in"));
    await waitFor(() =>
      expect(result.current.data).toEqual([{ id: "signed-in" }]),
    );

    // The signed-out response arrives last, and is not shown.
    await act(async () => {
      pending[0].resolve(responseBody("signed-out"));
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(result.current.data).toEqual([{ id: "signed-in" }]);
    expect(result.current.isFetching).toBe(false);
  });

  it("requests the API path with the token, and returns the entities of a response keyed by entity ID", async () => {
    token = TOKEN;
    fetchMock.mockResponseOnce(
      JSON.stringify({ a: { id: "a" }, b: { id: "b" } }),
    );

    const { result } = renderHook(() => useQuery("atlases"), {
      wrapper: makeWrapper(),
    });

    await waitFor(() =>
      expect(result.current.data).toEqual([{ id: "a" }, { id: "b" }]),
    );
    const [request] = getRequests();
    expect(request.url).toBe(API_PATH);
    expect(request.headers.get("Authorization")).toBe(`Bearer ${TOKEN}`);
  });

  it("doesn't request the list again when the token is refreshed", async () => {
    token = TOKEN;
    fetchMock.mockResponseOnce(responseBody("a"));

    const { rerender, result } = renderHook(() => useQuery("atlases"), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.data).toEqual([{ id: "a" }]));

    token = "refreshed-token";
    rerender();

    expect(result.current.data).toEqual([{ id: "a" }]);
    expect(result.current.isFetching).toBe(false);
    expect(getRequests()).toHaveLength(1);
  });

  // E.g. a client-side fetched entity list still selected while the page changes to this one.
  it("doesn't request an entity list with no API path", async () => {
    const { result } = renderHook(() => useQuery("platforms"), {
      wrapper: makeWrapper(),
    });

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(getRequests()).toHaveLength(0);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isFetching).toBe(false);
  });

  it("throws a failed request to the error boundary as a DataExplorerError", async () => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    fetchMock.mockResponseOnce("", { status: 404 });
    const onError = jest.fn<(error: Error) => void>();

    renderHook(() => useQuery("atlases"), { wrapper: makeWrapper(onError) });

    await waitFor(() => expect(onError).toHaveBeenCalled());
    const [error] = onError.mock.calls[0];
    expect(error).toBeInstanceOf(DataExplorerError);
    expect((error as InstanceType<typeof DataExplorerError>).statusCode).toBe(
      404,
    );
    expect(getRequests()).toHaveLength(1);
  });

  it("requests the list while the browser reports being offline", async () => {
    fetchMock.mockResponseOnce(responseBody("offline"));
    onlineManager.setOnline(false);

    try {
      const { result } = renderHook(() => useQuery("atlases"), {
        wrapper: makeWrapper(),
      });

      await waitFor(() =>
        expect(result.current.data).toEqual([{ id: "offline" }]),
      );
      expect(getRequests()).toHaveLength(1);
    } finally {
      onlineManager.setOnline(true);
    }
  });

  it("uses its own query client, so an app's client defaults don't apply", async () => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    fetchMock.mockResponse("", { status: 404 });
    const onError = jest.fn<(error: Error) => void>();
    const appQueryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: 3, retryDelay: 0, throwOnError: true },
      },
    });

    renderHook(() => useQuery("atlases"), {
      wrapper: makeWrapper(onError, appQueryClient),
    });

    await waitFor(() => expect(onError).toHaveBeenCalled());
    expect(onError.mock.calls[0][0]).toBeInstanceOf(DataExplorerError);
    expect(getRequests()).toHaveLength(1); // No retries, though the app's client retries 3 times.
    expect(appQueryClient.getQueryCache().getAll()).toHaveLength(0);
  });
});
