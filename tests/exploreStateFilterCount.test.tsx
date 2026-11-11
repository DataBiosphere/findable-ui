import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import type { JSX, ReactNode } from "react";
import { VIEW_KIND } from "../src/common/categories/views/types";
import type { SelectedFilter } from "../src/common/entities";
import type { SiteConfig } from "../src/config/entities";

const CONFIG = {
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
  },
  entities: [{ list: {}, route: "files" }],
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
});
