import { NextRouter } from "next/router";
import { EntityPath } from "../../../config/entities";

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
