import { NextRouter } from "next/router";
import { SelectedFilter } from "../../../common/entities";
import { EntityPath } from "../../../config/entities";
import { CatalogState, FeatureFlagState } from "../../exploreState";

/**
 * Entity context, keyed by entity path.
 */
export interface EntitiesContext {
  [key: EntityPath]: EntityContext;
}

/**
 * Entity key and router query for an entity.
 */
export interface EntityContext {
  entityKey: string;
  query: NextRouter["query"];
}

/**
 * State used to build an entity's URL query.
 */
export interface EntityState {
  catalogState: CatalogState;
  featureFlagState: FeatureFlagState;
  filterState: SelectedFilter[];
}
