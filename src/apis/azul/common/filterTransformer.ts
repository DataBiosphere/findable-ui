import {
  CategoryKey,
  Filters,
  SelectCategory,
  SelectCategoryValue,
  SelectedFilter,
} from "../../../common/entities";
import {
  PaginationIndex,
  PaginationResponse,
} from "../../../providers/exploreState";
import {
  AzulPaginationResponse,
  AzulSearchIndex,
  AzulTermFacets,
  AZUL_FILTER_OPERATOR,
  LABEL,
} from "./entities";
import { getFilterParameterValue } from "./utils";

export type ParamValue = string | boolean | null;
export type Params = Record<
  CategoryKey,
  Record<AZUL_FILTER_OPERATOR, ParamValue[]>
>;

/**
 * Transform selected categories and category values to query string format.
 * Return JSON string (for example):
 * - { file: { primarySite: { is: ["Brain"] } } }, or
 * - {} when there are no selected values.
 * @param filters - Set of selected categories and cateogry values.
 * @returns Azul-specific filter query string param.
 */
export function transformFilters(filters: Filters): string {
  // Build up filter from selected categories and category values.
  const params = filters.reduce((accum, { categoryKey, value }) => {
    // Only handling "is" operator for now.
    const operator = AZUL_FILTER_OPERATOR.IS;
    // Add the category to the filter if not already added.
    if (!accum[categoryKey]) {
      accum[categoryKey] = {
        [operator]: [],
      };
    }
    // Accumulate the category parameter values.
    accum[categoryKey][operator].push(...value.map(getFilterParameterValue));
    return accum;
  }, {} as Params);

  return JSON.stringify(params);
}

export function transformAzulPagination(
  azulPagination: AzulPaginationResponse | undefined
): PaginationResponse {
  if (!azulPagination) {
    return {
      nextIndex: null,
      pageSize: 0,
      pages: 0,
      previousIndex: null,
      rows: 0,
    };
  }
  return {
    nextIndex: extractIndex("search_after", azulPagination.next),
    pageSize: azulPagination.size,
    pages: azulPagination.pages,
    previousIndex: extractIndex("search_before", azulPagination.previous),
    rows: azulPagination.total,
  };
}

function extractIndex(
  type: AzulSearchIndex,
  urlString: string | undefined
): PaginationIndex | null {
  if (!urlString) {
    return null;
  }
  const url = new URL(urlString);
  const params = new URLSearchParams(url.search);
  return {
    type: type,
    value: params.get(type),
  };
}

/**
 * Generalize Azul term facets model into categories and category values.
 * @param termFacets - Model of term facets returned from Azul.
 * @param filterState - Filter state.
 * @returns Categories and category values built from Azul term facets.
 */
export function transformTermFacets(
  termFacets: AzulTermFacets,
  filterState: SelectedFilter[]
): SelectCategory[] {
  const categories: SelectCategory[] = [];

  // Build categories and category values from term facets.
  return Object.keys(termFacets).reduce((accum, key) => {
    const termFacet = termFacets[key];
    // Build a set of filter state category values for the category.
    const setOfFilterStateValues = new Set(
      filterState.find(({ categoryKey }) => categoryKey === key)?.value
    );

    // Build category values from terms of term facet.
    const categoryValues: SelectCategoryValue[] = termFacet.terms.map(
      (term) => {
        if (setOfFilterStateValues.has(term.term)) {
          // Delete the filter state category value; the term facet term equivalent will build the
          // select category value.
          setOfFilterStateValues.delete(term.term);
        }
        return {
          count: term.count,
          key: term.term,
          label: term.term ?? LABEL.UNSPECIFIED,
          selected: false, // Selected state updated in filter hook.
        };
      }
    );

    // Add remaining filter state category values to the category values. This allows us to maintain the selected
    // state of values that are selected but possibly filtered out from subsequent category selection.
    // Selected category values filtered out are assigned a zero count.
    for (const term of [...setOfFilterStateValues]) {
      categoryValues.push({
        count: 0,
        key: term,
        label: term ?? LABEL.UNSPECIFIED,
        selected: false, // Selected state updated in filter hook
      });
    }

    // Build category and add to set of categories.
    const category: SelectCategory = {
      key,
      label: "", // Label is applied in filter hook where it has access to the config.
      values: categoryValues,
    };
    accum.push(category);

    return accum;
  }, categories);
}
