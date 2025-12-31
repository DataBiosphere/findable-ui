import { TablesActionKind } from "../types";

export type ClearMetaAction = {
  payload: ClearMetaPayload;
  type: TablesActionKind.ClearMeta;
};

export type ClearMetaPayload = null;
