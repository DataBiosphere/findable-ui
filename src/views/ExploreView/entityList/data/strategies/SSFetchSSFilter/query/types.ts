import { TableState } from "@tanstack/react-table";
import { ExploreState } from "../../../../../../../providers/exploreState";

export type QueryKey = [
  "entities",
  string,
  Pick<TableState, "sorting"> &
    Pick<ExploreState, "filterState"> & {
      catalog?: string;
      pagination: Pick<ExploreState["paginationState"], "index" | "pageSize">;
    },
];
