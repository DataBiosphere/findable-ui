import { useIsHydrated } from "../../../../hooks/useIsHydrated/hook";
import { useExploreListContext } from "../../hook";

/**
 * Returns the explore list to render, e.g. in a link's `href`: the provider's `initialList`, which the static HTML is
 * built with, until the page has hydrated, then the explore list. Rendering `useExploreList` instead causes a hydration
 * mismatch, because the explore list can come from the URL, which the static HTML doesn't know: an attribute such as
 * `href` keeps the static HTML's value, and text is rendered again on the client with a hydration error.
 * @returns The entity list type to render.
 * @throws Error when no ExploreListProvider is mounted.
 */
export function useRenderedExploreList(): string {
  const { exploreList, initialList } = useExploreListContext(
    "useRenderedExploreList",
  );
  const isHydrated = useIsHydrated();
  return isHydrated ? exploreList : initialList;
}
