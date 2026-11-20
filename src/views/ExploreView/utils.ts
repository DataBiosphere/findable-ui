import type { StateSyncManagerContext } from "../../hooks/stateSyncManager/types";
import type { ExploreState } from "../../providers/exploreState";
import { EXPLORE_URL_PARAMS } from "../../providers/exploreState/constants";

/**
 * Builds the state sync manager context object for URL-state synchronization.
 * - Command: The meta command that signals a URL update operation is needed e.g. "STATE_TO_URL_PUSH" or "STATE_TO_URL_REPLACE".
 * - ParamKeys: Expected list of URL parameter keys that should be synchronized with state e.g. "filter", "catalog".
 * - Query: Entity related query object from state, plus the selected catalog, that should be synchronized with the URL.
 * @param exploreState - Explore state.
 * @param entityListType - Entity list type of the explore page.
 * @param catalog - Catalog selected by the URL, if any.
 * @returns The state sync manager context.
 */
export function buildStateSyncManagerContext(
  exploreState: ExploreState,
  entityListType: string,
  catalog: string | undefined,
): StateSyncManagerContext {
  const query = exploreState.entities[entityListType].query;
  return {
    command: exploreState.meta?.command,
    paramKeys: Object.values(EXPLORE_URL_PARAMS),
    query: catalog
      ? { ...query, [EXPLORE_URL_PARAMS.CATALOG]: catalog }
      : query,
  };
}
