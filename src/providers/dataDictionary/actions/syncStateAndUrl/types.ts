import { NextRouter } from "next/router";
import { DataDictionaryActionKind } from "../types";

export type SyncStateAndUrlAction = {
  payload: SyncStateAndUrlPayload;
  type: DataDictionaryActionKind.SyncStateAndUrl;
};

export type SyncStateAndUrlPayload = NextRouter["query"];
