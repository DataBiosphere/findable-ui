import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";

const EXPLORE_LIST = "files";

const onRequestManifest: { current?: () => void } = {};
const run = jest.fn();
const trackBulkDownloadRequested = jest.fn();
const trackDatasetExportToTerraRequested = jest.fn();
const trackExportToTerraRequested = jest.fn();
const trackFileManifestRequested = jest.fn();

/**
 * Stands in for a "not started" export component, keeping its request callback.
 * @param props - Component props.
 * @param props.onRequestManifest - Callback that requests the manifest.
 * @returns Nothing.
 */
function NotStarted(props: { onRequestManifest: () => void }): null {
  onRequestManifest.current = props.onRequestManifest;
  return null;
}

jest.unstable_mockModule("../src/providers/exploreList/hook", () => ({
  useExploreList: jest.fn(() => EXPLORE_LIST),
}));
jest.unstable_mockModule(
  "../src/hooks/useFileManifest/useFileManifestFileCount",
  () => ({ useFileManifestFileCount: jest.fn() }),
);
jest.unstable_mockModule(
  "../src/hooks/useFileManifest/useFileManifestFormat",
  () => ({
    useFileManifestFormat: jest.fn(() => ({ fileManifestFormat: undefined })),
  }),
);
jest.unstable_mockModule(
  "../src/hooks/useRequestManifest/useRequestManifest",
  () => ({
    useRequestManifest: jest.fn(() => ({
      requestMethod: "GET",
      requestParams: undefined,
      requestUrl: undefined,
    })),
  }),
);
jest.unstable_mockModule("../src/hooks/useRequestFileLocation", () => ({
  useRequestFileLocation: jest.fn(() => ({
    data: undefined,
    isLoading: false,
    run,
  })),
}));
jest.unstable_mockModule("../src/hooks/useExportToTerraResponseURL", () => ({
  useExportToTerraResponseURL: jest.fn(() => undefined),
}));
jest.unstable_mockModule("../src/components/Export/common/tracking", () => ({
  trackBulkDownloadRequested,
  trackDatasetExportToTerraRequested,
  trackExportToTerraRequested,
  trackFileManifestRequested,
}));
jest.unstable_mockModule(
  "../src/components/Export/components/ManifestDownload/components/ManifestDownloadNotStarted/manifestDownloadNotStarted",
  () => ({ ManifestDownloadNotStarted: NotStarted }),
);
jest.unstable_mockModule(
  "../src/components/Export/components/DownloadCurlCommand/components/DownloadCurlCommandNotStarted/downloadCurlCommandNotStarted",
  () => ({ DownloadCurlCommandNotStarted: NotStarted }),
);
jest.unstable_mockModule(
  "../src/components/Export/components/ExportToTerra/components/ExportToTerraNotStarted/exportToTerraNotStarted",
  () => ({ ExportToTerraNotStarted: NotStarted }),
);
jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(() => ({
    entityConfig: { route: "samples", ui: { enableExportButton: true } },
  })),
}));
jest.unstable_mockModule("../src/hooks/useDownloadStatus", () => ({
  useDownloadStatus: jest.fn(() => ({
    disabled: false,
    isLoading: false,
    message: "",
  })),
}));

const { ManifestDownload } =
  await import("../src/components/Export/components/ManifestDownload/manifestDownload");
const { DownloadCurlCommand } =
  await import("../src/components/Export/components/DownloadCurlCommand/downloadCurlCommand");
const { ExportToTerra } =
  await import("../src/components/Export/components/ExportToTerra/exportToTerra");
const { ExportButton } =
  await import("../src/components/Index/components/EntityView/components/controls/ExportButton/exportButton");
const { createAppTheme } = await import("../src/theme/theme");

// The export components' props aren't read by these tests: their children are stand-ins.
const PROPS = {} as any;

beforeEach(() => {
  onRequestManifest.current = undefined;
  jest.clearAllMocks();
});

describe("export analytics", () => {
  it("ManifestDownload tracks the explore list when a manifest is requested", () => {
    render(<ManifestDownload {...PROPS} />);

    onRequestManifest.current?.();

    expect(trackFileManifestRequested).toHaveBeenCalledWith(EXPLORE_LIST);
  });

  it("DownloadCurlCommand tracks the explore list when a command is requested", () => {
    render(<DownloadCurlCommand {...PROPS} />);

    onRequestManifest.current?.();

    expect(trackBulkDownloadRequested).toHaveBeenCalledWith(
      EXPLORE_LIST,
      expect.anything(),
    );
  });

  it("ExportToTerra tracks the explore list when an export is requested", () => {
    render(<ExportToTerra {...PROPS} />);

    onRequestManifest.current?.();

    expect(trackExportToTerraRequested).toHaveBeenCalledWith(EXPLORE_LIST);
  });
});

describe("ExportButton", () => {
  it("links to the export page with the explore page's entity list type, not the provider's explore list", () => {
    render(
      <ThemeProvider theme={createAppTheme()}>
        <ExportButton />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole("link", { name: "Export" }).getAttribute("href"),
    ).toBe("/export?list=samples");
  });
});
