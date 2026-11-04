import { DEFAULT_PAGINATION_STATE } from "../../../../../../../providers/exploreState/initializer/constants";
import type { ProcessExploreResponsePayload } from "../../../../../../../providers/exploreState/payloads/entities";

/**
 * Builds the explore response for the list items: loaded, and paginated as a single page of every item; filtering and
 * paging happen on the client.
 * @param listItems - List items, mapped from the fetched entities.
 * @returns Explore response payload.
 */
export function buildExploreResponse(
  listItems: unknown[],
): ProcessExploreResponsePayload {
  return {
    listItems,
    loading: false,
    paginationResponse: {
      ...DEFAULT_PAGINATION_STATE,
      pageSize: listItems.length,
      rows: listItems.length,
    },
  };
}
