import { useLocation } from "../useLocation";

interface UseURLFilterParamsResult {
  decodedFilterParam: string;
}

/**
 * useURLFilterParams hook is used to read the filter from the url search params.
 * @deprecated - Avoid using this hook if possible; we intend on using ExploreState actions to manage URL state.
 * @returns an object containing the current filter
 */
export const useURLFilterParams = (): UseURLFilterParamsResult => {
  const { search } = useLocation() || {};
  const filterParam = search?.get("filter") ?? "[]";

  return {
    decodedFilterParam: filterParam,
  };
};
