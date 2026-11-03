import { useEffect } from "react";
import {
  AzulEntitiesResponse,
  AzulEntitiesStaticResponse,
} from "../apis/azul/common/entities";
import { EntityMapper } from "../config/entities";
import { ExploreActionKind } from "../providers/exploreState";
import { DEFAULT_PAGINATION_STATE } from "../providers/exploreState/initializer/constants";
import { useEntityService } from "./useEntityService";
import { EXPLORE_MODE } from "./useExploreMode/types";
import { useExploreMode } from "./useExploreMode/useExploreMode";
import { useExploreState } from "./useExploreState";

/**
 * Hook processing the statically loaded entities of index pages with client-side fetching and client-side filtering
 * into explore state. Server-side fetching is handled by the explore view's `SSFetchSSFilter` and `SSFetchCSFilter`
 * strategies instead.
 * @param staticResponse - Statically loaded data, if any.
 */
export const useEntityList = (
  staticResponse: AzulEntitiesStaticResponse,
): void => {
  const { data: staticData, entityListType } = staticResponse;
  const exploreMode = useExploreMode();
  const { entityMapper } = useEntityService();
  const { exploreDispatch, exploreState } = useExploreState();
  const { tabValue } = exploreState;
  const entities = getEntities(staticData);

  // Process explore response - client-side fetching and client-side filtering.
  useEffect(() => {
    if (
      !entities ||
      entityListType !== tabValue ||
      exploreMode !== EXPLORE_MODE.CS_FETCH_CS_FILTERING
    )
      return;
    exploreDispatch({
      payload: {
        listItems: mapEntities(entities, entityMapper),
        loading: false,
        paginationResponse: {
          ...DEFAULT_PAGINATION_STATE,
          pageSize: entities.length,
          rows: entities.length,
        },
      },
      type: ExploreActionKind.ProcessExploreResponse,
    });
  }, [
    entities,
    entityListType,
    entityMapper,
    exploreDispatch,
    exploreMode,
    tabValue,
  ]);
};

/**
 * Returns the entities from the static data, if there are any.
 * @param staticData - Static data.
 * @returns entities.
 */
function getEntities<T>(
  staticData?: AzulEntitiesResponse<T>,
): AzulEntitiesResponse<T>["hits"] | undefined {
  return staticData?.hits.length ? staticData.hits : undefined;
}

/**
 * Maps the entities using the given entity mapper.
 * @param entities - Entities.
 * @param entityMapper - Entity mapper.
 * @returns entities mapped using the given entity mapper.
 */
function mapEntities<T, I>(
  entities: (T | I)[],
  entityMapper?: EntityMapper<T, I>,
): T[] {
  if (entityMapper) {
    return (entities as I[]).map(entityMapper);
  }
  return entities as T[];
}
