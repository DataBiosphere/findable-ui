import { useEffect } from "react";
import {
  AzulEntitiesResponse,
  AzulEntitiesStaticResponse,
  AzulListParams,
} from "../apis/azul/common/entities";
import {
  transformAzulPagination,
  transformFilters,
  transformTermFacets,
} from "../apis/azul/common/filterTransformer";
import { EntityMapper } from "../config/entities";
import { getEntityConfig } from "../config/utils";
import { ExploreActionKind } from "../providers/exploreState";
import { DEFAULT_PAGINATION_STATE } from "../providers/exploreState/initializer/constants";
import { useToken } from "./authentication/token/useToken";
import { useAsync } from "./useAsync";
import { useConfig } from "./useConfig";
import { useEntityService } from "./useEntityService";
import { EXPLORE_MODE, ExploreMode, useExploreMode } from "./useExploreMode";
import { useExploreState } from "./useExploreState";
import { useURLFilterParams } from "./useURLFilterParams";

/**
 * Hook handling the load and transformation of the values used by index pages. If the current entity loaded statically,
 * this hook will return the already loaded data. Otherwise, it will make a request for the entity's pathUrl.
 * @param staticResponse - Statically loaded data, if any.
 * @returns Model of the entities list including pagination, sort, filter and loading indicator.
 */
export const useEntityList = (
  staticResponse: AzulEntitiesStaticResponse
): void => {
  const { data: staticData, entityListType } = staticResponse;
  const { token } = useToken();
  const { config } = useConfig();
  const { apiPath } = getEntityConfig(config.entities, entityListType);
  const exploreMode = useExploreMode();
  const {
    catalog,
    entityMapper,
    fetchAllEntities,
    fetchEntitiesFromQuery,
    path,
  } = useEntityService();
  const { exploreDispatch, exploreState } = useExploreState();
  const { data, isIdle, isLoading, run } = useAsync<AzulEntitiesResponse>();
  const {
    catalogState,
    entityPageState,
    featureFlagState,
    filterState,
    tabValue,
  } = exploreState;
  const { pagination, termFacets } = data || {};
  const { updateFilterQueryString } = useURLFilterParams();
  const { sorting } = entityPageState[tabValue];
  const entities = getEntities(staticData, data);
  const shouldDispatchResponse = isDispatchable(
    exploreMode,
    data?.apiPath === apiPath,
    entityListType === tabValue
  );
  const isFetching = isIdle || isLoading;

  // Update the filter query string when the filter state changes.
  useEffect(() => {
    updateFilterQueryString(catalogState, featureFlagState, filterState);
  }, [catalogState, featureFlagState, filterState, updateFilterQueryString]);

  // Fetch entities - on change of filter state - server-side fetching and server-side filtering.
  useEffect(() => {
    if (exploreMode === EXPLORE_MODE.SS_FETCH_SS_FILTERING) {
      // Build basic list params
      const [sort] = sorting;
      const listParams: AzulListParams = sort
        ? { order: sort.desc ? "desc" : "asc", sort: sort.id }
        : {};

      // Build filter query params, if any
      const filtersParam = transformFilters(filterState);
      if (filtersParam) {
        listParams.filters = filtersParam;
      }

      if (
        exploreState.paginationState?.index?.type &&
        exploreState.paginationState.index.value
      ) {
        listParams[exploreState.paginationState.index.type] =
          exploreState.paginationState.index.value;
      }

      // Execute the fetch.
      run(fetchEntitiesFromQuery(path, listParams, catalog, token));
    }
  }, [
    catalog,
    exploreMode,
    exploreState.paginationState.index,
    fetchEntitiesFromQuery,
    filterState,
    path,
    run,
    sorting,
    token,
  ]);

  // Process explore response - on change of filter state - server-side fetching and server-side filtering.
  useEffect(() => {
    if (!termFacets) return;
    if (!shouldDispatchResponse) return;
    if (exploreMode === EXPLORE_MODE.SS_FETCH_SS_FILTERING) {
      exploreDispatch({
        payload: {
          listItems: entities,
          loading: isFetching,
          paginationResponse: transformAzulPagination(pagination),
          selectCategories: transformTermFacets(termFacets, filterState),
        },
        type: ExploreActionKind.ProcessExploreResponse,
      });
    }
  }, [
    entities,
    exploreDispatch,
    exploreMode,
    filterState,
    isFetching,
    pagination,
    shouldDispatchResponse,
    termFacets,
  ]);

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
function getEntities<T>(
  staticData?: AzulEntitiesResponse<T>,
  serverData?: AzulEntitiesResponse<T>
): AzulEntitiesResponse<T>["hits"] | undefined {
  if (staticData && staticData.hits.length > 0) {
    return staticData.hits;
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
  shouldDispatchStaticResponse: boolean
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
  entityMapper?: EntityMapper<T, I>
): T[] {
  if (entityMapper) {
    return (entities as I[]).map(entityMapper);
  }
  return entities as T[];
}
