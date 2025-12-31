import { NextRouter } from "next/router";
import { TablesActionKind } from "../types";

export type UrlToStateAction = {
  payload: UrlToStatePayload;
  type: TablesActionKind.UrlToState;
};

export type UrlToStatePayload = {
  query: NextRouter["query"];
};
