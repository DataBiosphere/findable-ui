import { NextRouter } from "next/router";
import { DataDictionaryActionKind } from "../types";

export type UrlToStateAction = {
  payload: UrlToStatePayload;
  type: DataDictionaryActionKind.UrlToState;
};

export type UrlToStatePayload = {
  query: NextRouter["query"];
};
