import { useCallback, useEffect } from "react";
import {
  AzulEntitiesResponse,
  AzulListParams,
} from "../../../../../../../apis/azul/common/entities";
import {
  transformAzulPagination,
  transformFilters,
  transformTermFacets,
} from "../../../../../../../apis/azul/common/filterTransformer";
import { getEntityConfig } from "../../../../../../../config/utils";
import { ExploreActionKind } from "../../../../../../../providers/exploreState";
import { useToken } from "../../../../../../../hooks/authentication/token/useToken";
import { useAsync } from "../../../../../../../hooks/useAsync";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { fetchEntitiesFromQuery } from "../../../../../../../entity/api/service";
import { useCatalog } from "../../../../../../../hooks/useCatalog";
import { EntityListProps } from "../../../../types";

/**
 * Hook for server-side fetching and server-side filtering.
 *
 * Fetches entities from the server with server-side filtering applied
 * based on current filter state and pagination.
 *
 * @typeParam T - Entity type.
 * @param entityListType - Entity list type.
 * @returns Fetched data.
 */
export const useSSFetchSSFilter = <T = unknown>(
  entityListType: string,
): EntityListProps<T> => {
  const catalog = useCatalog();
  const { config } = useConfig();
  const { token } = useToken();
  const { apiPath } = getEntityConfig(config.entities, entityListType);
  const { exploreDispatch, exploreState } = useExploreState();
  const { data, run } = useAsync<AzulEntitiesResponse>();
  const { entityPageState, entityStateByCategoryGroupConfigKey } = exploreState;
  const { categoryGroupConfigKey, sorting } = entityPageState[entityListType];
  const { filterState = [] } =
    entityStateByCategoryGroupConfigKey.get(categoryGroupConfigKey) || {};

  if (!apiPath) throw new Error("No api path found for entity");

  const onFetch = useCallback(
    async (
      apiPath: string,
      listParams: AzulListParams,
      catalog?: string,
      token?: string,
    ) => {
      const entities = await run(
        fetchEntitiesFromQuery(apiPath, listParams, catalog, token),
      );
      exploreDispatch({
        payload: {
          listItems: entities?.hits,
          loading: false,
          paginationResponse: transformAzulPagination(entities.pagination),
          selectCategories: transformTermFacets(
            entities.termFacets,
            filterState,
          ),
        },
        type: ExploreActionKind.ProcessExploreResponse,
      });
    },
    [exploreDispatch, filterState, run],
  );

  // Fetch entities - on change of filter state - server-side fetching and server-side filtering.
  useEffect(() => {
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

    onFetch(apiPath, listParams, catalog, token);
  }, [
    apiPath,
    catalog,
    exploreState.paginationState.index,
    filterState,
    onFetch,
    sorting,
    token,
  ]);

  return { data: data?.hits };
};
