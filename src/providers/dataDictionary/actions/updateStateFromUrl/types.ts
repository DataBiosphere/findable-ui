import { NextRouter } from "next/router";
import { DataDictionaryActionKind } from "../types";

export type UpdateStateFromUrlAction = {
  payload: UpdateStateFromUrlPayload;
  type: DataDictionaryActionKind.UpdateStateFromUrl;
};

export type UpdateStateFromUrlPayload = NextRouter["query"];
