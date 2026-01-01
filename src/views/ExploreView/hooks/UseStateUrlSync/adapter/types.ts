import { NextRouter } from "next/router";
import {
  PartialTableState,
  TableKey,
  TableStates,
} from "../../../../../providers/tables/state/tables/types";

export interface StateUrlAdapter {
  /**
   * Convert URL query params into table state.
   * Used for URL → state sync.
   */
  queryToState(query: NextRouter["query"]): PartialTableState;

  /**
   * Convert table state into URL query params.
   * Used for state → URL sync.
   */
  stateToQuery(
    state: TableStates[TableKey],
    tableKey: TableKey,
  ): NextRouter["query"];
}
