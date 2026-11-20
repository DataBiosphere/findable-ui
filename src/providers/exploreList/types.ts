import type { ReactNode } from "react";

/**
 * Explore list context value.
 */
export interface ExploreListContextProps {
  /**
   * Entity list type the user explored from, e.g. "files".
   */
  exploreList: string;
  /**
   * Sets the explore list; the explore view calls it with its entity list type.
   */
  setExploreList: (entityListType: string) => void;
}

/**
 * Explore list provider props.
 */
export interface ExploreListProviderProps {
  /**
   * Entity list types the URL's `list` param may name, e.g. the configured entity routes.
   */
  allowedLists: string[];
  children: ReactNode;
  /**
   * Explore list used when the URL has no allowed `list`, e.g. the page's entity list type or the site's default.
   */
  initialList: string;
}
