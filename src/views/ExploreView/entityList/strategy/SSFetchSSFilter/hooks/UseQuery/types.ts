import { TableState } from "@tanstack/react-table";
import {
  ExploreState,
  PaginationResponse,
} from "../../../../../../../providers/exploreState";
import { SelectCategory } from "../../../../../../../common/entities";

export type QueryKey = [
  "entities",
  string,
  boolean,
  Pick<TableState, "sorting"> &
    Pick<ExploreState, "filterState"> & {
      catalog?: string;
      pagination: Pick<ExploreState["paginationState"], "index" | "pageSize">;
    },
];

export interface UseQueryProps<T = unknown> {
  data: T[];
  paginationResponse: PaginationResponse;
  selectCategories: SelectCategory[];
}
