import { DataDictionaryActionKind } from "../types";

export type ClearMetaAction = {
  payload: ClearMetaPayload;
  type: DataDictionaryActionKind.ClearMeta;
};

export type ClearMetaPayload = null;
