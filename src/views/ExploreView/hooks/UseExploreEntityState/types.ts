import { TableState } from "@tanstack/react-table";
import { ExploreState } from "../../../../providers/exploreState";

export interface UseExploreEntityStateProps extends Pick<
  TableState,
  "sorting"
> {
  filterState: ExploreState["filterState"];
  pagination: Pick<ExploreState["paginationState"], "index" | "pageSize">;
}
