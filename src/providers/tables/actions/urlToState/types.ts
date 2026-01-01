import { TablesActionKind } from "../types";
import { PartialTableState, TableKey } from "../../state/tables/types";

export type UrlToStateAction = {
  payload: UrlToStatePayload;
  type: TablesActionKind.UrlToState;
};

export type UrlToStatePayload = {
  tableKey: TableKey;
  tableState: PartialTableState;
};
