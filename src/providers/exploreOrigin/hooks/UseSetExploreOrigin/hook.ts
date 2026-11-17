import { useContext, useEffect } from "react";
import { ExploreOriginContext } from "../../context";

/**
 * Sets the explore origin to the explore page's entity list type. Does nothing when no ExploreOriginProvider is mounted.
 * @param entityListType - Entity list type of the explore page.
 */
export function useSetExploreOrigin(entityListType: string): void {
  const setExploreOrigin = useContext(ExploreOriginContext)?.setExploreOrigin;
  useEffect(() => {
    setExploreOrigin?.(entityListType);
  }, [entityListType, setExploreOrigin]);
}
