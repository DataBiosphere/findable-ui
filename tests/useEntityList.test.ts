import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import type { AzulEntitiesResponse } from "../src/apis/azul/common/entities";
import type { ExploreMode } from "../src/hooks/useExploreMode/types";
import type {
  ExploreAction,
  ExploreState,
} from "../src/providers/exploreState";
import { mockGlobalFetch } from "./utils/fetchMock";

let exploreMode: ExploreMode;
const exploreDispatch = jest.fn<(action: ExploreAction) => void>();

jest.unstable_mockModule("../src/hooks/useExploreMode/useExploreMode", () => ({
  useExploreMode: jest.fn(() => exploreMode),
}));
jest.unstable_mockModule("../src/hooks/useEntityService", () => ({
  useEntityService: jest.fn(() => ({})),
}));
jest.unstable_mockModule("../src/hooks/useExploreState", () => ({
  useExploreState: jest.fn(() => ({
    exploreDispatch,
    exploreState: { tabValue: "atlases" } as unknown as ExploreState,
  })),
}));

const { useEntityList } = await import("../src/hooks/useEntityList");
const { EXPLORE_MODE } = await import("../src/hooks/useExploreMode/types");
const { ExploreActionKind } = await import("../src/providers/exploreState");

const STATIC_DATA = {
  hits: [{ id: "a" }],
} as unknown as AzulEntitiesResponse;

beforeAll(mockGlobalFetch);

beforeEach(() => {
  fetchMock.resetMocks();
  exploreDispatch.mockClear();
});

describe("useEntityList", () => {
  it("leaves server-side-fetched, client-side-filtered lists to their strategy", () => {
    exploreMode = EXPLORE_MODE.SS_FETCH_CS_FILTERING;

    renderHook(() =>
      useEntityList({ data: STATIC_DATA, entityListType: "atlases" }),
    );

    expect(fetchMock.mock.calls).toHaveLength(0);
    expect(exploreDispatch).not.toHaveBeenCalled();
  });

  it("sends the static data of client-side-fetched lists into explore state", () => {
    exploreMode = EXPLORE_MODE.CS_FETCH_CS_FILTERING;

    renderHook(() =>
      useEntityList({ data: STATIC_DATA, entityListType: "atlases" }),
    );

    expect(exploreDispatch).toHaveBeenCalledTimes(1);
    expect(exploreDispatch.mock.calls[0][0]).toMatchObject({
      payload: { listItems: [{ id: "a" }], loading: false },
      type: ExploreActionKind.ProcessExploreResponse,
    });
  });
});
