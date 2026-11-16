import { ExploreState } from "../../exploreState";
import { EntityState } from "../entities";
import { buildQuery } from "./query/buildQuery";
import { EntitiesContext } from "./types";

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

    if (entityKey !== key) {
      // For entities that do not share the same key, leave the context unchanged.
      entities[entityPath] = entity;
      continue;
    }

    // Entities sharing the key share the next filter state.
    entities[entityPath] = {
      ...entity,
      query: buildQuery(entityPath, nextEntityState.filterState),
    };
  }

  return entities;
}
