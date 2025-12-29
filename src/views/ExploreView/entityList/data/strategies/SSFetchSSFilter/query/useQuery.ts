import { useToken } from "../../../../../../../hooks/authentication/token/useToken";
import { useCatalog } from "../../../../../../../hooks/useCatalog";
import {
  DefaultError,
  useQuery as useReactQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { QueryKey } from "./types";
import { useEntitiesState } from "../../../../../hooks/UseEntitiesState/hook";
import { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";
import { queryFn } from "./queryFn";

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
  const { token } = useToken();
  const { filterState, pagination, sorting } = useEntitiesState(entityListType);
  const catalog = useCatalog();

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
      { catalog, filterState, pagination, sorting },
    ],
  });
};
