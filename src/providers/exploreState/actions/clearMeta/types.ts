import { ExploreActionKind } from "../../../exploreState";

export type ClearMetaAction = {
  payload: ClearMetaPayload;
  type: ExploreActionKind.ClearMeta;
};

export type ClearMetaPayload = null;
