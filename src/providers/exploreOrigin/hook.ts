import { useContext } from "react";
import { ExploreOriginContext } from "./context";

/**
 * Returns the entity list type the user explored from, e.g. "files", for pages outside the explore view.
 * @returns The entity list type.
 * @throws Error when no ExploreOriginProvider is mounted.
 */
export function useExploreOrigin(): string {
  const exploreOrigin = useOptionalExploreOrigin();
  if (exploreOrigin === undefined) {
    throw new Error(
      "useExploreOrigin requires an ExploreOriginProvider: mount ExploreOriginProvider in _app.",
    );
  }
  return exploreOrigin;
}

/**
 * Returns the explore origin when an ExploreOriginProvider is mounted, for code that also runs on sites without one.
 * @returns The entity list type, or undefined when no ExploreOriginProvider is mounted.
 */
export function useOptionalExploreOrigin(): string | undefined {
  return useContext(ExploreOriginContext)?.exploreOrigin;
}
