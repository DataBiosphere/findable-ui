import { Filters, SelectedFilter } from "../common/entities";
import { FormFacet } from "../components/Export/common/entities";
import { SiteConfig } from "../config/entities";
import { FileFacet } from "../hooks/useFileManifest/common/entities";
import { ConfigContextProps } from "../providers/config";
import { FileManifestState } from "../providers/fileManifestState";

export const CATALOG: string | undefined = "catalog";

const CATEGORY_KEY_NAME: Record<string, SelectedFilter["categoryKey"]> = {
  CATEGORY_FILES: "files",
  CATEGORY_OTHER: "other",
  CATEGORY_SPECIES: "species",
};

export const CONFIG = {
  config: { dataSource: { url: "https://mock-endpoint.com" } } as SiteConfig,
} as ConfigContextProps;

const FACET_PARTIAL: Pick<
  FileFacet,
  "selectedTerms" | "terms" | "termsByName" | "total"
> = {
  selectedTerms: [],
  terms: [],
  termsByName: new Map(),
  total: 0,
}; // `name`, `selected`, `selectedTermCount`, and `termCount` properties are not used in this test.

export const FILE_FACET: Record<string, FileFacet> = {
  FACET_FILES: {
    ...FACET_PARTIAL,
    name: CATEGORY_KEY_NAME.CATEGORY_FILES,
    selected: false,
    selectedTermCount: 0,
    termCount: 2,
  },
  FACET_OTHER: {
    ...FACET_PARTIAL,
    name: CATEGORY_KEY_NAME.CATEGORY_OTHER,
    selected: false,
    selectedTermCount: 0,
    termCount: 1,
  },
  FACET_SPECIES: {
    ...FACET_PARTIAL,
    name: CATEGORY_KEY_NAME.CATEGORY_SPECIES,
    selected: false,
    selectedTermCount: 0,
    termCount: 3,
  },
};

const FILTER_FILES: SelectedFilter = {
  categoryKey: CATEGORY_KEY_NAME.CATEGORY_FILES,
  value: ["file01", "file02"],
};

const FILTER_FILES_SUBSET: SelectedFilter = {
  categoryKey: CATEGORY_KEY_NAME.CATEGORY_FILES,
  value: ["file01"],
};

const FILTER_OTHER: SelectedFilter = {
  categoryKey: CATEGORY_KEY_NAME.CATEGORY_OTHER,
  value: ["other"],
};

const FILTER_SPECIES: SelectedFilter = {
  categoryKey: CATEGORY_KEY_NAME.CATEGORY_SPECIES,
  value: ["species01", "species02", "species03"],
};

export const FILTERS: Record<string, Filters> = {
  FORM_COMPLETE_SET: [FILTER_FILES, FILTER_OTHER, FILTER_SPECIES],
  FORM_INCOMPLETE_SET: [FILTER_FILES, FILTER_OTHER],
  FORM_INITIAL_SET: [FILTER_OTHER],
  FORM_SUBSET: [FILTER_FILES_SUBSET, FILTER_OTHER, FILTER_SPECIES],
};

export const FILE_MANIFEST_STATE = {
  filters: FILTERS.FORM_INITIAL_SET,
  isEnabled: true,
  isLoading: false,
} as FileManifestState;

export const FORM_FACET: Record<string, FormFacet> = {
  COMPLETE_SET: {
    fileSummaryFacet: {
      ...FILE_FACET.FACET_FILES,
      selected: true,
      selectedTermCount: FILE_FACET.FACET_FILES.termCount, // All terms selected.
    },
    speciesFacet: {
      ...FILE_FACET.FACET_SPECIES,
      selected: true,
      selectedTermCount: FILE_FACET.FACET_SPECIES.termCount, // All terms selected.
    },
  },
  INCOMPLETE_SET: {
    fileSummaryFacet: {
      ...FILE_FACET.FACET_FILES,
      selected: true,
      selectedTermCount: FILE_FACET.FACET_FILES.termCount, // All terms selected.
    },
    speciesFacet: FILE_FACET.FACET_SPECIES, // Species facet is unselected.
  },
  INITIAL_SET: { fileSummaryFacet: undefined, speciesFacet: undefined },
  SUBSET: {
    fileSummaryFacet: {
      ...FILE_FACET.FACET_FILES,
      selected: true,
      selectedTermCount: 1, // One of a possible two terms selected.
    },
    speciesFacet: {
      ...FILE_FACET.FACET_SPECIES,
      selected: true,
      selectedTermCount: 1, // One of a possible three terms selected.
    },
  },
};
