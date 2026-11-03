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
  dataSource: { url: "https://service.data/" },
};

const API_PATH = "https://service.data/atlases";

let exploreState: ExploreState;
let token: string | undefined;
const exploreDispatch = jest.fn<(action: ExploreAction) => void>();

/**
 * Maps a fetched entity to a list item.
 * @param entity - Fetched entity.
 * @param entity.id - Entity ID.
 * @returns List item.
 */
function entityMapper({ id }: { id: string }): { mapped: string } {
  return { mapped: id };
}

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
        { apiPath: API_PATH, entityMapper, route: "atlases" },
        { apiPath: `${API_PATH}/projects`, route: "projects" },
        { route: "platforms" }, // Client-side fetched: no API path.
      ],
    },
  })),
}));
jest.unstable_mockModule("../src/hooks/useExploreState", () => ({
  useExploreState: jest.fn(() => ({ exploreDispatch, exploreState })),
}));

const { useAdapter } =
  await import("../src/views/ExploreView/entityList/data/strategies/SSFetchCSFilter/adapter/useAdapter");
const { ExploreActionKind } = await import("../src/providers/exploreState");
const { DEFAULT_PAGINATION_STATE } =
  await import("../src/providers/exploreState/initializer/constants");

/**
 * Creates explore state on the given tab.
 * @param tabValue - Selected entity list type.
 * @returns Explore state.
 */
function makeExploreState(tabValue: string): ExploreState {
  return { tabValue } as unknown as ExploreState;
}

/**
 * Returns the types of the actions dispatched so far.
 * @returns Action types.
 */
function getDispatchedTypes(): ExploreAction["type"][] {
  return exploreDispatch.mock.calls.map(([{ type }]) => type);
}

beforeAll(mockGlobalFetch);

beforeEach(() => {
  fetchMock.resetMocks();
  exploreDispatch.mockClear();
  token = undefined;
});

describe("useAdapter", () => {
  it("sends the mapped entities into explore state, loaded, as one page of every entity", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ id: "a" }, { id: "b" }]));
    exploreState = makeExploreState("atlases");

    renderHook(() => useAdapter("atlases"));

    await waitFor(() =>
      expect(getDispatchedTypes()).toContain(
        ExploreActionKind.ProcessExploreResponse,
      ),
    );
    expect(exploreDispatch).toHaveBeenLastCalledWith({
      payload: {
        listItems: [{ mapped: "a" }, { mapped: "b" }],
        loading: false,
        paginationResponse: {
          ...DEFAULT_PAGINATION_STATE,
          pageSize: 2,
          rows: 2,
        },
      },
      type: ExploreActionKind.ProcessExploreResponse,
    });
  });

  it("sends nothing into explore state while another server-side fetched entity list type is selected", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ id: "a" }]));
    exploreState = makeExploreState("projects");

    renderHook(() => useAdapter("atlases"));

    await waitFor(() => expect(fetchMock.mock.calls).toHaveLength(1));
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(getDispatchedTypes()).not.toContain(
      ExploreActionKind.ProcessExploreResponse,
    );
  });

  it("requests nothing while a client-side fetched entity list type is selected", async () => {
    exploreState = makeExploreState("platforms");

    renderHook(() => useAdapter("atlases"));

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(fetchMock.mock.calls).toHaveLength(0);
    expect(getDispatchedTypes()).not.toContain(
      ExploreActionKind.ProcessExploreResponse,
    );
  });

  it("resets the explore response when the user signs in, not when the token is refreshed", async () => {
    fetchMock.mockResponse(JSON.stringify([{ id: "a" }]));
    exploreState = makeExploreState("atlases");
    const { rerender } = renderHook(() => useAdapter("atlases"));
    await waitFor(() =>
      expect(getDispatchedTypes()).toContain(
        ExploreActionKind.ProcessExploreResponse,
      ),
    );
    exploreDispatch.mockClear();

    // Signing in resets the response, then the list is requested again with the token.
    token = "token";
    rerender();
    await waitFor(() =>
      expect(getDispatchedTypes()).toEqual([
        ExploreActionKind.ResetExploreResponse,
        ExploreActionKind.ProcessExploreResponse,
      ]),
    );
    exploreDispatch.mockClear();

    // A token refresh doesn't.
    token = "refreshed-token";
    rerender();
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(getDispatchedTypes()).toEqual([]);
    expect(fetchMock.mock.calls).toHaveLength(2);
  });
});
