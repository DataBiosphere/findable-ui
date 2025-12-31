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
  const { token } = useToken();
  const { state } = useTableState(entityListType);
  const { columnFilters, pagination, sorting } = state;

  if (!apiPath) throw new Error("No API path found for entity");

  return useReactQuery<
    AzulEntitiesResponse<T>,
    DefaultError,
    AzulEntitiesResponse<T>,
    QueryKey
  >({
    queryFn: queryFn(apiPath, token),
    queryKey: [
      "entities",
      entityListType,
      catalog,
      { columnFilters, pagination, sorting },
    ],
  });
};
