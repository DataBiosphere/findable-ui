import { useContext, useEffect } from "react";
import { ExploreListContext } from "../../context";

/**
 * Sets the explore list to the explore page's entity list type. Does nothing when no ExploreListProvider is mounted.
 * @param entityListType - Entity list type of the explore page.
 */
export function useSetExploreList(entityListType: string): void {
  const setExploreList = useContext(ExploreListContext)?.setExploreList;
  useEffect(() => {
    setExploreList?.(entityListType);
  }, [entityListType, setExploreList]);
}
