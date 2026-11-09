import { useEffect } from "react";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { ExploreActionKind } from "../../../../../../../providers/exploreState";
import { useEntities } from "../../../../../hooks/UseEntities/hook";
import { buildExploreResponse, mapEntities } from "./utils";

/**
 * Processes the explore page's statically loaded entities into explore state, mapped with the entity's mapper, for
 * client-side filtering.
 * @typeParam T - Entity type.
 * @param data - Statically loaded entities of the explore page, if any.
 * @param entityListType - Entity list type of the explore page.
 */
export const useAdapter = <T = unknown>(
  data: T[] | undefined,
  entityListType: string,
): void => {
  const { entityMapper } = useEntities(entityListType);
  const { exploreDispatch, exploreState } = useExploreState();
  const { tabValue } = exploreState;

  // Process explore response, for the explore page's entity list type only; data belongs to the page's entity list type.
  useEffect(() => {
    if (!data?.length) return;
    if (tabValue !== entityListType) return;
    exploreDispatch({
      payload: buildExploreResponse(mapEntities(data, entityMapper)),
      type: ExploreActionKind.ProcessExploreResponse,
    });
  }, [data, entityListType, entityMapper, exploreDispatch, tabValue]);
};
