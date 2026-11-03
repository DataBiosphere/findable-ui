/**
 * The request's inputs; identifies the response it belongs to.
 */
export interface QueryParams {
  isAuthenticated: boolean;
}

/**
 * Query key: entity list type and request inputs. The request doesn't use the catalog, so the key leaves it out.
 */
export type QueryKey = ["entities", string, QueryParams];
