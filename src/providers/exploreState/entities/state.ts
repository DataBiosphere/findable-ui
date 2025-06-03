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
  nextEntityState: Pick<EntityState, "filterState">
): EntitiesContext {
  // Get the entity key for the current entity.
  // Other entities may share the same key and therefore filter state.
  const key = state.entities[entityListType].entityKey;

  const entities: EntitiesContext = {};

  for (const [entityPath, entity] of Object.entries(state.entities)) {
    // Grab the entity key for the entity.
    const entityKey = entity.entityKey;

    if (entityKey !== key) {
      // For entities that do not share the same key, leave the context unchanged.
      entities[entityPath] = entity;
      continue;
    }

    // Clone the entity context.
    const entityContext = { ...entity };

    // Update entity context with "shared" context (e.g. filterState).
    entityContext.query = buildQuery(entityPath, {
      ...nextEntityState,
      catalogState: state.catalogState,
      featureFlagState: state.featureFlagState,
    });

    // At some point, we may need to update the entity context with additional properties that
    // are not "shared" (e.g. column grouping).
    // For now, this is not needed and so we update entities with the updated entity context and continue.
    entities[entityPath] = entityContext;
  }

  return entities;
}
