import { useContext } from "react";
import { QueryContext } from "../../context";
import { QueryContextValue } from "../../types";

/**
 * Hook to access query submission from the QueryProvider.
 * @returns Query context value with onSubmit.
 */
export const useQuery = (): QueryContextValue => {
  return useContext(QueryContext);
};
