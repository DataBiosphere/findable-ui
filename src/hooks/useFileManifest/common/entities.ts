import { AzulSummaryResponse } from "../../../apis/azul/common/entities";
import { CategoryKey } from "../../../common/entities";

/**
 * Model of data returned from entity end points, including:
 * - the current set of selected facets, as well as facet terms and their corresponding counts.
 */
export interface EntitySearchResults {
  facets: FileFacet[];
}

export interface FetchFilesFacets {
  filesFacets: FileFacet[];
  isLoading: boolean;
  isSuccess: boolean;
}

export interface FetchFileSummary {
  isLoading: boolean;
  summary?: AzulSummaryResponse;
}

/**
 * Model of a facet that contains a list of terms values.
 */
export interface FileFacet {
  name: string;
  selected: boolean; // true if any terms are selected
  selectedTermCount: number; // number of selected terms
  selectedTerms: Term[];
  termCount: number; // number of terms available
  terms: Term[];
  termsByName: TermsByName;
  total: number;
}

export enum FILE_MANIFEST_TYPE {
  BULK_DOWNLOAD = "BULK_DOWNLOAD",
  DOWNLOAD_MANIFEST = "DOWNLOAD_MANIFEST",
  ENTITY_BULK_DOWNLOAD = "ENTITY_BULK_DOWNLOAD",
  ENTITY_DOWNLOAD_MANIFEST = "ENTITY_DOWNLOAD_MANIFEST",
  ENTITY_EXPORT_TO_TERRA = "ENTITY_EXPORT_TO_TERRA",
  EXPORT_TO_TERRA = "EXPORT_TO_TERRA",
}

export type FileManifestType = FILE_MANIFEST_TYPE;

export type SelectedSearchTermsBySearchKey = Map<CategoryKey, Set<unknown>>;

/**
 * Model of an individual facet value. For example, the term "Homo Sapiens" contained in the facet "Species".
 */
export interface Term {
  count: number;
  name: string;
  selected: boolean;
}

export type TermsByName = Map<string, Term>;
