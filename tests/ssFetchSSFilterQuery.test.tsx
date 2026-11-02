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

type TestSiteConfig = Pick<SiteConfig, "dataSource">;

const SITE_CONFIG: TestSiteConfig = {
  dataSource: {
    defaultListParams: { size: "25" },
    url: "https://service.azul.data/",
  },
};

const API_PATH = "https://service.azul.data/index/projects";
const NEXT_URL = `${API_PATH}?catalog=dcp1&filters=%7B%7D&size=25&sort=projectTitle&order=asc&search_after=Brain&search_after_uid=doc%23a`;
const TOKEN = "test-token";

let exploreState: ExploreState;

jest.unstable_mockModule("../src/config/config", () => ({
  // `getConfig` is mocked with only the relevant parts of the site config included in the return value
  getConfig: jest.fn((): TestSiteConfig => SITE_CONFIG),
}));
jest.unstable_mockModule("../src/hooks/useCatalog", () => ({
  useCatalog: jest.fn(() => "dcp1"),
}));
jest.unstable_mockModule("../src/hooks/authentication/token/useToken", () => ({
  useToken: jest.fn(() => ({ token: TOKEN })),
}));
jest.unstable_mockModule("../src/hooks/useEntityService", () => ({
  useEntityService: jest.fn(() => ({ path: API_PATH })),
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
 * Creates explore state for the projects entity list.
 * @param sorting - Sorting.
 * @param url - Pagination link of the requested page, if any.
 * @returns Explore state.
 */
function makeExploreState(
  sorting: ExploreState["entityPageState"][string]["sorting"],
  url?: string,
): ExploreState {
  return {
    entityPageState: { projects: { sorting } },
    filterState: [],
    paginationState: {
      index: url ? { url } : null,
    },
    tabValue: "projects",
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
 * Creates a wrapper providing a query client.
 * @param onError - Called with the error caught by the error boundary.
 * @param queryClient - Query client; a new one by default.
 * @returns Wrapper.
 */
function makeWrapper(
  onError: (error: Error) => void = jest.fn(),
  queryClient = new QueryClient(),
): ({ children }: { children: ReactNode }) => JSX.Element {
  return function Wrapper({ children }: { children: ReactNode }): JSX.Element {
    return (
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary onError={onError}>{children}</ErrorBoundary>
      </QueryClientProvider>
    );
  };
}

beforeAll(mockGlobalFetch);

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("useQuery", () => {
  it("keeps the current query's response when an earlier query's response arrives last", async () => {
    // Responses resolve when the test says so, keyed by request URL.
    const pending = new Map<string, Deferred>();
    fetchMock.mockResponse(
      (request) =>
        new Promise<string>((resolve) => pending.set(request.url, { resolve })),
    );

    // Page 2 of the ascending sort is requested.
    exploreState = makeExploreState(
      [{ desc: false, id: "projectTitle" }],
      NEXT_URL,
    );
    const { rerender, result } = renderHook(() => useQuery("projects"), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(pending.size).toBe(1));

    // The sort changes before page 2 arrives: page 1 of the descending sort is requested.
    exploreState = makeExploreState([{ desc: true, id: "projectTitle" }]);
    rerender();
    await waitFor(() => expect(pending.size).toBe(2));
    const [pageRequestUrl, sortRequestUrl] = [...pending.keys()];

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
    exploreState = makeExploreState(
      [{ desc: false, id: "projectTitle" }],
      NEXT_URL,
    );

    const { result } = renderHook(() => useQuery("projects"), {
      wrapper: makeWrapper(),
    });

    await waitFor(() =>
      expect(result.current.data?.hits).toEqual([{ id: "page-2" }]),
    );
    const [request] = getRequests();
    expect(request.url).toBe(NEXT_URL);
    expect(request.headers.get("Authorization")).toBe(`Bearer ${TOKEN}`);
    expect(result.current.data?.apiPath).toBe(API_PATH);
  });

  it("requests the first page with the sort and no sort key", async () => {
    fetchMock.mockResponseOnce(responseBody("page-1"));
    exploreState = makeExploreState([{ desc: true, id: "projectTitle" }]);

    const { result } = renderHook(() => useQuery("projects"), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const url = new URL(getRequests()[0].url);
    expect(url.searchParams.get("catalog")).toBe("dcp1");
    expect(url.searchParams.get("sort")).toBe("projectTitle");
    expect(url.searchParams.get("order")).toBe("desc");
    expect(url.searchParams.has("search_after")).toBe(false);
    expect(url.searchParams.has("search_before")).toBe(false);
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
  it.each([
    ["by default", {}],
    [
      "when the app's query client throws errors by default",
      { throwOnError: true },
    ],
  ])(
    "requests a failed query again when it is next used, %s",
    async (_, queries) => {
      jest.spyOn(console, "error").mockImplementation(() => undefined);
      fetchMock.mockResponseOnce("", { status: 404 });
      fetchMock.mockResponseOnce(responseBody("recovered"));
      exploreState = makeExploreState([]);
      const queryClient = new QueryClient({ defaultOptions: { queries } });
      const onError = jest.fn<(error: Error) => void>();

      const { unmount } = renderHook(() => useQuery("projects"), {
        wrapper: makeWrapper(onError, queryClient),
      });
      await waitFor(() => expect(onError).toHaveBeenCalled());
      unmount();

      const { result } = renderHook(() => useQuery("projects"), {
        wrapper: makeWrapper(jest.fn(), queryClient),
      });

      await waitFor(() =>
        expect(result.current.data?.hits).toEqual([{ id: "recovered" }]),
      );
      expect(getRequests()).toHaveLength(2);
    },
  );
});
