/**
 * Handles Project's API requests
 */
// TODO move to Azul APIs section
import {
  APIEndpoints,
  AzulCatalogResponse,
  AzulEntitiesResponse,
  AzulListParams,
  AzulSummaryResponse,
  AZUL_PARAM,
} from "../../apis/azul/common/entities";
import { transformFilters } from "../../apis/azul/common/filterTransformer";
import { getConfig } from "../../config/config";
import { FilterState } from "../../hooks/useCategoryFilter";
import {
  getDefaultDetailParams,
  getDefaultListParams,
  getEntityURL,
} from "../../shared/utils";
import { convertUrlParams } from "../../utils/url";
import { api } from "../common/client";
import { fetchEntitiesFromURL } from "../common/service";
import { getAxiosRequestOptions } from "../common/utils";

/**
 * Make a GET or POST request for a list of entities
 * @param apiPath - Path that will be used to compose the API url
 * @param listParams - Params to be used on the request. If none passed, it will default to page's size 25 and the current catalog version
 * @param catalog - Catalog.
 * @param accessToken - string - auth token
 * @returns @see ListResponseType
 */
export const fetchEntitiesFromQuery = async (
  apiPath: string,
  listParams: AzulListParams,
  catalog: string | undefined,
  accessToken: string | undefined
): Promise<AzulEntitiesResponse> => {
  const catalogParam = catalog ? { [AZUL_PARAM.CATALOG]: catalog } : undefined;
  const params = { ...getDefaultListParams(), ...catalogParam, ...listParams };
  const response = await fetchEntitiesFromURL(
    `${apiPath}?${convertUrlParams(params)}`,
    accessToken
  );
  response.apiPath = apiPath;
  return response;
};

/**
 * Recursively call the endpoint to get a list of entities. This will iterate over the entity list until the next entity comes null
 * @param apiPath - Path that will be used to compose the API url
 * @param accessToken - Access token.
 * @param catalog - Catalog.
 * @param listParams - Params to be used on the request.
 * @returns @see ListResponseType
 */
export const fetchAllEntities = async (
  apiPath: string,
  accessToken: string | undefined,
  catalog?: string,
  listParams?: AzulListParams
): Promise<AzulEntitiesResponse> => {
  const result = await fetchEntitiesFromQuery(
    apiPath,
    listParams ?? {},
    catalog,
    accessToken
  );
  let hits = result.hits;
  let nextPage = result.pagination.next;
  while (nextPage) {
    const { data: nextPageJson } = await api().get<AzulEntitiesResponse>(
      nextPage
    );
    nextPage = nextPageJson.pagination.next;
    hits = [...hits, ...nextPageJson.hits];
  }
  return { ...result, hits } as AzulEntitiesResponse;
};

/**
 * Fetch all catalogs and default catalog from given URL.
 * @returns name of the default catalog and all available catalogs.
 */
export const fetchCatalog = async (): Promise<AzulCatalogResponse> => {
  const res = await api().get(APIEndpoints.CATALOGS);
  return res.data;
};

/**
 *  Request to get a single project.
 * @param id - entity's uuid.
 * @param apiPath - API endpoint URL.
 * @param catalog - Catalog.
 * @param accessToken - Access token.
 * @param defaultParams - Default parameters.
 * @param swallow404 - Swallow 404 error.
 * @returns @see ProjectResponse
 */
export const fetchEntityDetail = async (
  id: string,
  apiPath: string,
  catalog: string | undefined,
  accessToken: string | undefined,
  defaultParams = getDefaultDetailParams(),
  swallow404 = false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this response type can't be determined beforehand
): Promise<any> => {
  const catalogParam = catalog ? { [AZUL_PARAM.CATALOG]: catalog } : undefined;
  const options = getAxiosRequestOptions(accessToken);
  const baseURL = getEntityURL();
  return await api(baseURL)
    .get(
      `${apiPath}/${id}?${convertUrlParams({
        ...defaultParams,
        ...catalogParam,
      })}`,
      options
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (swallow404) {
        // skipping 404 error.
        console.log(`Building stub page for ${id}.`);
      } else {
        throw error;
      }
    });
};

/**
 * Request to a single summary object that doesn't need id
 * @param filterState - Selected filters.
 * @param catalog - Catalog.
 * @param accessToken - Auth token.
 * @returns @see SummaryResponse
 */
export const fetchSummary = async (
  filterState: FilterState,
  catalog: string | undefined,
  accessToken: string | undefined
): Promise<AzulSummaryResponse> => {
  const { summaryConfig } = getConfig();

  if (!summaryConfig) {
    throw new Error("Summary not configured!");
  }

  const apiPath = summaryConfig.apiPath;

  // Build filter query params, if any
  let summaryParams;
  const filtersParam = transformFilters(filterState);
  const catalogParam = catalog ? { [AZUL_PARAM.CATALOG]: catalog } : undefined;
  if (filtersParam) {
    summaryParams = {
      ...catalogParam,
      [AZUL_PARAM.FILTERS]: filtersParam,
    };
  }

  const options = getAxiosRequestOptions(accessToken);
  const res = await api().get<AzulSummaryResponse>(
    `${apiPath}?${convertUrlParams({ ...summaryParams })}`,
    options
  );
  return res.data;
};

/**
 * Fetch summary from given URL.
 * @param path - URL.
 * @param accessToken - Auth token.
 * @returns summary response.
 */
export const fetchSummaryFromURL = async (
  path: string,
  accessToken: string | undefined
): Promise<AzulSummaryResponse> => {
  const res = await api().get<AzulSummaryResponse>(
    path,
    getAxiosRequestOptions(accessToken)
  );
  return res.data;
};

/**
 * Fetch system status from given URL.
 * @param URL - URL.
 * @returns system status.
 */
export const fetchSystemStatusFromURL = async <R>(URL: string): Promise<R> => {
  const res = await api().get<AzulSummaryResponse>(URL);
  return res.data;
};
