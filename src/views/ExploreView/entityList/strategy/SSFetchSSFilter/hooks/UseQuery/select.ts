import {
  transformAzulPagination,
  transformTermFacets,
} from "../../../../../../../apis/azul/common/filterTransformer";
import { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";
import { UseQueryProps } from "./types";
import { SelectedFilter } from "../../../../../../../common/entities";

/**
 * Selects data from the response.
 * @param filterState - Filter state.
 * @returns Data from the response.
 */
export function select<T = unknown>(
  filterState: SelectedFilter[],
): (data: AzulEntitiesResponse<T>) => UseQueryProps<T> {
  return (data: AzulEntitiesResponse<T>): UseQueryProps<T> => {
    return {
      data: data.hits,
      paginationResponse: transformAzulPagination(data.pagination),
      selectCategories: transformTermFacets(data.termFacets, filterState),
    };
  };
}
