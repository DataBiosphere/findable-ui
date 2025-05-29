import { ExploreState } from "../../../exploreState";

export interface ExploreQueryState {
  catalog: ExploreState["catalogState"];
  entityListType: ExploreState["tabValue"];
  ff: ExploreState["featureFlagState"];
  filter: ExploreState["filterState"];
}

export enum META_COMMAND {
  STATE_TO_URL_PUSH = "STATE_TO_URL_PUSH",
  STATE_TO_URL_REPLACE = "STATE_TO_URL_REPLACE",
}
