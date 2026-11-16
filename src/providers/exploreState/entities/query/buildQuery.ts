import { NextRouter } from "next/router";
import { SelectedFilter } from "../../../../common/entities";

/**
 * Builds an entity's URL query: its entity list type, and its filters when it has any.
 * @param entityListType - Entity list type.
 * @param filterState - Selected filters.
 * @returns A query object.
 */
export function buildQuery(
  entityListType: string,
  filterState: SelectedFilter[],
): NextRouter["query"] {
  if (filterState.length === 0) return { entityListType };
  return { entityListType, filter: JSON.stringify(filterState) };
}
