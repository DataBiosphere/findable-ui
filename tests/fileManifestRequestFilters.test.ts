import { SelectedFilter } from "../lib/common/entities";
import { Filters } from "../src/common/entities";
import {
  FILE_MANIFEST_TYPE,
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
  {
    name: "category01",
    termCount: 2,
  },
  {
    name: "category02",
    termCount: 3,
  },
];

const FILTER_IDENTIFIER: SelectedFilter = {
  categoryKey: "identifier",
  value: ["value05"],
};

const FILTERS_COMPLETE_SET: Filters = [
  { categoryKey: "category01", value: ["value01", "value02"] },
  { categoryKey: "category02", value: ["value02", "value03", "value04"] },
];

const FILTERS_SUBSET: Filters = [
  { categoryKey: "category01", value: ["value01"] },
  { categoryKey: "category02", value: ["value02", "value03", "value04"] },
];

const FILE_MANIFEST_STATE_USER_SELECT_FILTERS: FileManifestState = {
  ...FILE_MANIFEST_STATE,
  filesFacetsStatus: FILES_FACETS_STATUS.COMPLETED,
  filters: FILTERS_SUBSET,
};

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
      expect(FILE_MANIFEST_STATE_COMPLETED.fileManifestType).toBeUndefined();
      expect(getRequestFilters(FILE_MANIFEST_STATE_COMPLETED)).toEqual([]);
    });
  });

  describe("when filters are user-selected", () => {
    describe("and fileManifestType is undefined", () => {
      test("returns user-selected filters", () => {
        expect(
          getRequestFilters(FILE_MANIFEST_STATE_USER_SELECT_FILTERS)
        ).toEqual(FILTERS_SUBSET);
      });
    });

    describe("and fileManifestType is ENTITY LIST", () => {
      test("returns user-selected filters for BULK_DOWNLOAD", () => {
        expect(
          getRequestFilters({
            ...FILE_MANIFEST_STATE_USER_SELECT_FILTERS,
            fileManifestType: FILE_MANIFEST_TYPE.BULK_DOWNLOAD,
          })
        ).toEqual(FILTERS_SUBSET);
      });

      test("returns user-selected filters for DOWNLOAD_MANIFEST", () => {
        expect(
          getRequestFilters({
            ...FILE_MANIFEST_STATE_USER_SELECT_FILTERS,
            fileManifestType: FILE_MANIFEST_TYPE.DOWNLOAD_MANIFEST,
          })
        ).toEqual(FILTERS_SUBSET);
      });

      test("returns user-selected filters for EXPORT_TO_TERRA", () => {
        expect(
          getRequestFilters({
            ...FILE_MANIFEST_STATE_USER_SELECT_FILTERS,
            fileManifestType: FILE_MANIFEST_TYPE.EXPORT_TO_TERRA,
          })
        ).toEqual(FILTERS_SUBSET);
      });
    });

    test("returns user-selected filters that are a subset of facet terms", () => {
      expect(
        getRequestFilters({
          ...FILE_MANIFEST_STATE_USER_SELECT_FILTERS,
          fileManifestType: FILE_MANIFEST_TYPE.ENTITY_BULK_DOWNLOAD, // FILE_MANIFEST_TYPE is NOT ENTITY LIST.
          filesFacets: FILES_FACETS as FileFacet[],
        })
      ).toEqual(FILTERS_SUBSET);
    });
  });

  describe("when filters are NOT user-selected", () => {
    test("returns undefined when all terms are included, and identifier filter is not defined", () => {
      expect(
        getRequestFilters({
          ...FILE_MANIFEST_STATE_USER_SELECT_FILTERS,
          fileManifestType: FILE_MANIFEST_TYPE.ENTITY_BULK_DOWNLOAD, // FILE_MANIFEST_TYPE is NOT ENTITY LIST.
          filesFacets: FILES_FACETS as FileFacet[],
          filters: FILTERS_COMPLETE_SET,
        })
      ).toBeUndefined();
    });

    test("returns identifier filter when all terms are included, and identifier filter is defined", () => {
      const filters = getRequestFilters({
        ...FILE_MANIFEST_STATE_USER_SELECT_FILTERS,
        fileManifestType: FILE_MANIFEST_TYPE.ENTITY_BULK_DOWNLOAD, // FILE_MANIFEST_TYPE is NOT ENTITY LIST.
        filesFacets: FILES_FACETS as FileFacet[],
        filters: [...FILTERS_COMPLETE_SET, FILTER_IDENTIFIER],
      });
      expect(filters?.length).toBe(1);
      expect(filters?.[0].categoryKey).toBe(FILTER_IDENTIFIER.categoryKey);
    });
  });
});
