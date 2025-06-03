import { NextRouter } from "next/router";
import { ExploreActionKind } from "../../../exploreState";

export type UrlToStateAction = {
  payload: UrlToStatePayload;
  type: ExploreActionKind.UrlToState;
};

export type UrlToStatePayload = {
  query: NextRouter["query"];
};
