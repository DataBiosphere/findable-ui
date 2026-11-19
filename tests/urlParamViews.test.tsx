import { jest } from "@jest/globals";
import { render } from "@testing-library/react";
import type { SelectedFilter } from "../src/common/entities";

const FILTER_STATE: SelectedFilter[] = [
  { categoryKey: "fileFormat", value: ["bam"] },
];

const EXPORT_CONFIG = {
  exportMethods: [],
  tabs: [{ mainColumn: [], sideColumn: undefined }],
  top: [],
};

const useUpdateURLParams = jest.fn();

jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  useRouter: jest.fn(() => ({ push: jest.fn(), query: {} })),
}));
jest.unstable_mockModule("next/navigation", () => ({
  usePathname: jest.fn(() => "/export/method"),
}));
jest.unstable_mockModule("../src/hooks/useUpdateURLParams/hook", () => ({
  useUpdateURLParams,
}));
jest.unstable_mockModule("../src/hooks/useExploreState", () => ({
  useExploreState: jest.fn(() => ({
    exploreState: { filterState: FILTER_STATE },
  })),
}));
jest.unstable_mockModule("../src/hooks/useExportConfig", () => ({
  useExportConfig: jest.fn(() => EXPORT_CONFIG),
}));
jest.unstable_mockModule("../src/hooks/useEntityExportConfig", () => ({
  useEntityExportConfig: jest.fn(() => EXPORT_CONFIG),
}));
jest.unstable_mockModule(
  "../src/hooks/useFileManifest/useFileManifest",
  () => ({
    useFileManifest: jest.fn(),
  }),
);
// The entity hasn't loaded, so the entity views render their placeholder.
jest.unstable_mockModule("../src/hooks/useFetchEntity", () => ({
  useFetchEntity: jest.fn(() => ({ response: undefined })),
}));
jest.unstable_mockModule("../src/hooks/useCurrentDetailTab", () => ({
  useCurrentDetailTab: jest.fn(() => ({ currentTab: {}, route: "" })),
}));
jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({
    entityConfig: { detail: { tabs: [] }, hideTabs: true },
  })),
}));
jest.unstable_mockModule("../src/hooks/useEntityHeadTitle", () => ({
  useEntityHeadTitle: jest.fn(),
}));
jest.unstable_mockModule(
  "../src/components/Layout/components/BackPage/backPageView",
  () => ({ BackPageView: (): null => null }),
);

const { ExportView } = await import("../src/views/ExportView/exportView");
const { ExportMethodView } =
  await import("../src/views/ExportMethodView/exportMethodView");
const { EntityDetailView } =
  await import("../src/views/EntityDetailView/entityDetailView");
const { EntityExportView } =
  await import("../src/views/EntityExportView/entityExportView");
const { EntityExportMethodView } =
  await import("../src/views/EntityExportMethodView/entityExportMethodView");

const ENTITY_VIEW_PROPS = { entityListType: "projects" };

beforeEach(() => {
  useUpdateURLParams.mockClear();
});

describe("views that keep their URL params", () => {
  it("keeps the export page's filters in its URL", () => {
    render(<ExportView />);

    expect(useUpdateURLParams).toHaveBeenLastCalledWith(FILTER_STATE);
  });

  it("keeps the export method page's filters in its URL", () => {
    render(<ExportMethodView />);

    expect(useUpdateURLParams).toHaveBeenLastCalledWith(FILTER_STATE);
  });

  it.each([
    ["entity detail", EntityDetailView],
    ["entity export", EntityExportView],
    ["entity export method", EntityExportMethodView],
  ])("keeps the %s page's params in its URL", (_, View) => {
    render(<View {...ENTITY_VIEW_PROPS} />);

    expect(useUpdateURLParams).toHaveBeenLastCalledWith();
  });
});
