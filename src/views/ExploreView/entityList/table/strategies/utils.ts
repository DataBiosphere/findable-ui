/**
 * Throws an error with a message indicating that columns are missing for a given entity.
 *
 * @param entityListType - Entity identifier.
 */
export function throwError(entityListType: string): never {
  throw new Error(`Missing columns for entity: ${entityListType}`);
}
