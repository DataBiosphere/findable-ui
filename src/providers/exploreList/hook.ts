import { useContext } from "react";
import { ExploreListContext } from "./context";
import type { ExploreListContextProps } from "./types";

/**
 * Returns the entity list type the user explored from, e.g. "files", for pages outside the explore view.
 * @returns The entity list type.
 * @throws Error when no ExploreListProvider is mounted.
 */
export function useExploreList(): string {
  return useExploreListContext("useExploreList").exploreList;
}

/**
 * Returns the explore list context, for hooks that need an ExploreListProvider.
 * @param hookName - Name of the calling hook, for the error message.
 * @returns The explore list context.
 * @throws Error when no ExploreListProvider is mounted.
 */
export function useExploreListContext(
  hookName: string,
): ExploreListContextProps {
  const context = useContext(ExploreListContext);
  if (context === undefined) {
    throw new Error(
      `${hookName} requires an ExploreListProvider: mount ExploreListProvider in _app.`,
    );
  }
  return context;
}

/**
 * Returns the explore list when an ExploreListProvider is mounted, for code that also runs on sites without one.
 * @returns The entity list type, or undefined when no ExploreListProvider is mounted.
 */
export function useOptionalExploreList(): string | undefined {
  return useContext(ExploreListContext)?.exploreList;
}
