import { jest } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
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

const fetchEntitiesFromQuery = jest.fn(
  () => new Promise<never>(() => undefined),
);

jest.unstable_mockModule("../src/config/config", () => ({
  // `getConfig` is mocked with only the relevant parts of the site config included in the return value
  getConfig: jest.fn((): TestSiteConfig => SITE_CONFIG),
}));
jest.unstable_mockModule("../src/hooks/authentication/token/useToken", () => ({
  useToken: jest.fn(() => ({ token: TOKEN })),
}));
jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({
    config: { entities: [{ apiPath: API_PATH, route: "projects" }] },
  })),
}));
jest.unstable_mockModule("../src/hooks/useExploreMode/useExploreMode", () => ({
  useExploreMode: jest.fn(() => "SS_FETCH_SS_FILTERING"),
}));
jest.unstable_mockModule("../src/hooks/useEntityService", () => ({
  useEntityService: jest.fn(() => ({
    catalog: "dcp1",
    fetchAllEntities: jest.fn(),
    fetchEntitiesFromQuery,
    path: API_PATH,
  })),
}));
jest.unstable_mockModule("../src/hooks/useExploreState", () => ({
  useExploreState: jest.fn(() => ({
    exploreDispatch: jest.fn(),
    exploreState,
  })),
}));

const { useEntityList } = await import("../src/hooks/useEntityList");

/**
 * Creates explore state for the projects entity list.
 * @param url - Pagination link of the requested page, if any.
 * @returns Explore state.
 */
function makeExploreState(url?: string): ExploreState {
  return {
    entityPageState: {
      projects: { sorting: [{ desc: true, id: "projectTitle" }] },
    },
    filterState: [],
    paginationState: { index: url ? { url } : null },
    tabValue: "projects",
  } as unknown as ExploreState;
}

beforeAll(mockGlobalFetch);

beforeEach(() => {
  fetchMock.resetMocks();
  fetchEntitiesFromQuery.mockClear();
});

describe("useEntityList", () => {
  it("requests a next or previous page from its pagination link exactly as given, with the token", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ hits: [], pagination: {}, termFacets: {} }),
    );
    exploreState = makeExploreState(NEXT_URL);

    renderHook(() => useEntityList({ entityListType: "projects" }));

    await waitFor(() => expect(getRequests()).toHaveLength(1));
    const [request] = getRequests();
    expect(request.url).toBe(NEXT_URL);
    expect(request.headers.get("Authorization")).toBe(`Bearer ${TOKEN}`);
    expect(fetchEntitiesFromQuery).not.toHaveBeenCalled();
  });

  it("requests the first page with the filters and sort, and no sort key", () => {
    exploreState = makeExploreState();

    renderHook(() => useEntityList({ entityListType: "projects" }));

    expect(fetchEntitiesFromQuery).toHaveBeenCalledWith(
      API_PATH,
      { filters: "{}", order: "desc", sort: "projectTitle" },
      "dcp1",
      TOKEN,
    );
    expect(getRequests()).toHaveLength(0);
  });
});
