import { ExploreActionKind, ExploreState } from "../../../exploreState";

export type SyncStateFromUrlAction = {
  payload: SyncStateFromUrlPayload;
  type: ExploreActionKind.SyncStateFromUrl;
};

export type SyncStateFromUrlPayload = Pick<
  ExploreState,
  "catalogState" | "filterState" | "featureFlagState"
> & {
  entityListType: string;
};
