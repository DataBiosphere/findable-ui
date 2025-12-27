import { getEntityConfig } from "../../../../../../../config/utils";
import { useToken } from "../../../../../../../hooks/authentication/token/useToken";
import { useConfig } from "../../../../../../../hooks/useConfig";
import { useCatalog } from "../../../../../../../hooks/useCatalog";
import { DefaultError, useQuery } from "@tanstack/react-query";
import { QueryKey, UseQueryProps } from "./types";
import { useAuth } from "../../../../../../../providers/authentication/auth/hook";
import { select } from "./select";
import { useExploreEntityState } from "../../../../../hooks/UseExploreEntityState/hook";
import { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";
import { queryFn } from "./queryFn";

export const useSSFetchSSFilterQuery = <T = unknown>(
  entityListType: string,
): UseQueryProps<T> | undefined => {
  const catalog = useCatalog();
  const { config } = useConfig();
  const { token } = useToken();
  const { authState } = useAuth();
  const { entities } = config;
  const { isAuthenticated } = authState;
  const { apiPath } = getEntityConfig(entities, entityListType);
  const { filterState, pagination, sorting } =
    useExploreEntityState(entityListType);

  if (!apiPath) throw new Error("No API path found for entity");

  const { data } = useQuery<
    AzulEntitiesResponse<T>,
    DefaultError,
    UseQueryProps<T>,
    QueryKey
  >({
    queryFn: queryFn(token),
    queryKey: [
      "entities",
      apiPath,
      isAuthenticated,
      { catalog, filterState, pagination, sorting },
    ],
    select: select(filterState),
  });

  return data;
};
