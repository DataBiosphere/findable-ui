import { jest } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import type { SiteConfig } from "../src/config/entities";
import type {
  ExploreAction,
  ExploreState,
} from "../src/providers/exploreState";
import { mockGlobalFetch } from "./utils/fetchMock";

type TestSiteConfig = Pick<SiteConfig, "dataSource">;

const SITE_CONFIG: TestSiteConfig = {
  dataSource: {
    defaultListParams: { size: "25" },
    url: "https://service.azul.data/",
  },
};

const API_PATH = "https://service.azul.data/index/projects";

let exploreState: ExploreState;
const exploreDispatch = jest.fn<(action: ExploreAction) => void>();

jest.unstable_mockModule("../src/config/config", () => ({
  // `getConfig` is mocked with only the relevant parts of the site config included in the return value
  getConfig: jest.fn((): TestSiteConfig => SITE_CONFIG),
}));
jest.unstable_mockModule("../src/hooks/useCatalog", () => ({
  useCatalog: jest.fn(() => "dcp1"),
}));
jest.unstable_mockModule("../src/hooks/authentication/token/useToken", () => ({
  useToken: jest.fn(() => ({ token: undefined })),
}));
jest.unstable_mockModule("../src/hooks/useEntityService", () => ({
  useEntityService: jest.fn(() => ({ path: API_PATH })),
}));
jest.unstable_mockModule("../src/hooks/useExploreState", () => ({
  useExploreState: jest.fn(() => ({ exploreDispatch, exploreState })),
}));

const { useAdapter } =
  await import("../src/views/ExploreView/entityList/data/strategies/SSFetchSSFilter/adapter/useAdapter");
const { ExploreActionKind } = await import("../src/providers/exploreState");

interface Deferred {
  resolve: (body: string) => void;
}

/**
 * Creates explore state on the projects tab with the given sort.
 * @param desc - Whether the sort is descending.
 * @returns Explore state.
 */
function makeExploreState(desc: boolean): ExploreState {
  return {
    entityPageState: { projects: { sorting: [{ desc, id: "projectTitle" }] } },
    filterState: [],
    paginationState: { index: null },
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
 * Returns the payloads of the processed explore responses dispatched so far.
 * @returns Loading flag and list items of each.
 */
function getProcessedResponses(): { listItems: unknown; loading: boolean }[] {
  return exploreDispatch.mock.calls
    .map(([action]) => action)
    .filter(({ type }) => type === ExploreActionKind.ProcessExploreResponse)
    .map(({ payload }) => {
      const { listItems, loading } = payload as {
        listItems: unknown;
        loading: boolean;
      };
      return { listItems, loading };
    });
}

beforeAll(mockGlobalFetch);

beforeEach(() => {
  fetchMock.resetMocks();
  exploreDispatch.mockClear();
});

describe("useAdapter", () => {
  // The loading look depends on this: explore state clears the rows while `loading` is true.
  it("sends `loading: true` into explore state while a changed query loads, then the new response", async () => {
    const pending: Deferred[] = [];
    fetchMock.mockResponse(
      () => new Promise<string>((resolve) => pending.push({ resolve })),
    );

    // The first response arrives.
    exploreState = makeExploreState(false);
    const { rerender } = renderHook(() => useAdapter("projects"));
    await waitFor(() => expect(pending).toHaveLength(1));
    pending[0].resolve(responseBody("ascending"));
    await waitFor(() =>
      expect(getProcessedResponses()).toEqual([
        { listItems: [{ id: "ascending" }], loading: false },
      ]),
    );

    // The sort changes: loading, then the new response.
    exploreState = makeExploreState(true);
    rerender();
    await waitFor(() => expect(pending).toHaveLength(2));
    pending[1].resolve(responseBody("descending"));
    await waitFor(() => expect(getProcessedResponses()).toHaveLength(3));

    // The previous response is sent with `loading: true` (explore state then clears the rows), never as loaded rows.
    expect(getProcessedResponses()).toEqual([
      { listItems: [{ id: "ascending" }], loading: false },
      { listItems: [{ id: "ascending" }], loading: true },
      { listItems: [{ id: "descending" }], loading: false },
    ]);
  });
});
