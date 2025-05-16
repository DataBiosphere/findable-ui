import { jest } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { MANIFEST_DOWNLOAD_FORMAT } from "../src/apis/azul/common/entities";
import { FormFacet } from "../src/components/Export/common/entities";
import { METHOD } from "../src/hooks/types";
import {
  CATALOG,
  CONFIG,
  FILE_MANIFEST_STATE,
  FORM_FACET,
} from "../src/mocks/useRequestFileManifest.mocks";

jest.unstable_mockModule("../src/hooks/useConfig", () => ({
  useConfig: jest.fn(),
}));

jest.unstable_mockModule("../src/hooks/useCatalog", () => ({
  useCatalog: jest.fn(),
}));

jest.unstable_mockModule("../src/hooks/useFileManifestState", () => ({
  useFileManifestState: jest.fn(),
}));

const { useConfig } = await import("../src/hooks/useConfig");
const { useCatalog } = await import("../src/hooks/useCatalog");
const { useFileManifestState } = await import(
  "../src/hooks/useFileManifestState"
);
const { useRequestManifest } = await import(
  "../src/hooks/useRequestManifest/useRequestManifest"
);

const MOCK_USE_CATALOG = useCatalog as jest.MockedFunction<typeof useCatalog>;
const MOCK_USE_CONFIG = useConfig as jest.MockedFunction<
  () => Partial<ReturnType<typeof useConfig>>
>;
const MOCK_USE_FILE_MANIFEST_STATE =
  useFileManifestState as jest.MockedFunction<
    () => Partial<ReturnType<typeof useFileManifestState>>
  >;

describe("useRequestManifest", () => {
  beforeEach(() => {
    MOCK_USE_CATALOG.mockReset();
    MOCK_USE_CONFIG.mockReset();
    MOCK_USE_FILE_MANIFEST_STATE.mockReset();
    MOCK_USE_CATALOG.mockReturnValue(CATALOG);
    MOCK_USE_CONFIG.mockReturnValue(CONFIG);
    MOCK_USE_FILE_MANIFEST_STATE.mockReturnValue({
      fileManifestDispatch: jest.fn(),
      fileManifestState: FILE_MANIFEST_STATE,
    });
  });

  describe("useRequestManifest - always returns request method", () => {
    test("requestMethod is always METHOD.PUT regardless of conditions", () => {
      MOCK_USE_CATALOG.mockReturnValue(undefined);
      const { result } = renderHook(() =>
        useRequestManifest(undefined, FORM_FACET.INITIAL_SET)
      );
      expect(result.current.requestMethod).toEqual(METHOD.PUT);
      expect(result.current.requestParams).toBeUndefined();
      expect(result.current.requestUrl).toBeUndefined();
    });
  });

  describe("useRequestManifest - returns undefined for params and URL when", () => {
    test("catalog is not defined", () => {
      MOCK_USE_CATALOG.mockReturnValue(undefined);
      testRequestManifest({
        fileManifestFormat: MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB,
      });
    });

    describe("fileManifestFormat is not ready", () => {
      test("when fileManifestFormat is not defined", () => {
        testRequestManifest({
          fileManifestFormat: undefined,
        });
      });

      test("when fileManifestFormat is invalid", () => {
        testRequestManifest({
          fileManifestFormat: "INVALID_FORMAT" as MANIFEST_DOWNLOAD_FORMAT,
        });
      });
    });

    describe("fileManifestState is not ready", () => {
      test("when fileManifestState is not enabled", () => {
        MOCK_USE_FILE_MANIFEST_STATE.mockReturnValue({
          fileManifestDispatch: jest.fn(),
          fileManifestState: { ...FILE_MANIFEST_STATE, isEnabled: false },
        });
        testRequestManifest({
          fileManifestFormat: MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB,
        });
      });

      test("when fileManifestState is loading", () => {
        MOCK_USE_FILE_MANIFEST_STATE.mockReturnValue({
          fileManifestDispatch: jest.fn(),
          fileManifestState: { ...FILE_MANIFEST_STATE, isLoading: true },
        });
        testRequestManifest({
          fileManifestFormat: MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB,
        });
      });
    });

    describe("form selection is not ready", () => {
      test("when a form facet is undefined", () => {
        testRequestManifest({
          fileManifestFormat: MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB,
          formFacet: {},
        });
      });

      test("when a form facet `fileSummaryFacet` and `speciesFacet` are not defined", () => {
        testRequestManifest({
          fileManifestFormat: MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB,
          formFacet: FORM_FACET.INITIAL_SET,
        });
      });

      test("when a form facet is not selected", () => {
        testRequestManifest({
          fileManifestFormat: MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB,
          formFacet: FORM_FACET.INCOMPLETE_SET,
        });
      });
    });
  });

  describe("useRequestManifest - returns the request manifest object when all conditions are met", () => {
    test("and at least one form facet has an unselected term", () => {
      const { result } = renderHook(() =>
        useRequestManifest(
          MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB,
          FORM_FACET.SUBSET
        )
      );
      expect(result.current.requestMethod).toEqual(METHOD.PUT);
      expect(result.current.requestParams).toBeDefined();
      expect(result.current.requestUrl).toBeDefined();
    });

    test("and all form facets have all their terms selected", () => {
      const { result } = renderHook(() =>
        useRequestManifest(
          MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB,
          FORM_FACET.COMPLETE_SET
        )
      );
      expect(result.current.requestMethod).toEqual(METHOD.PUT);
      expect(result.current.requestParams).toBeDefined();
      expect(result.current.requestUrl).toBeDefined();
    });
  });
});

/**
 * Utility function to test the behavior of the `useRequestManifest` hook.
 * This function renders the `useRequestManifest` hook with the provided arguments
 * and asserts the expected values for `requestMethod`, `requestParams`, and `requestUrl`.
 * @param testObject - Object containing the expected values for `requestMethod`, `requestParams`, and `requestUrl`.
 * @param testObject.expectedMethod - The expected request method.
 * @param testObject.expectedParams - The expected request parameters.
 * @param testObject.expectedUrl - The expected request URL.
 * @param testObject.fileManifestFormat - The file manifest format.
 * @param testObject.formFacet - Form facet.
 */
function testRequestManifest({
  expectedMethod = METHOD.PUT,
  expectedParams = undefined,
  expectedUrl = undefined,
  fileManifestFormat,
  formFacet = FORM_FACET.COMPLETE_SET,
}: {
  expectedMethod?: METHOD;
  expectedParams?: URLSearchParams;
  expectedUrl?: string;
  fileManifestFormat?: MANIFEST_DOWNLOAD_FORMAT;
  formFacet?: FormFacet;
}): void {
  const { result } = renderHook(() =>
    useRequestManifest(fileManifestFormat, formFacet)
  );
  expect(result.current.requestMethod).toEqual(expectedMethod);
  expect(result.current.requestParams).toEqual(expectedParams);
  expect(result.current.requestUrl).toEqual(expectedUrl);
}
