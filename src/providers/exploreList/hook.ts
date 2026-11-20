import { useContext } from "react";
import { ExploreListContext } from "./context";

/**
 * Returns the entity list type the user explored from, e.g. "files", for pages outside the explore view.
 * @returns The entity list type.
 * @throws Error when no ExploreListProvider is mounted.
 */
export function useExploreList(): string {
  const exploreList = useOptionalExploreList();
  if (exploreList === undefined) {
    throw new Error(
      "useExploreList requires an ExploreListProvider: mount ExploreListProvider in _app.",
    );
  }
  return exploreList;
}

/**
 * Returns the explore list when an ExploreListProvider is mounted, for code that also runs on sites without one.
 * @returns The entity list type, or undefined when no ExploreListProvider is mounted.
 */
export function useOptionalExploreList(): string | undefined {
  return useContext(ExploreListContext)?.exploreList;
}
