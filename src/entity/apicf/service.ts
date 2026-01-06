import {
  AzulEntitiesResponse,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import { EntityMapper } from "../../config/entities";
import { PAGINATION_PAGE_SIZE } from "../../shared/constants";
import { fetchEntitiesFromURL, fetchEntityFromURL } from "../common/service";

const THROW_ERROR = "Not implemented.";

/**
 * Make a GET or POST request for a list of entities.
 */
export const fetchEntitiesFromQuery =
  async (): Promise<AzulEntitiesResponse> => {
    throw new Error(THROW_ERROR); // Not implemented.
  };

/**
 * Fetch all entities from the given API path.
 * @param apiPath - API endpoint URL.
 * @param accessToken - Access token.
 * @returns entities.
 */
export const fetchAllEntities = async (
  apiPath: string,
  accessToken: string | undefined,
): Promise<AzulEntitiesResponse> => {
  const response = await fetchEntitiesFromURL(apiPath, accessToken);
  const entities = Object.values(response);
  return {
    apiPath,
    hits: entities,
    pagination: {
      count: 0,
      pages: Math.ceil(entities.length / PAGINATION_PAGE_SIZE),
      size: PAGINATION_PAGE_SIZE,
      total: entities.length,
    },
    termFacets: {},
  };
};

/**
 * Fetch entity from the given URL, entity ID and entity ID getter function.
 * @param id - Entity ID.
 * @param apiPath - API endpoint URL.
 * @param entityMapper - Entity mapper.
 * @returns entity.
 */
export const fetchEntity = async <T, I>(
  id: string,
  apiPath: string,
  entityMapper?: EntityMapper<T, I>,
): Promise<T> => {
  const entity = await fetchEntityFromURL(`${apiPath}/${id}`);
  return entityMapper?.(entity as I) || (entity as T);
};

/**
 * Fetch entity detail.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- this response type can't be determined beforehand
export const fetchEntityDetail = async (): Promise<any> => {
  throw new Error(THROW_ERROR); // Not implemented.
};

/**
 * Fetch summary data.
 */
export const fetchSummary = async (): Promise<AzulSummaryResponse> => {
  throw new Error(THROW_ERROR); // Not implemented.
};
