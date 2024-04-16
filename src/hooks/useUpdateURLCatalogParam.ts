import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useExploreState } from "./useExploreState";

/**
 * Updates URL catalog params.
 */
export const useUpdateURLCatalogParams = (): void => {
  const { exploreState } = useExploreState();
  const { basePath, pathname, query } = useRouter();
  const { catalogState } = exploreState;

  useEffect(() => {
    if (!catalogState) return;
    if ("catalog" in query && query.catalog === catalogState) return;
    Router.replace({
      pathname: pathname?.replace(basePath, ""),
      query: { ...query, catalog: catalogState },
    });
  }, [basePath, catalogState, pathname, query]);
};
