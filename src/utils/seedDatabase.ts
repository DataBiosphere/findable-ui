import fsp from "fs/promises";
import type { EntityConfig } from "../config/entities";
import { database } from "./database";

// Intended for static-export builds. Reading, parsing and mapping the catalog
// file is the expensive part (multi-MB files, and getStaticProps runs once per
// prerendered page), so memoize that per entity type — the file is read, parsed
// and mapped once regardless of how many pages seed the type. The memoized
// entities are held for the process lifetime and are NOT re-read if the file
// changes on disk, so this is unsuitable for long-lived servers that must
// reflect catalog edits.
//
// The database seed write is cheap and runs on EVERY call, deliberately not
// memoized: other build-time code may seed the same entity type with a
// different shape (e.g. a list page seeding unmapped entities for client-side
// mapping) and build workers interleave pages, so skipping the seed on a cache
// hit could leave the wrong shape in the database.
//
// Server-only: uses Node fs; import only from build-time code (e.g. getStaticProps).
const entitiesByType = new Map<string, Promise<unknown[]>>();

/**
 * Returns the entities for an entity type, reading, parsing and mapping the
 * catalog file once per type and caching the result for the process lifetime.
 * A failed read is not cached, so a later call retries.
 * @param entityListType - Entity list type.
 * @param entityConfig - Entity config.
 * @returns Promise resolving to the mapped entities.
 */
function loadEntities(
  entityListType: string,
  entityConfig: EntityConfig,
): Promise<unknown[]> {
  let entities = entitiesByType.get(entityListType);
  if (!entities) {
    // Don't cache a failed read — evict on rejection, but re-throw so awaiters
    // (and unhandled-rejection tracking) still see the failure.
    entities = readEntities(entityListType, entityConfig).catch(
      (error: unknown) => {
        entitiesByType.delete(entityListType);
        throw error;
      },
    );
    entitiesByType.set(entityListType, entities);
  }
  return entities;
}

/**
 * Reads, parses and maps the entity config's catalog file.
 * @param entityListType - Entity list type, used in error messages.
 * @param entityConfig - Entity config.
 * @returns Promise resolving to the mapped entities.
 */
async function readEntities(
  entityListType: string,
  entityConfig: EntityConfig,
): Promise<unknown[]> {
  const { entityMapper, staticLoadFile } = entityConfig;

  if (!staticLoadFile) {
    throw new Error(
      `staticLoadFile not found for entity type "${entityListType}"`,
    );
  }

  let jsonText: string;
  try {
    jsonText = await fsp.readFile(staticLoadFile, "utf8");
  } catch (error) {
    // Preserve the underlying cause (e.g. EACCES, EISDIR, EMFILE) rather than
    // relabelling every read failure as a missing file.
    throw new Error(
      `Failed to read file ${staticLoadFile} for entity type "${entityListType}"`,
      { cause: error },
    );
  }

  // Catalog files are either an object map keyed by id (data-biosphere, ncpi)
  // or a top-level array of entities (brc-analytics); Object.values handles
  // both. Only reject null/non-object values, which would otherwise throw a
  // raw TypeError or silently seed an empty list.
  const object: unknown = JSON.parse(jsonText);
  if (typeof object !== "object" || object === null) {
    throw new Error(
      `File ${staticLoadFile} for entity type "${entityListType}" is not a JSON object or array`,
    );
  }

  // Client-side fetched entities are mapped prior to dispatch to explore state.
  const values = Object.values(object);
  return entityMapper ? values.map(entityMapper) : values;
}

/**
 * Seeds the database for an entity type from its catalog file. The read, parse
 * and map are memoized per type (see loadEntities) so they happen once during a
 * static export, but the seed write runs on every call so the seeded shape is
 * always correct even when other build-time code seeds the same type with a
 * different shape.
 * @param entityListType - Entity list type.
 * @param entityConfig - Entity config.
 * @returns Promise that resolves once the database has been seeded.
 */
export async function seedDatabase(
  entityListType: string,
  entityConfig: EntityConfig,
): Promise<void> {
  const entities = await loadEntities(entityListType, entityConfig);
  database.get().seed(entityListType, entities);
}
