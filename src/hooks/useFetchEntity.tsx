import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { PARAMS_INDEX_UUID } from "../common/constants";
import { useCatalogParam } from "../providers/catalog/hook";
import { EntityDetailViewProps } from "../views/EntityDetailView/entityDetailView";
import { useToken } from "./authentication/token/useToken";
import { useAsync } from "./useAsync";
import { useEntityService } from "./useEntityService";
import { EXPLORE_MODE } from "./useExploreMode/types";
import { useExploreMode } from "./useExploreMode/useExploreMode";

interface UseEntityDetailResponse<T> {
  isLoading: boolean;
  response?: T;
}

/**
 * Hook handling the load and transformation of the values used by detail pages. If the current entity loaded statically,
 * this hook will return the already loaded data. Otherwise, it will make a request for the entity's pathUrl
 * @param detailViewProps - Statically loaded data, if any.
 * @returns Object with the loaded data and a flag indicating is the data is loading.
 */
export const useFetchEntity = <T,>(
  detailViewProps?: EntityDetailViewProps,
): UseEntityDetailResponse<T> => {
  const { data: staticData, entityListType } = detailViewProps || {};
  const { token } = useToken();
  const exploreMode = useExploreMode();
  const catalogParam = useCatalogParam();
  const { catalog, fetchEntityDetail, path } = useEntityService(entityListType);
  const { query } = useRouter();
  const { params } = query;
  const uuid = params?.[PARAMS_INDEX_UUID] as string;
  const { data: response, isIdle, isLoading, run } = useAsync<T>();
  const entityResponse = response || staticData;
  const shouldFetchEntity = useMemo(
    () =>
      isFetchRequired(
        exploreMode !== EXPLORE_MODE.CS_FETCH_CS_FILTERING,
        Boolean(token), // TODO(cc), note a fetch is required if the token is true, but is unable to re-fetch on logout when token is undefined! Page is required to reload!
        Boolean(catalogParam),
        Boolean(entityResponse),
      ),
    [catalogParam, entityResponse, exploreMode, token],
  );
  const isResponseLoading = shouldFetchEntity ? isIdle || isLoading : false;

  useEffect(() => {
    // Fetch entity if entity data originates from a request, and has not yet been requested.
    if (shouldFetchEntity && uuid) {
      run(fetchEntityDetail(uuid, path, catalog, token, undefined));
    }
  }, [catalog, fetchEntityDetail, path, run, shouldFetchEntity, token, uuid]);

  return {
    isLoading: isResponseLoading,
    response: entityResponse
      ? { ...entityResponse, isLoading: isResponseLoading }
      : undefined,
  };
};

/**
 * Returns true if fetching the entity is necessary.
 * @param isServerSideFetch - Data is fetched on the server side.
 * @param isAuthenticated - User is authenticated.
 * @param isCatalogSelected - A catalog is selected by the URL.
 * @param hasEntityReponse - Entity response is defined.
 * @returns true if a fetch is necessary.
 */
function isFetchRequired(
  isServerSideFetch: boolean,
  isAuthenticated: boolean,
  isCatalogSelected: boolean,
  hasEntityReponse: boolean,
): boolean {
  if (isServerSideFetch) {
    return isAuthenticated || isCatalogSelected || !hasEntityReponse;
  }
  return false;
}
