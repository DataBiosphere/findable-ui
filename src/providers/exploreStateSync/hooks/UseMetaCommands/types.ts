import { ExploreState } from "../../../exploreState";

export interface ExploreQueryState {
  catalog: ExploreState["catalogState"];
  entityListType: ExploreState["tabValue"];
  ff: ExploreState["featureFlagState"];
  filter: ExploreState["filterState"];
}
