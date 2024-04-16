import { useConfig } from "./useConfig";
import { useExploreState } from "./useExploreState";

/**
 * Returns configured catalog value.
 * @returns catalog value.
 */
export const useCatalog = (): string | undefined => {
  const { config } = useConfig();
  const {
    exploreState: { catalogState },
  } = useExploreState();
  const { dataSource } = config;
  const { defaultParams } = dataSource || {};
  const { catalog } = defaultParams || {};
  return catalogState || catalog;
};
