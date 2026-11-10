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
import type { ExploreState } from "../src/providers/exploreState";
import { getRequests, mockGlobalFetch } from "./utils/fetchMock";

type TestSiteConfig = Pick<SiteConfig, "dataSource" | "kyOptions">;

const SITE_CONFIG: TestSiteConfig = {
  dataSource: {
    // The default sort is never sent: the sort comes from explore state.
    defaultListParams: { size: "25", sort: "entryId" },
    url: "https://service.azul.data/",
  },
  // jsdom has no `AbortSignal.any`, so ky would retry a cancelled request into a later test; browsers don't.
  kyOptions: { retry: 0 },
};

const API_PATH = "https://service.azul.data/index/projects";
const NEXT_URL = `${API_PATH}?catalog=dcp1&filters=%7B%7D&size=25&sort=projectTitle&order=asc&search_after=Brain&search_after_uid=doc%23a`;
const TOKEN = "test-token";

let exploreState: ExploreState;
let token: string | undefined;

jest.unstable_mockModule("../src/config/config", () => ({
  // `getConfig` is mocked with only the relevant parts of the site config included in the return value
  getConfig: jest.fn((): TestSiteConfig => SITE_CONFIG),
}));
jest.unstable_mockModule("../src/hooks/useCatalog", () => ({
  useCatalog: jest.fn(() => "dcp1"),
}));
jest.unstable_mockModule("../src/hooks/authentication/token/useToken", () => ({
  useToken: jest.fn(() => ({ token })),
}));
jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({
    config: {
      dataSource: SITE_CONFIG.dataSource,
      entities: [
        { apiPath: API_PATH, route: "projects" },
        { route: "platforms" }, // Client-side fetched: no API path.
      ],
    },
  })),
}));
jest.unstable_mockModule("../src/hooks/useExploreState", () => ({
  useExploreState: jest.fn(() => ({
    exploreDispatch: jest.fn(),
    exploreState,
  })),
}));

const { useQuery } =
  await import("../src/views/ExploreView/entityList/data/strategies/SSFetchSSFilter/query/useQuery");
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
 * Creates explore state for the selected entity list.
 * @param sorting - Sorting.
 * @param options - Options.
 * @param options.filterState - Filter state.
 * @param options.tabValue - Selected entity list type.
 * @param options.url - Pagination link of the requested page, if any.
 * @returns Explore state.
 */
function makeExploreState(
  sorting: ExploreState["entityPageState"][string]["sorting"],
  {
    filterState = [],
    tabValue = "projects",
    url,
  }: {
    filterState?: ExploreState["filterState"];
    tabValue?: string;
    url?: string;
  } = {},
): ExploreState {
  return {
    entityPageState: { [tabValue]: { sorting } },
    filterState,
    paginationState: {
      index: url ? { url } : null,
    },
    tabValue,
  } as unknown as ExploreState;
}

/**
 * Returns an Azul entities response body.
 * @param id - Hit id.
 * @returns Response body.
 */
