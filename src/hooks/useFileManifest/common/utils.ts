import {
  AzulEntitiesResponse,
  AzulTerm,
  AzulTermFacet,
  AzulTermFacets,
  LABEL,
} from "../../../apis/azul/common/entities";
import { COLLATOR_CASE_INSENSITIVE } from "../../../common/constants";
import { Filters } from "../../../common/entities";
import {
  EntitySearchResults,
  FileFacet,
  SelectedSearchTermsBySearchKey,
  Term,
  TermsByName,
} from "./entities";

/**
 * Parse the entity API response and build up entity search results.
 * @param entityResponse - Response model return from the given entity API.
 * @param filters - Selected filters.
 * @returns entity search results.
 */
export function bindEntitySearchResultsResponse(
  entityResponse: AzulEntitiesResponse | undefined,
  filters: Filters,
): EntitySearchResults {
  // Grab the search terms by search key
  const searchTermsBySearchKey = getSelectedSearchTermsBySearchKey(filters);
  // Build up term facets
  const facets = bindFacets(searchTermsBySearchKey, entityResponse?.termFacets);
  return {
    facets,
  };
}

/**
 * Map files API response into FileFacet objects, maintaining selected state of terms. This is specifically for
 * facets returned from the backend (which are facets with a corresponding list of terms) and not other types of
 * facets, for example, facets with a selected range.
 * TODO age range facet to be added, if required.
 * @param searchTermsBySearchKey - Selected search terms by search key.
 * @param responseFacetsByName - Facets returned from the API response.
 * @returns file facets.
 */
function bindFacets(
  searchTermsBySearchKey: SelectedSearchTermsBySearchKey,
  responseFacetsByName: AzulTermFacets | undefined,
): FileFacet[] {
  if (!responseFacetsByName) {
    return [];
  }
  return Object.keys(responseFacetsByName).map((facetName) => {
    return buildFileFacet(
      facetName,
      searchTermsBySearchKey,
      responseFacetsByName[facetName],
    );
  });
}

/**
 * Create a set of terms from the terms returned in the response. Maintain selected state of terms from current set
 * of search terms.
 * @param facetName - Facet name.
 * @param responseTerms - Response terms.
 * @param searchTermNames - Selected search term names.
 * @returns response terms with selected state.
 */
function bindFacetTerms(
  facetName: string,
  responseTerms: AzulTerm[],
  searchTermNames: unknown[],
): Term[] {
  return responseTerms.reduce((accum: Term[], responseTerm) => {
    // Default term name to "Unspecified" if term name is null.
    const name = bindTermName(responseTerm);
    // Determine if term is currently selected as a search term.
    const selected = searchTermNames.indexOf(responseTerm.term) >= 0;
    // Create new term - default name to "Unspecified" if no value is returned.
    accum.push({ count: responseTerm.count, name, selected });
    return accum;
  }, []);
}

/**
 * Update term name returned from response, if null. Otherwise, return term name as is.
 * @param termResponse - Term response.
 * @returns term name, or "Unspecified" if term name is null.
 */
function bindTermName(termResponse: AzulTerm): string {
  return termResponse.term === null ? LABEL.UNSPECIFIED : termResponse.term;
}

/**
 * Build up file facet from response facet values, matching with current selected state of terms.
 * @param facetName - Facet name.
 * @param searchTermsBySearchKey - Selected search terms by search key.
 * @param responseFacet - Response facet of the given facet name.
 * @returns something.
 */
function buildFileFacet(
  facetName: string,
  searchTermsBySearchKey: SelectedSearchTermsBySearchKey,
  responseFacet: AzulTermFacet,
): FileFacet {
  // Determine the set of currently selected search term names for this facet.
  const searchTermNames = listFacetSearchTermNames(
    facetName,
    searchTermsBySearchKey,
  );
  // Build up the list of terms from the facet response.
  const responseTerms = bindFacetTerms(
    facetName,
    responseFacet.terms,
    searchTermNames,
  );
  // Create facet from newly built terms and newly calculated total.
  return getFileFacet(facetName, responseFacet.total || 0, responseTerms);
}

/**
 * Returns file facet for the given facet name.
 * @param filesFacets - Files facets.
 * @param facetName - Facet name.
 * @returns file facet.
 */
export function findFacet(
  filesFacets: FileFacet[],
  facetName: string,
): FileFacet | undefined {
  return filesFacets.find(({ name }) => name === facetName);
}

/**
 * Returns file facet that contains a list of terms values from given facet name, total, and terms.
 * @param name - Facet name.
 * @param total - Total number of terms.
 * @param terms - List of terms.
 * @returns file facet.
 */
export function getFileFacet(
  name: string,
  total: number,
  terms: Term[],
): FileFacet {
  const selectedTerms = terms.filter(({ selected }) => selected);
  const selected = selectedTerms.length > 0;
  const termsByName: TermsByName = terms.reduce((acc, term) => {
    return acc.set(term.name, term);
  }, new Map());
  const termCount = terms.length;
  const selectedTermCount = selectedTerms.length;
  return {
    name,
    selected,
    selectedTermCount,
    selectedTerms,
    termCount,
    terms,
    termsByName,
    total,
  };
}

/**
 * Returns map of selected search terms by search key.
 * @param filters - Selected filters.
 * @returns map of selected search terms by search key.
 */
export function getSelectedSearchTermsBySearchKey(
  filters: Filters,
): SelectedSearchTermsBySearchKey {
  const selectedSearchTermsBySearchKey: SelectedSearchTermsBySearchKey =
    new Map();
  for (const { categoryKey, value } of filters) {
    selectedSearchTermsBySearchKey.set(categoryKey, new Set(value));
  }
  return selectedSearchTermsBySearchKey;
}

/**
 * Returns true if the file facet term name is selected.
 * @param fileFacet - File facet.
 * @param termName - Term name.
 * @returns true if the file facet term name is selected.
 */
export function isFacetTermSelected(
  fileFacet: FileFacet,
  termName: string,
): boolean {
  return Boolean(
    fileFacet.terms.find((term) => term.name === termName)?.selected,
  );
}

/**
 * Returns the selected search terms for the specified facet, if any.
 * @param {string} facetName - Facet name.
 * @param searchTermsBySearchKey - Selected search terms by search key.
 * @returns selected search terms.
 */
function listFacetSearchTermNames(
  facetName: string,
  searchTermsBySearchKey: SelectedSearchTermsBySearchKey,
): unknown[] {
  return [...(searchTermsBySearchKey.get(facetName) ?? [])];
}

/**
 * Sorts terms by term name.
 * @param c0 - First term to compare.
 * @param c1 - Second term to compare.
 * @returns Number indicating sort precedence of c0 vs c1.
 */
export function sortTerms(c0: Term, c1: Term): number {
  return COLLATOR_CASE_INSENSITIVE.compare(c0.name, c1.name);
}
