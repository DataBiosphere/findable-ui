import { TableState } from "@tanstack/react-table";
import { ExploreState } from "../../../../providers/exploreState";

// TODO(fran): Change to use TableState instead of ExploreState.

export interface UseEntitiesStateProps extends Pick<TableState, "sorting"> {
  filterState: ExploreState["filterState"];
  pagination: Pick<ExploreState["paginationState"], "index" | "pageSize">;
}