function responseBody(id: string): string {
  return JSON.stringify({
    hits: [{ id }],
    pagination: { count: 1, pages: 1, size: 25, total: 1 },
    termFacets: {},
  });
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

beforeAll(mockGlobalFetch);

beforeEach(() => {
  fetchMock.resetMocks();
  token = TOKEN;
});

describe("useQuery", () => {
  it("keeps the current query's response when an earlier query's response arrives last", async () => {
    // Responses resolve when the test says so, keyed by request URL.
    const pending = new Map<string, Deferred>();
    const requests = new Map<string, Request>();
    fetchMock.mockResponse((request) => {
      requests.set(request.url, request);
      return new Promise<string>((resolve) =>
        pending.set(request.url, { resolve }),
      );
    });

    // Page 2 of the ascending sort is requested.
    exploreState = makeExploreState([{ desc: false, id: "projectTitle" }], {
      url: NEXT_URL,
    });
    const { rerender, result } = renderHook(() => useQuery("projects"), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(pending.size).toBe(1));

    // The sort changes before page 2 arrives: page 1 of the descending sort is requested.
    exploreState = makeExploreState([{ desc: true, id: "projectTitle" }]);
    rerender();
    await waitFor(() => expect(pending.size).toBe(2));
    const [pageRequestUrl, sortRequestUrl] = [...pending.keys()];

    // The earlier request is cancelled.
    await waitFor(() =>
      expect(requests.get(pageRequestUrl)?.signal.aborted).toBe(true),
    );
    expect(requests.get(sortRequestUrl)?.signal.aborted).toBe(false);

    // The newer response arrives first.
    pending.get(sortRequestUrl)?.resolve(responseBody("newer"));
    await waitFor(() =>
      expect(result.current.data?.hits).toEqual([{ id: "newer" }]),
    );

    // The earlier response arrives last, and is not shown.
    await act(async () => {
      pending.get(pageRequestUrl)?.resolve(responseBody("earlier"));
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(result.current.data?.hits).toEqual([{ id: "newer" }]);
    expect(result.current.isFetching).toBe(false);
  });

  it("requests the pagination link exactly as given, with the token", async () => {
    fetchMock.mockResponseOnce(responseBody("page-2"));
    exploreState = makeExploreState([{ desc: false, id: "projectTitle" }], {
      url: NEXT_URL,
    });

    const { result } = renderHook(() => useQuery("projects"), {
      wrapper: makeWrapper(),
    });

    await waitFor(() =>
      expect(result.current.data?.hits).toEqual([{ id: "page-2" }]),
    );
    const [request] = getRequests();
    expect(request.url).toBe(NEXT_URL);
    expect(request.headers.get("Authorization")).toBe(`Bearer ${TOKEN}`);
  });

  it("requests the first page with the filters and sort, and no sort key", async () => {
    fetchMock.mockResponseOnce(responseBody("page-1"));
    exploreState = makeExploreState([{ desc: true, id: "projectTitle" }], {
      filterState: [{ categoryKey: "genusSpecies", value: ["Homo sapiens"] }],
    });

    const { result } = renderHook(() => useQuery("projects"), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const url = new URL(getRequests()[0].url);
    expect(url.searchParams.get("catalog")).toBe("dcp1");
    expect(url.searchParams.get("filters")).toBe(
      JSON.stringify({ genusSpecies: { is: ["Homo sapiens"] } }),
    );
    expect(url.searchParams.get("sort")).toBe("projectTitle");
    expect(url.searchParams.get("order")).toBe("desc");
    expect(url.searchParams.get("size")).toBe("25");
    expect(url.searchParams.has("search_after")).toBe(false);
    expect(url.searchParams.has("search_before")).toBe(false);
  });

  it("requests the first page with the default page size, and no sort or order, when there is no sort", async () => {
    fetchMock.mockResponseOnce(responseBody("page-1"));
    exploreState = makeExploreState([]);

    const { result } = renderHook(() => useQuery("projects"), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const url = new URL(getRequests()[0].url);
    expect(url.origin + url.pathname).toBe(API_PATH);
    expect(url.searchParams.get("catalog")).toBe("dcp1");
    expect(url.searchParams.get("filters")).toBe("{}");
    expect(url.searchParams.get("size")).toBe("25");
    expect(url.searchParams.has("sort")).toBe(false);
    expect(url.searchParams.has("order")).toBe(false);
  });

  it("requests the list again when the user signs in, with the token", async () => {
    fetchMock.mockResponse(responseBody("page-1"));
    exploreState = makeExploreState([]);
    token = undefined;

    const { rerender, result } = renderHook(() => useQuery("projects"), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    token = TOKEN;
    rerender();

    await waitFor(() => expect(getRequests()).toHaveLength(2));
    const [signedOut, signedIn] = getRequests();
    expect(signedOut.headers.has("Authorization")).toBe(false);
    expect(signedIn.headers.get("Authorization")).toBe(`Bearer ${TOKEN}`);
  });

  it("doesn't request the list again when the token is refreshed for the same user", async () => {
    fetchMock.mockResponse(responseBody("page-1"));
    exploreState = makeExploreState([]);

    const { rerender, result } = renderHook(() => useQuery("projects"), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    token = "refreshed-token";
    rerender();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(getRequests()).toHaveLength(1);
  });

  it("refuses a pagination link on another origin, without requesting it", async () => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    exploreState = makeExploreState([{ desc: false, id: "projectTitle" }], {
      url: "https://elsewhere.example/index/projects?search_after=Brain",
    });
    const onError = jest.fn<(error: Error) => void>();

    renderHook(() => useQuery("projects"), { wrapper: makeWrapper(onError) });

    await waitFor(() => expect(onError).toHaveBeenCalled());
    expect(onError.mock.calls[0][0]).toBeInstanceOf(DataExplorerError);
    expect(getRequests()).toHaveLength(0);
  });

  it("doesn't request an entity list with no API path", async () => {
    exploreState = makeExploreState([], { tabValue: "platforms" });

    const { result } = renderHook(() => useQuery("platforms"), {
      wrapper: makeWrapper(),
    });

    // A query that would fetch reports "fetching" from its first render; a skipped one stays idle.
    expect(result.current.fetchStatus).toBe("idle");
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(result.current.fetchStatus).toBe("idle");
    expect(result.current.data).toBeUndefined();
    expect(getRequests()).toHaveLength(0);
  });

  it("throws a failed request to the error boundary as a DataExplorerError", async () => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    fetchMock.mockResponseOnce("", { status: 404 });
    exploreState = makeExploreState([]);
    const onError = jest.fn<(error: Error) => void>();

    renderHook(() => useQuery("projects"), { wrapper: makeWrapper(onError) });

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
    exploreState = makeExploreState([]);
    onlineManager.setOnline(false);

    try {
      const { result } = renderHook(() => useQuery("projects"), {
        wrapper: makeWrapper(),
      });

      await waitFor(() =>
        expect(result.current.data?.hits).toEqual([{ id: "offline" }]),
      );
      expect(getRequests()).toHaveLength(1);
    } finally {
      onlineManager.setOnline(true);
    }
  });

  // E.g. the error page's "To Homepage", then back to the same explore page.
  it("requests a failed query again when it is next used", async () => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    fetchMock.mockResponseOnce("", { status: 404 });
    fetchMock.mockResponseOnce(responseBody("recovered"));
    exploreState = makeExploreState([]);
    const onError = jest.fn<(error: Error) => void>();

    const { unmount } = renderHook(() => useQuery("projects"), {
      wrapper: makeWrapper(onError),
    });
    await waitFor(() => expect(onError).toHaveBeenCalled());
    unmount();

    const { result } = renderHook(() => useQuery("projects"), {
      wrapper: makeWrapper(),
    });

    await waitFor(() =>
      expect(result.current.data?.hits).toEqual([{ id: "recovered" }]),
    );
    expect(getRequests()).toHaveLength(2);
  });

  it("uses its own query client, so an app's client defaults don't apply", async () => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    fetchMock.mockResponse("", { status: 404 });
    exploreState = makeExploreState([]);
    const onError = jest.fn<(error: Error) => void>();
    const appQueryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: 3, retryDelay: 0, throwOnError: true },
      },
    });

    renderHook(() => useQuery("projects"), {
      wrapper: makeWrapper(onError, appQueryClient),
    });

    await waitFor(() => expect(onError).toHaveBeenCalled());
    expect(onError.mock.calls[0][0]).toBeInstanceOf(DataExplorerError);
    expect(getRequests()).toHaveLength(1); // No retries, though the app's client retries 3 times.
    expect(appQueryClient.getQueryCache().getAll()).toHaveLength(0);
  });
});
