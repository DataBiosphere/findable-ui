import {
  type DefaultError,
  type PlaceholderDataFunction,
  QueryClient,
} from "@tanstack/react-query";
import type { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";
import { QUERY_CLIENT_CONFIG } from "./constants";
import type { QueryKey } from "./types";

/**
 * Creates the entity list's query client, with its defaults.
 * @returns Query client.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient(QUERY_CLIENT_CONFIG);
}

/**
 * Returns placeholder data that keeps the previous query's data while the next one loads, only for the same entity
 * list type.
 * @param entityListType - Entity list type.
 * @returns Placeholder data function.
 */
export function keepPreviousEntityData(
  entityListType: string,
): PlaceholderDataFunction<
  AzulEntitiesResponse,
  DefaultError,
  AzulEntitiesResponse,
  QueryKey
> {
  return (previousData, previousQuery) => {
    if (previousQuery?.queryKey[1] !== entityListType) return undefined;
    return previousData;
  };
}
