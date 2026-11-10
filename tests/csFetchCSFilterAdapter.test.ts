import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import type {
  ExploreAction,
  ExploreState,
} from "../src/providers/exploreState";

let exploreState: ExploreState;
const exploreDispatch = jest.fn<(action: ExploreAction) => void>();

/**
 * Maps a statically loaded entity to a list item.
 * @param entity - Statically loaded entity.
 * @param entity.id - Entity ID.
 * @returns List item.
 */
function entityMapper({ id }: { id: string }): { mapped: string } {
  return { mapped: id };
}

jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({
    config: {
      entities: [
        { entityMapper, route: "atlases" },
        { route: "platforms" }, // No entity mapper.
      ],
    },
  })),
}));
jest.unstable_mockModule("../src/hooks/useExploreState", () => ({
  useExploreState: jest.fn(() => ({ exploreDispatch, exploreState })),
}));

const { useAdapter } =
  await import("../src/views/ExploreView/entityList/data/strategies/CSFetchCSFilter/adapter/useAdapter");
const { ExploreActionKind } = await import("../src/providers/exploreState");
const { DEFAULT_PAGINATION_STATE } =
  await import("../src/providers/exploreState/initializer/constants");

const STATIC_DATA = [{ id: "a" }, { id: "b" }];

/**
 * Creates explore state on the given tab.
 * @param tabValue - Selected entity list type.
 * @returns Explore state.
 */
function makeExploreState(tabValue: string): ExploreState {
  return { tabValue } as unknown as ExploreState;
}

beforeEach(() => {
  exploreDispatch.mockClear();
});

describe("useAdapter", () => {
  it("sends the mapped entities into explore state, loaded, as one page of every entity", () => {
    exploreState = makeExploreState("atlases");

    renderHook(() => useAdapter(STATIC_DATA, "atlases"));

    expect(exploreDispatch).toHaveBeenCalledTimes(1);
    expect(exploreDispatch).toHaveBeenCalledWith({
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

  it("sends the entities unmapped when the entity has no mapper", () => {
    exploreState = makeExploreState("platforms");

    renderHook(() => useAdapter(STATIC_DATA, "platforms"));

    expect(exploreDispatch).toHaveBeenCalledTimes(1);
    expect(exploreDispatch.mock.calls[0][0]).toMatchObject({
      payload: { listItems: [{ id: "a" }, { id: "b" }] },
    });
  });

  it("sends nothing into explore state while another entity list type is selected", () => {
    exploreState = makeExploreState("platforms");

    renderHook(() => useAdapter(STATIC_DATA, "atlases"));

    expect(exploreDispatch).not.toHaveBeenCalled();
  });

  it("sends nothing into explore state when there are no entities", () => {
    exploreState = makeExploreState("atlases");

    renderHook(() => useAdapter([], "atlases"));
    renderHook(() => useAdapter(undefined, "atlases"));

    expect(exploreDispatch).not.toHaveBeenCalled();
  });

  it("sends the entities once their entity list type is selected", () => {
    exploreState = makeExploreState("platforms");
    const { rerender } = renderHook(() => useAdapter(STATIC_DATA, "atlases"));
    expect(exploreDispatch).not.toHaveBeenCalled();

    exploreState = makeExploreState("atlases");
    rerender();

    expect(exploreDispatch).toHaveBeenCalledTimes(1);
  });
});
