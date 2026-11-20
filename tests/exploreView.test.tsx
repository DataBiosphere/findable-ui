import { jest } from "@jest/globals";
import { render } from "@testing-library/react";
import type { ExploreState } from "../src/providers/exploreState";

const CATALOG = "dcp2";
const ENTITY_LIST_TYPE = "datasets";
const OTHER_ENTITY_LIST_TYPE = "files";

const DATASETS_QUERY = { entityListType: ENTITY_LIST_TYPE };

const dataSelector = jest.fn<(props: unknown) => void>();
const exploreDispatch = jest.fn();
const useRestoreCatalogParam = jest.fn();
const useStateSyncManager =
  jest.fn<(props: { state: { query: unknown } }) => void>();

const exploreState = {
  categoryGroups: undefined,
  categoryViews: [],
  entities: {
    [ENTITY_LIST_TYPE]: { query: DATASETS_QUERY },
    [OTHER_ENTITY_LIST_TYPE]: {
      query: { entityListType: OTHER_ENTITY_LIST_TYPE },
    },
  },
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
    exploreDispatch,
    exploreState,
  })),
}));
jest.unstable_mockModule("../src/hooks/stateSyncManager/hook", () => ({
  useStateSyncManager,
}));
jest.unstable_mockModule("../src/providers/catalog/hook", () => ({
  useCatalogParam: jest.fn(() => CATALOG),
}));
jest.unstable_mockModule(
  "../src/views/ExploreView/hooks/UseRestoreCatalogParam/hook",
  () => ({ useRestoreCatalogParam }),
);
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
    useRestoreCatalogParam.mockClear();
    useStateSyncManager.mockClear();
  });

  it("passes the page's statically loaded entities and entity list type to the data selector", () => {
    const data = [{ id: "dataset-1" }, { id: "dataset-2" }];

    render(<ExploreView data={data} entityListType={ENTITY_LIST_TYPE} />);

    expect(dataSelector).toHaveBeenLastCalledWith({
      data,
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

  it("syncs the URL with the query of the page's entity list type and the selected catalog", () => {
    render(<ExploreView entityListType={ENTITY_LIST_TYPE} />);

    expect(useStateSyncManager.mock.lastCall?.[0].state.query).toEqual({
      ...DATASETS_QUERY,
      catalog: CATALOG,
    });
  });

  it("restores the selected catalog to the URL", () => {
    render(<ExploreView entityListType={ENTITY_LIST_TYPE} />);

    expect(useRestoreCatalogParam).toHaveBeenLastCalledWith(
      CATALOG,
      exploreDispatch,
    );
  });
});
