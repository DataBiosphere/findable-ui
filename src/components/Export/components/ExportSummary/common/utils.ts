import { LABEL } from "../../../../../apis/azul/common/entities";
import { stringifyValues } from "../../../../../common/utils";
import {
  FileFacet,
  Term,
} from "../../../../../hooks/useFileManifest/common/entities";

/**
 * Returns a concatenation of all terms in the specified array.
 * @param terms - Terms.
 * @returns concatenated terms.
 */
export function displaySummaryTerms(terms: Term[]): string {
  if (terms && terms.length) {
    return stringifyValues(terms.map(({ name }) => name.trim()));
  } else {
    return LABEL.UNSPECIFIED;
  }
}

/**
 * Returns for a specified facet, all terms if none are selected, or the selected terms only.
 * @param fileFacet - File facet.
 * @returns terms; selected terms only or all terms if none are selected.
 */
export function getEffectiveTerms(fileFacet: FileFacet): Term[] {
  const { selected, selectedTerms, terms } = fileFacet;
  // Return an empty array if there are no terms.
  if (!terms || !terms.length) {
    return [];
  }
  // Otherwise return either the list of selected terms only, or if none are selected, the full list of terms.
  return selected ? selectedTerms : terms;
}

/**
 * Returns the effective terms for the specified facet.
 * @param fileFacets - File facets.
 * @param facetName - Facet name.
 * @returns effective terms for the given facet.
 */
export function listSelectedTermsOfFacet(
  fileFacets: FileFacet[],
  facetName: string,
): Term[] {
  if (fileFacets.length) {
    const facet = fileFacets.find(({ name }) => name === facetName);
    if (!facet) {
      return [];
    }
    return getEffectiveTerms(facet);
  } else {
    return [];
  }
}
