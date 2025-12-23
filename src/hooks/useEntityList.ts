import { useEffect } from "react";
import { AzulEntitiesResponse } from "../apis/azul/common/entities";
import { EntityMapper } from "../config/entities";
import { getEntityConfig } from "../config/utils";
import { ExploreActionKind } from "../providers/exploreState";
import { DEFAULT_PAGINATION_STATE } from "../providers/exploreState/initializer/constants";
import { useToken } from "./authentication/token/useToken";
import { useAsync } from "./useAsync";
import { useConfig } from "./useConfig";
import { useEntityService } from "./useEntityService";
import { EXPLORE_MODE, ExploreMode } from "./useExploreMode/types";
import { useExploreMode } from "./useExploreMode/useExploreMode";
import { useExploreState } from "./useExploreState";
import { ExploreViewProps } from "../views/ExploreView/types";

/**
 * Hook handling the load and transformation of the values used by index pages. If the current entity loaded statically,
 * this hook will return the already loaded data. Otherwise, it will make a request for the entity's pathUrl.
 * @param props - ExploreView component props.
 * @returns Model of the entities list including pagination, sort, filter and loading indicator.
 */
export const useEntityList = (props: ExploreViewProps): void => {
  const { data: staticData, entityListType } = props;
  const { token } = useToken();
  const { config } = useConfig();
  const { apiPath } = getEntityConfig(config.entities, entityListType);
  const exploreMode = useExploreMode();
  const { entityMapper, fetchAllEntities, path } = useEntityService();
  const { exploreDispatch, exploreState } = useExploreState();
  const { data, run } = useAsync<AzulEntitiesResponse>();
  const { tabValue } = exploreState;
  const entities = getEntities(staticData, data);
  const shouldDispatchResponse = isDispatchable(
    exploreMode,
    data?.apiPath === apiPath,
    entityListType === tabValue,
  );

  // Fetch entities - server-side fetching and client-side filtering.
  useEffect(() => {
    if (exploreMode === EXPLORE_MODE.SS_FETCH_CS_FILTERING) {
      run(fetchAllEntities(path, token));
    }
  }, [exploreMode, fetchAllEntities, path, run, token]);

  // Process explore response - server-side or client-side fetching and client-side filtering.
  useEffect(() => {
    if (!entities) return;
    if (!shouldDispatchResponse) return;
    if (
      exploreMode === EXPLORE_MODE.SS_FETCH_CS_FILTERING ||
      exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING
    ) {
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
    }
  }, [
    entities,
    entityMapper,
    exploreDispatch,
    exploreMode,
    shouldDispatchResponse,
  ]);
};

/**
 * Returns the entities from the static data if present, otherwise returns the entities from the server data.
 * @param staticData - Static data.
 * @param serverData - Server data.
 * @returns entities.
 */
function getEntities<T = unknown>(
  staticData?: ExploreViewProps<T>["data"],
  serverData?: AzulEntitiesResponse<T>,
): T[] | undefined {
  if (staticData && staticData.length > 0) {
    return staticData;
  }
  return serverData?.hits;
}

/**
 * Returns true if the response should be dispatched for the given explore mode.
 * @param exploreMode - Explore mode.
 * @param shouldDispatchServerResponse - Boolean indicating whether the server response should be dispatched.
 * @param shouldDispatchStaticResponse - Boolean indicating whether the static response should be dispatched.
 * @returns true if the response should be dispatched.
 */
function isDispatchable(
  exploreMode: ExploreMode,
  shouldDispatchServerResponse: boolean,
  shouldDispatchStaticResponse: boolean,
): boolean {
  return exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING
    ? shouldDispatchStaticResponse
    : shouldDispatchServerResponse;
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
