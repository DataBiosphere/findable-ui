import { ExploreActionKind, ExploreState } from "../../../exploreState";

export type UpdateStateFromUrlAction = {
  payload: UpdateStateFromUrlPayload;
  type: ExploreActionKind.UpdateStateFromUrl;
};

export type UpdateStateFromUrlPayload = Pick<
  ExploreState,
  "catalogState" | "featureFlagState" | "filterState"
> & {
  entityListType: string;
};
