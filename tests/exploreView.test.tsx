import { jest } from "@jest/globals";
import { render } from "@testing-library/react";
import type { AzulEntitiesResponse } from "../src/apis/azul/common/entities";
import type { ExploreState } from "../src/providers/exploreState";

const ENTITY_LIST_TYPE = "datasets";

const dataSelector = jest.fn<(props: unknown) => void>();

const exploreState = {
  categoryGroups: undefined,
  categoryViews: [],
  entities: { [ENTITY_LIST_TYPE]: { query: {} } },
  loading: false,
} as unknown as ExploreState;

jest.unstable_mockModule("../src/hooks/useBreakpoint", () => ({
  useBreakpoint: jest.fn(() => ({ mdDown: false })),
}));
jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({
    config: {},
    entityConfig: { label: "Datasets" },
  })),
}));
jest.unstable_mockModule("../src/hooks/useExploreState", () => ({
  useExploreState: jest.fn(() => ({
    exploreDispatch: jest.fn(),
    exploreState,
  })),
}));
jest.unstable_mockModule("../src/hooks/stateSyncManager/hook", () => ({
  useStateSyncManager: jest.fn(),
}));
jest.unstable_mockModule(
  "../src/views/ExploreView/hooks/UseValidateFilterParam/hook",
  () => ({ useValidateFilterParam: jest.fn() }),
);
jest.unstable_mockModule(
  "../src/views/ExploreView/hooks/UseUpdateFilterSort/hook",
  () => ({
    useUpdateFilterSort: jest.fn(() => ({
      enabled: false,
      filterSort: undefined,
      onFilterSortChange: jest.fn(),
    })),
  }),
);
jest.unstable_mockModule("../src/common/analytics/analytics", () => ({
  track: jest.fn(),
}));
jest.unstable_mockModule("../src/components/Index/indexView", () => ({
  Index: (): null => null,
}));
jest.unstable_mockModule(
  "../src/views/ExploreView/entityList/data/selector/dataSelector",
  () => ({
    DataSelector: (props: unknown): null => {
      dataSelector(props);
      return null;
    },
  }),
);

const { ExploreView } = await import("../src/views/ExploreView/exploreView");

describe("ExploreView", () => {
  beforeEach(() => {
    dataSelector.mockClear();
  });

  it("passes the page's statically loaded entities and entity list type to the data selector", () => {
    const hits = [{ id: "dataset-1" }, { id: "dataset-2" }];
    const data = {
      hits,
      pagination: { count: 2, pages: 1, size: 25, total: 2 },
      termFacets: {},
    } as unknown as AzulEntitiesResponse;

    render(<ExploreView data={data} entityListType={ENTITY_LIST_TYPE} />);

    expect(dataSelector).toHaveBeenLastCalledWith({
      data: hits,
      entityListType: ENTITY_LIST_TYPE,
    });
  });

  it("passes no entities to the data selector when the page has none, e.g. a server-side fetched list", () => {
    render(<ExploreView entityListType={ENTITY_LIST_TYPE} />);

    expect(dataSelector).toHaveBeenLastCalledWith({
      data: undefined,
      entityListType: ENTITY_LIST_TYPE,
    });
  });
});
