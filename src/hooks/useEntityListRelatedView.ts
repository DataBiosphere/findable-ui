import { useEffect } from "react";
import { SelectedFilterValue } from "../common/entities";
import { RelatedSearchResult } from "../config/entities";
import {
  ExploreActionKind,
  ListItems,
  RelatedListItems,
} from "../providers/exploreState";
import { useAsync } from "./useAsync";
import { useConfig } from "./useConfig";
import { useExploreState } from "./useExploreState";

/**
 * Returns related entity lists filtered by related search results.
 * @param listItems - Entity list items.
 * @param relatedSearchResult - Related search result.
 * @param excludedValues - Selected category values to be excluded from related entity lists.
 * @returns related entities.
 */
export function buildRelatedEntityList(
  listItems: ListItems,
  relatedSearchResult: RelatedSearchResult | undefined,
  excludedValues: SelectedFilterValue | undefined
): RelatedListItems {
  if (relatedSearchResult) {
    const { resultKey, searchKey, values } = relatedSearchResult;
    return listItems?.filter((listItem) => {
      if (values.includes(listItem[resultKey].toLowerCase())) {
        return !excludedValues?.includes(listItem[searchKey]); // Exclude any row where any of the selected category values matches the corresponding row value.
      }
    });
  }
}

/**
 * Updates related entity list.
 */
export const useEntityListRelatedView = (): void => {
  const { entityConfig } = useConfig();
  const { exploreDispatch, exploreState } = useExploreState();
  const { filterState, listItems } = exploreState;
  const { listView } = entityConfig;
  const relatedView = listView?.relatedView;
  const { relatedSearchFn, resultKey, searchKey } = relatedView || {};
  const { data: relatedSearchResult, run } = useAsync<
    RelatedSearchResult | undefined
  >();
  const selectedCategoryValues = filterState.find(
    ({ categoryKey }) => categoryKey === searchKey
  )?.value;

  useEffect(() => {
    if (relatedSearchFn) {
      run(relatedSearchFn(searchKey, resultKey, selectedCategoryValues));
    }
  }, [relatedSearchFn, resultKey, run, searchKey, selectedCategoryValues]);

  useEffect(() => {
    if (relatedSearchFn) {
      exploreDispatch({
        payload: {
          relatedListItems: buildRelatedEntityList(
            listItems,
            relatedSearchResult,
            selectedCategoryValues
          ),
        },
        type: ExploreActionKind.ProcessRelatedResponse,
      });
    }
  }, [
    exploreDispatch,
    listItems,
    relatedSearchFn,
    relatedSearchResult,
    selectedCategoryValues,
  ]);
};
