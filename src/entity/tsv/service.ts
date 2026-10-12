/**
 * Handles requests to TSV file
 */

import {
  AzulEntitiesResponse,
  AzulSummaryResponse,
} from "../../apis/azul/common/entities";
import { PAGINATION_PAGE_SIZE } from "../../shared/constants";
import { database } from "../../utils/database";

/**
 * Returns every entity of the given type from the TSV database, as an Azul entities response.
 * @param entityListType - Entity list type.
 * @returns All entities of the given type, with pagination.
 */
export const fetchEntitiesFromQuery = async (
  entityListType: string,
): Promise<AzulEntitiesResponse> => {
  const entities = database.get().all(entityListType);
  return Promise.resolve({
    hits: entities,
    pagination: {
      count: 0,
      pages: Math.ceil(entities.length / PAGINATION_PAGE_SIZE),
      size: PAGINATION_PAGE_SIZE,
      total: entities.length,
    },
    termFacets: {},
  });
};

/**
 * Returns every entity of the given type. Delegates to fetchEntitiesFromQuery.
 * @param entityListType - Entity list type. Callers going through EntityService pass a URL here, which matches no entities, so the result is empty.
 * @returns All entities of the given type, with pagination.
 */
export const fetchEntitiesFromURL = async (
  entityListType: string,
): Promise<AzulEntitiesResponse> => {
  return fetchEntitiesFromQuery(entityListType);
};

/**
 * Returns every entity of the given type. Delegates to fetchEntitiesFromQuery.
 * @param entityListType - Entity list type.
 * @returns All entities of the given type, with pagination.
 */
export const fetchAllEntities = async (
  entityListType: string,
): Promise<AzulEntitiesResponse> => {
  return fetchEntitiesFromQuery(entityListType);
};

/**
 * Returns the entity with the given ID from the TSV database.
 * @param entityId - Entity ID.
 * @param entityListType - Entity list type.
 * @returns The entity, or undefined if not found.
 */
export const fetchEntityDetail = async (
  entityId: string,
  entityListType: string,
): Promise<unknown> => {
  return database.get().find(entityListType, entityId);
};

/**
 * Not implemented for the TSV service.
 * @returns A promise that always rejects with a "Not implemented" error.
 */
export const fetchSummary = async (): Promise<AzulSummaryResponse> => {
  throw new Error("Not implemented function"); //This function isn't necessary yet
};
