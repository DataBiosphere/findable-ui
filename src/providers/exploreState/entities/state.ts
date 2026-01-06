import { ExploreState } from "../../exploreState";
import { buildQuery } from "./query/buildQuery";
import { EntitiesContext, EntityState } from "./types";

/**
 * Builds the next entities context.
 * @param state - State.
 * @param entityListType - Entity list type.
 * @param nextEntityState - Next entity state.
 * @returns Next entities context.
 */
export function buildNextEntities(
  state: ExploreState,
  entityListType: string,
  nextEntityState: Pick<EntityState, "filterState">,
): EntitiesContext {
  // Get the entity key for the current entity.
  // Other entities may share the same key and therefore filter state.
  const key = state.entities[entityListType].entityKey;

  const entities: EntitiesContext = {};

  for (const [entityPath, entity] of Object.entries(state.entities)) {
    // Grab the entity key for the entity.
    const entityKey = entity.entityKey;

    // Clone the entity context.
    const entityContext = { ...entity };

    // Build the params object.
    // All entities share the same catalog and feature flag state.
    // Filter state is default to an empty array and updated below,
    // if the entity key matches the current entity key.
    const params: EntityState = {
      catalogState: state.catalogState,
      featureFlagState: state.featureFlagState,
      filterState: [],
    };

    // Update entity context with "shared" context (e.g. filterState).
    if (entityKey === key) {
      Object.assign(params, nextEntityState);
    }

    // At some point, we may need to update the entity context with additional properties that
    // are not "shared" (e.g. column grouping).
    // For now, this is not needed and so we update entities with the updated entity context and continue.
    entityContext.query = buildQuery(entityPath, params);
    entities[entityPath] = entityContext;
  }

  return entities;
}
