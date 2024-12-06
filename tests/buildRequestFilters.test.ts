import { Filters } from "../src/common/entities";
import { buildRequestFilters } from "../src/hooks/useRequestManifest/utils";
import {
  FILE_MANIFEST_STATE,
  FILTERS,
  FORM_FACET,
} from "../src/mocks/useRequestFileManifest.mocks";
import { FileManifestState } from "../src/providers/fileManifestState";

describe("buildRequestFilters", () => {
  describe("should return filters from file manifest state", () => {
    test("when form facet is not defined", () => {
      const fileManifestState = getFileManifestState(FILTERS.FORM_INITIAL_SET);
      const result = buildRequestFilters(fileManifestState, {});
      expect(result).toEqual(fileManifestState.filters);
    });

    test("when form facet `fileSummaryFacet` and `speciesFacet` are not defined", () => {
      const fileManifestState = getFileManifestState(FILTERS.FORM_INITIAL_SET);
      const result = buildRequestFilters(
        fileManifestState,
        FORM_FACET.INITIAL_SET
      );
      expect(result).toEqual(fileManifestState.filters);
    });

    test("when at least one form facet has no terms selected", () => {
      const fileManifestState = getFileManifestState(
        FILTERS.FORM_INCOMPLETE_SET
      );
      const result = buildRequestFilters(
        fileManifestState,
        FORM_FACET.INCOMPLETE_SET
      );
      expect(result).toEqual(fileManifestState.filters);
    });

    test("when at least one form facet has an unselected term", () => {
      const fileManifestState = getFileManifestState(FILTERS.FORM_SUBSET);
      const result = buildRequestFilters(fileManifestState, FORM_FACET.SUBSET);
      expect(result).toEqual(fileManifestState.filters);
    });
  });

  describe("should return filters excluding form related filters", () => {
    test("when all form facets have all their terms selected", () => {
      const fileManifestState = getFileManifestState(FILTERS.FORM_COMPLETE_SET);
      const result = buildRequestFilters(
        fileManifestState,
        FORM_FACET.COMPLETE_SET
      );
      expect(result).not.toEqual(fileManifestState.filters);
      expect(result).toEqual(FILTERS.FORM_INITIAL_SET);
    });
  });
});

/**
 * Returns a file manifest state with the given filters.
 * @param filters - Selected filters.
 * @returns file manifest state.
 */
function getFileManifestState(filters: Filters): FileManifestState {
  return {
    ...FILE_MANIFEST_STATE,
    filters,
  };
}
