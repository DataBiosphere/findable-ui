import type { EntityMapper } from "../../../../../../../config/entities";
import { DEFAULT_PAGINATION_STATE } from "../../../../../../../providers/exploreState/initializer/constants";
import type { ProcessExploreResponsePayload } from "../../../../../../../providers/exploreState/payloads/entities";

/**
 * Builds the explore response for the list items: loaded, and paginated as a single page of every item; filtering and
 * paging happen on the client. Duplicated in the SSFetchCSFilter strategy on purpose: strategies don't share code, and
 * both copies are dropped once explore view 2 keeps response data out of explore state.
 * @param listItems - List items, mapped from the statically loaded entities.
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

/**
 * Maps the entities to list items with the entity mapper, or passes them through when there is none. Duplicates the
 * SSFetchCSFilter strategy's `selectEntities` on purpose: strategies don't share code, and both are dropped once explore
 * view 2 keeps response data out of explore state.
 * @param entities - Entities.
 * @param entityMapper - Entity mapper, if any.
 * @returns List items.
 */
export function mapEntities<T, I>(
  entities: unknown[],
  entityMapper?: EntityMapper<T, I>,
): unknown[] {
  return entityMapper ? (entities as I[]).map(entityMapper) : entities;
}
