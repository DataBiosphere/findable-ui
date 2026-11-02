import type {
  DefaultError,
  PlaceholderDataFunction,
  UseQueryResult,
} from "@tanstack/react-query";
import type { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";
import type { QueryKey } from "./types";

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

/**
 * Throws the query's error, for the error boundary, once its request has settled.
 * Unlike TanStack Query's `throwOnError`, this leaves the query free to be requested again when it is next used,
 * rather than throwing the failed query's error again without a request.
 * @param result - Query result.
 */
export function throwSettledError(
  result: UseQueryResult<AzulEntitiesResponse, DefaultError>,
): void {
  if (result.error && !result.isFetching) throw result.error;
}
