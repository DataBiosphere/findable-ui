import { useToken } from "../../../../../../../hooks/authentication/token/useToken";
import { useCatalog } from "../../../../../../../hooks/catalog/UseCatalog/useCatalog";
import {
  DefaultError,
  useQuery as useReactQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { QueryKey } from "./types";
import { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";
import { queryFn } from "./queryFn";
import { useTableState } from "../../../../../../../providers/tables/hooks/UseTableState/hook";
import { useCursor } from "../cursor/useCursor";
import { useEffect } from "react";
import { useRevision } from "../../../../../../../providers/revision/hook";

/**
 * Fetches entities from the server using React Query.
 *
 * @param apiPath - API path.
 * @param entityListType - Entity identifier.
 * @returns UseQueryResult<T[], DefaultError>.
 */
export const useQuery = <T = unknown>(
  apiPath: string | undefined,
  entityListType: string,
): UseQueryResult<AzulEntitiesResponse<T>, DefaultError> => {
  const { catalog } = useCatalog();
  const { revision } = useRevision();
  const { token } = useToken();
  const { state } = useTableState(entityListType, revision);
  const { columnFilters, pagination, sorting } = state;
  const { pageIndex } = pagination;
  const { cursor, onUpdateCursor } = useCursor<T>(pageIndex);

  if (!apiPath) throw new Error("No API path found for entity");

  const queryResult = useReactQuery<
    AzulEntitiesResponse<T>,
    DefaultError,
    AzulEntitiesResponse<T>,
    QueryKey
  >({
    placeholderData: (previousData, previousQuery) => {
      if (previousQuery?.queryKey[1] !== entityListType) return undefined;
      return previousData;
    },
    queryFn: queryFn(apiPath, token, cursor),
    queryKey: [
      "entities",
      entityListType,
      catalog,
      { columnFilters, pagination, sorting },
    ],
  });

  useEffect(() => {
    if (queryResult.status !== "success") return;
    onUpdateCursor(queryResult.data);
  }, [onUpdateCursor, queryResult]);

  return queryResult;
};
