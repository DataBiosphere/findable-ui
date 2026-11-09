import { QueryClient } from "@tanstack/react-query";
import type { EntityMapper } from "../../../../../../../config/entities";
import { QUERY_CLIENT_CONFIG } from "./constants";

/**
 * Creates the entity list's query client, with its defaults.
 * @returns Query client.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient(QUERY_CLIENT_CONFIG);
}

/**
 * Returns the query's `select`: maps the fetched entities to list items with the entity mapper, or passes them through
 * when there is none. Duplicated by the CSFetchCSFilter strategy's `mapEntities` on purpose: strategies don't share
 * code, and both are dropped once explore view 2 keeps response data out of explore state.
 * @param entityMapper - Entity mapper, if any.
 * @returns Select function.
 */
export function selectEntities<T, I>(
  entityMapper?: EntityMapper<T, I>,
): (entities: unknown[]) => unknown[] {
  return (entities) =>
    entityMapper ? (entities as I[]).map(entityMapper) : entities;
}
