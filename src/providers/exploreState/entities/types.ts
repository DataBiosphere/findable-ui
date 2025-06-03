import { NextRouter } from "next/router";
import { SelectedFilter } from "../../../common/entities";
import { EntityPath } from "../../../config/entities";
import { CatalogState, FeatureFlagState } from "../../exploreState";

export interface EntitiesContext {
  [key: EntityPath]: EntityContext;
}

export interface EntityContext {
  entityKey: string;
  query: NextRouter["query"];
}

export interface EntityState {
  catalogState: CatalogState;
  featureFlagState: FeatureFlagState;
  filterState: SelectedFilter[];
}
