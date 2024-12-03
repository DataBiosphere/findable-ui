import { Filters, SelectedFilter } from "../src/common/entities";
import {
  FileFacet,
  FILES_FACETS_STATUS,
} from "../src/hooks/useFileManifest/common/entities";
import { FileManifestState } from "../src/providers/fileManifestState";
import { FILE_MANIFEST_STATE } from "../src/providers/fileManifestState/constants";
import { getRequestFilters } from "../src/providers/fileManifestState/utils";

const FILE_MANIFEST_STATE_NOT_STARTED: FileManifestState = {
  ...FILE_MANIFEST_STATE,
  filesFacetsStatus: FILES_FACETS_STATUS.NOT_STARTED,
};

const FILE_MANIFEST_STATE_IN_PROGRESS: FileManifestState = {
  ...FILE_MANIFEST_STATE,
  filesFacetsStatus: FILES_FACETS_STATUS.IN_PROGRESS,
};

const FILE_MANIFEST_STATE_COMPLETED: FileManifestState = {
  ...FILE_MANIFEST_STATE,
  filesFacetsStatus: FILES_FACETS_STATUS.COMPLETED,
};

const FILES_FACETS: Partial<FileFacet>[] = [
  { name: "category01", termCount: 2 },
  { name: "category02", termCount: 3 },
  { name: "category03", termCount: 1 },
];

const SELECTED_FILTER_ENTITY_LIST: SelectedFilter = {
  categoryKey: "category03",
  value: ["value05"],
};

const SELECTED_FILTERS: Filters = [SELECTED_FILTER_ENTITY_LIST]; // Filters pre-selected i.e. entity list selected filters, or entity ID filter.

const SELECTED_FILTERS_FORM_COMPLETE_SET: Filters = [
  { categoryKey: "category01", value: ["value01", "value02"] },
  { categoryKey: "category02", value: ["value02", "value03", "value04"] },
];

const SELECTED_FILTERS_FORM_SUBSET: Filters = [
  { categoryKey: "category01", value: ["value01"] },
  { categoryKey: "category02", value: ["value02", "value03", "value04"] },
];

const FILTERS_COMPLETE_SET: Filters = [
  ...SELECTED_FILTERS,
  ...SELECTED_FILTERS_FORM_COMPLETE_SET,
];

const FILTERS_SUBSET: Filters = [
  ...SELECTED_FILTERS,
  ...SELECTED_FILTERS_FORM_SUBSET,
];

const FORM_FACET_NAMES: FileFacet["name"][] = ["category01", "category02"];

describe("fileManifestRequestFilters", () => {
  describe("when filters and facets are undefined or empty", () => {
    test("returns undefined for empty filters and facets", () => {
      expect(
        getRequestFilters({
          ...FILE_MANIFEST_STATE,
        })
      ).toBeUndefined();
    });
  });

  describe("when checking filesFacetsStatus", () => {
    test("returns undefined when status is NOT_STARTED", () => {
      expect(
        getRequestFilters(FILE_MANIFEST_STATE_NOT_STARTED)
      ).toBeUndefined();
    });

    test("returns undefined when status is IN_PROGRESS", () => {
      expect(
        getRequestFilters(FILE_MANIFEST_STATE_IN_PROGRESS)
      ).toBeUndefined();
    });

    test("returns request filters when status is COMPLETED", () => {
      expect(
        getRequestFilters({
          ...FILE_MANIFEST_STATE_COMPLETED,
          setOfFormFacetNames: new Set(FORM_FACET_NAMES),
        })
      ).toEqual(FILE_MANIFEST_STATE_COMPLETED.filters);
    });
  });

  describe("when form terms are not-selected", () => {
    test("returns undefined", () => {
      expect(
        getRequestFilters({
          ...FILE_MANIFEST_STATE_COMPLETED,
          filesFacets: FILES_FACETS as FileFacet[],
        })
      ).toBeUndefined();
    });
  });

  describe("when form terms are partially-selected", () => {
    test("returns complete set of user-selected filters", () => {
      expect(
        getRequestFilters({
          ...FILE_MANIFEST_STATE_COMPLETED,
          filesFacets: FILES_FACETS as FileFacet[],
          filters: FILTERS_SUBSET,
          setOfFormFacetNames: new Set(FORM_FACET_NAMES),
        })
      ).toEqual(FILTERS_SUBSET);
    });
  });

  describe("when form terms are fully-selected", () => {
    test("returns a subset of user-selected filters", () => {
      expect(
        getRequestFilters({
          ...FILE_MANIFEST_STATE_COMPLETED,
          filesFacets: FILES_FACETS as FileFacet[],
          filters: FILTERS_COMPLETE_SET,
          setOfFormFacetNames: new Set(FORM_FACET_NAMES),
        })
      ).toEqual(SELECTED_FILTERS);
    });
  });
});
