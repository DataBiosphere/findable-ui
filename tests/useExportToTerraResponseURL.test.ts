import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { MANIFEST_DOWNLOAD_FORMAT } from "../src/apis/azul/common/entities";
import { buildExportToTerraUrl } from "../src/components/Export/common/utils";
import type { SiteConfig } from "../src/config/entities";
import type { FileLocation } from "../src/hooks/useRequestFileLocation";

jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(),
}));

const { useConfig } = await import("../src/hooks/useConfig");
const { useExportToTerraResponseURL } =
  await import("../src/hooks/useExportToTerraResponseURL");

const MOCK_USE_CONFIG = useConfig as jest.MockedFunction<typeof useConfig>;

const EXPORT_TO_TERRA_URL = "https://app.terra.bio/";
const FILE_LOCATION: FileLocation = {
  location: "https://service.azul.data/manifest/files",
  status: 302,
};
const REQUEST_PARAMS = new URLSearchParams({
  format: MANIFEST_DOWNLOAD_FORMAT.TERRA_PFB,
});

/**
 * Mocks useConfig to return the given site config.
 * @param config - Site config returned by useConfig.
 */
function mockConfig(config: Partial<SiteConfig>): void {
  MOCK_USE_CONFIG.mockReturnValue({ config } as ReturnType<typeof useConfig>);
}

describe("useExportToTerraResponseURL", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    MOCK_USE_CONFIG.mockReset();
  });

  it("throws when the file location is returned without a configured exportToTerraUrl", () => {
    mockConfig({});
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() =>
      renderHook(() =>
        useExportToTerraResponseURL(REQUEST_PARAMS, FILE_LOCATION),
      ),
    ).toThrow(/exportToTerraUrl/);
  });

  it("returns undefined before the file location is returned without a configured exportToTerraUrl", () => {
    mockConfig({});
    const { result } = renderHook(() =>
      useExportToTerraResponseURL(REQUEST_PARAMS, undefined),
    );
    expect(result.current).toBeUndefined();
  });

  it("returns the export to Terra URL with a configured exportToTerraUrl", () => {
    mockConfig({ exportToTerraUrl: EXPORT_TO_TERRA_URL });
    const { result } = renderHook(() =>
      useExportToTerraResponseURL(REQUEST_PARAMS, FILE_LOCATION),
    );
    expect(result.current).toBe(
      buildExportToTerraUrl(
        EXPORT_TO_TERRA_URL,
        REQUEST_PARAMS,
        FILE_LOCATION.location,
      ),
    );
  });

  it("returns undefined when the request params are missing with a configured exportToTerraUrl", () => {
    mockConfig({ exportToTerraUrl: EXPORT_TO_TERRA_URL });
    const { result } = renderHook(() =>
      useExportToTerraResponseURL(undefined, FILE_LOCATION),
    );
    expect(result.current).toBeUndefined();
  });
});
