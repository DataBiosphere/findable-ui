import {
  MANIFEST_DOWNLOAD_FORMAT,
  ManifestDownloadFormat,
} from "../src/apis/azul/common/entities";
import { transformFilters } from "../src/apis/azul/common/filterTransformer";
import { Filters } from "../src/common/entities";
import { METHOD } from "../src/hooks/types";
import { buildRequestManifest } from "../src/hooks/useRequestManifest/utils";
import { FILTERS } from "../src/mocks/useRequestFileManifest.mocks";

const ENDPOINT_URL = "https://example.com/";
const CATALOG = "test-catalog";
const MANIFEST_FORMAT = MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB;

describe("buildRequestManifest", () => {
  test("should return request method 'PUT'", () => {
    const result = buildRequestManifest(
      ENDPOINT_URL,
      CATALOG,
      FILTERS.FORM_SUBSET,
      MANIFEST_FORMAT,
    );
    expect(result.requestMethod).toEqual(METHOD.PUT);
  });

  test("should return defined request params and request url", () => {
    const result = buildRequestManifest(
      ENDPOINT_URL,
      CATALOG,
      FILTERS.FORM_SUBSET,
      MANIFEST_FORMAT,
    );
    expect(result.requestParams).toBeDefined();
    expect(result.requestUrl).toBeDefined();
  });

  test("should return request params with entries 'catalog', 'filters' and 'format'", () => {
    const result = buildRequestManifest(
      ENDPOINT_URL,
      CATALOG,
      FILTERS.FORM_SUBSET,
      MANIFEST_FORMAT,
    );
    // Assert that the requestParams contains the required keys.
    expect(result.requestParams?.has("catalog")).toBeTruthy();
    expect(result.requestParams?.has("filters")).toBeTruthy();
    expect(result.requestParams?.has("format")).toBeTruthy();
    // // Assert the values of these keys.
    expect(result.requestParams?.get("catalog")).toEqual(CATALOG);
    expect(result.requestParams?.get("filters")).toEqual(
      transformFilters(FILTERS.FORM_SUBSET),
    );
    expect(result.requestParams?.get("format")).toEqual(MANIFEST_FORMAT);
  });

  test("should return expected request URL", () => {
    const result = buildRequestManifest(
      ENDPOINT_URL,
      CATALOG,
      FILTERS.FORM_INITIAL_SET,
      MANIFEST_FORMAT,
    );
    const expectedParams = getExpectedParams(
      CATALOG,
      FILTERS.FORM_INITIAL_SET,
      MANIFEST_FORMAT,
    );
    const expectedUrl = getExpectedUrl(expectedParams);
    expect(result.requestUrl).toEqual(expectedUrl);
  });
});

/**
 * Returns the expected URLSearchParams for the given parameters.
 * @param catalog - Catalog.
 * @param filters - Selected filters.
 * @param manifestFormat - Manifest format.
 * @returns URLSearchParams.
 */
function getExpectedParams(
  catalog: string,
  filters: Filters,
  manifestFormat: ManifestDownloadFormat,
): URLSearchParams {
  return new URLSearchParams({
    catalog,
    filters: transformFilters(filters),
    format: manifestFormat,
  });
}

/**
 * Returns the expected URL for the given parameters.
 * @param expectedParams - Expected URLSearchParams.
 * @param endpointUrl - Data URL.
 * @returns expected URL.
 */
function getExpectedUrl(
  expectedParams: URLSearchParams,
  endpointUrl: string = ENDPOINT_URL,
): string {
  return `${endpointUrl}fetch/manifest/files?${expectedParams.toString()}`;
}
