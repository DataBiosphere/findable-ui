import { StateUrlAdapter } from "./types";
import { NextRouter } from "next/router";
import { PartialTableState } from "../../../../../providers/tables/state/tables/types";
import {
  mapColumnFilters,
  mapSelectedFilters,
} from "../../../../../providers/tables/adapter/columnFilters";
import { stateToUrlQuery } from "../../../../../utils/stateToUrlQuery";
import { parseJsonQueryParam } from "../../../../../utils/parseJsonQueryParam";
import { SelectedFilter } from "common/entities";
import { PARAM } from "./constants";

/**
 * Adapter for URL <--> state conversion.
 */
export const stateUrlAdapter: StateUrlAdapter = {
  queryToState: (query): PartialTableState => ({
    columnFilters: mapColumnFilters(
      parseJsonQueryParam<SelectedFilter[]>(query[PARAM.FILTER]) ?? [],
    ),
  }),
  stateToQuery: (state, tableKey): NextRouter["query"] =>
    stateToUrlQuery({
      [PARAM.ENTITY_LIST_TYPE]: tableKey,
      [PARAM.FILTER]: mapSelectedFilters(state.columnFilters || []),
    }),
};
