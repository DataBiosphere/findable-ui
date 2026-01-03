import { PaginationState, Updater } from "@tanstack/react-table";
import { TablesActionKind } from "../types";
import { TableKey } from "../../state/tables/types";

export type UpdatePaginationAction = {
  payload: UpdatePaginationPayload;
  type: TablesActionKind.UpdatePagination;
};

export interface UpdatePaginationPayload {
  revision?: string;
  tableKey: TableKey;
  updaterOrValue: Updater<PaginationState>;
}
