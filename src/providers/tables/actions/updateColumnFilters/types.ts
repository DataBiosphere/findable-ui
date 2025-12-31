import { ColumnFiltersState, Updater } from "@tanstack/react-table";
import { TablesActionKind } from "../types";
import { TableKey } from "../../state/tables/types";

export type UpdateColumnFiltersAction = {
  payload: UpdateColumnFiltersPayload;
  type: TablesActionKind.UpdateColumnFilters;
};

export interface UpdateColumnFiltersPayload {
  tableKey: TableKey;
  updaterOrValue: Updater<ColumnFiltersState>;
}
