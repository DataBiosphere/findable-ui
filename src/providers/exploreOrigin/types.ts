import type { ReactNode } from "react";

/**
 * Explore origin context value.
 */
export interface ExploreOriginContextProps {
  /**
   * Entity list type the user explored from, e.g. "files".
   */
  exploreOrigin: string;
  /**
   * Sets the explore origin; the explore view calls it with its entity list type.
   */
  setExploreOrigin: (entityListType: string) => void;
}

/**
 * Explore origin provider props.
 */
export interface ExploreOriginProviderProps {
  /**
   * Entity list types the URL's `list` param may name, e.g. the configured entity routes.
   */
  allowedOrigins: string[];
  children: ReactNode;
  /**
   * Explore origin used when the URL has no allowed `list`, e.g. the page's entity list type or the site's default.
   */
  initialOrigin: string;
}
