import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import type { JSX, ReactNode } from "react";
import { VIEW_KIND } from "../src/common/categories/views/types";
import type { SelectedFilter } from "../src/common/entities";
import type { SiteConfig } from "../src/config/entities";

// "participantCount" is a range on files only and "donorCount" a range on datasets only, so counting one entity's filters
// with the other entity's category groups gives a different count.
const CONFIG = {
  entities: [
    {
      categoryGroupConfig: {
        categoryGroups: [
          {
            categoryConfigs: [
              { key: "ancestry", label: "Ancestry" },
              {
                key: "participantCount",
                label: "Participant Count",
                viewKind: VIEW_KIND.RANGE,
              },
            ],
          },
        ],
        key: "files",
        savedFilters: [
          {
            filters: [{ categoryKey: "participantCount", value: [100, null] }],
            title: "Large",
          },
        ],
      },
      list: {},
      route: "files",
    },
    {
      categoryGroupConfig: {
        categoryGroups: [
          {
            categoryConfigs: [
              {
                key: "donorCount",
                label: "Donor Count",
                viewKind: VIEW_KIND.RANGE,
              },
            ],
          },
        ],
        key: "datasets",
      },
      list: {
        tableOptions: {
          initialState: {
            columnFilters: [{ id: "donorCount", value: [1, 5] }],
          },
        },
      },
      route: "datasets",
    },
  ],
} as unknown as SiteConfig;

let decodedFilterParam: string;

jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({
    config: CONFIG,
    defaultEntityListType: "files",
  })),
}));
jest.unstable_mockModule("../src/hooks/useURLFilterParams", () => ({
  useURLFilterParams: jest.fn(() => ({ decodedFilterParam })),
}));

const { ExploreActionKind, ExploreStateProvider } =
  await import("../src/providers/exploreState");
const { useExploreState } = await import("../src/hooks/useExploreState");
const { EXPLORE_URL_PARAMS, SELECT_CATEGORY_KEY } =
  await import("../src/providers/exploreState/constants");

/**
 * Wraps children in the explore state provider on the files entity.
 * @param props - Wrapper props.
 * @param props.children - Children.
 * @returns Explore state provider.
 */
function Wrapper({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ExploreStateProvider entityListType="files">
      {children}
    </ExploreStateProvider>
  );
}

/**
 * Renders the explore state context inside the explore state provider.
 * @param filters - Filters decoded from the URL.
 * @returns The rendered hook, read through `result.current`.
 */
function renderExploreState(
  filters: SelectedFilter[],
): ReturnType<typeof renderHook<ReturnType<typeof useExploreState>, unknown>> {
  decodedFilterParam = JSON.stringify(filters);
  return renderHook(() => useExploreState(), { wrapper: Wrapper });
}

describe("ExploreStateProvider filter count", () => {
  it("counts a range filter from the URL once", () => {
    const { result } = renderExploreState([
      { categoryKey: "participantCount", value: [10, 20] },
    ]);

    expect(result.current.exploreState.filterCount).toBe(1);
  });

  it("counts a selected range once and each selected select value", () => {
    const { result } = renderExploreState([]);

    act(() =>
      result.current.exploreDispatch({
        payload: {
          categoryKey: "participantCount",
          selected: true,
          selectedValue: [10, 20],
          viewKind: VIEW_KIND.RANGE,
        },
        type: ExploreActionKind.UpdateFilter,
      }),
    );
    expect(result.current.exploreState.filterCount).toBe(1);

    act(() =>
      result.current.exploreDispatch({
        payload: {
          categoryKey: "ancestry",
          selected: true,
          selectedValue: "a",
        },
        type: ExploreActionKind.UpdateFilter,
      }),
    );
    expect(result.current.exploreState.filterCount).toBe(2);
  });

  it("counts a saved filter's range once", () => {
    const { result } = renderExploreState([]);

    act(() =>
      result.current.exploreDispatch({
        payload: {
          categoryKey: SELECT_CATEGORY_KEY.SAVED_FILTERS,
          selected: true,
          selectedValue: "Large",
        },
        type: ExploreActionKind.ApplySavedFilter,
      }),
    );

    expect(result.current.exploreState.filterCount).toBe(1);
  });

  it("counts the current entity's updated range filter once", () => {
    const { result } = renderExploreState([]);

    act(() =>
      result.current.exploreDispatch({
        payload: {
          entityListType: "files",
          filters: [
            { categoryKey: "ancestry", value: ["a", "b"] },
            { categoryKey: "participantCount", value: [10, 20] },
          ],
        },
        type: ExploreActionKind.UpdateEntityFilters,
      }),
    );

    expect(result.current.exploreState.filterCount).toBe(3);
  });

  it("counts the selected entity's range filter with that entity's category groups", () => {
    const { result } = renderExploreState([]);

    act(() =>
      result.current.exploreDispatch({
        payload: "datasets",
        type: ExploreActionKind.SelectEntityType,
      }),
    );

    expect(result.current.exploreState.filterCount).toBe(1);
  });

  it("counts a range filter from a URL change once", () => {
    const { result } = renderExploreState([]);

    act(() =>
      result.current.exploreDispatch({
        payload: {
          query: {
            entityListType: "files",
            [EXPLORE_URL_PARAMS.FILTER]: encodeURIComponent(
              JSON.stringify([
                { categoryKey: "participantCount", value: [10, 20] },
              ]),
            ),
          },
        },
        type: ExploreActionKind.UrlToState,
      }),
    );

    expect(result.current.exploreState.filterCount).toBe(1);
  });
});
