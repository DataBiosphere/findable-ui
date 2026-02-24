import { useConfig } from "../../../../hooks/useConfig";
import { UseQuery } from "../query/types";
import { useQuery } from "../query/useQuery";

/**
 * Adapter hook that wires AI query to app config.
 * @returns AI query interface with actions.
 */
export function useAdapter(): UseQuery {
  const { config } = useConfig();
  const { ai } = config;

  return useQuery(ai?.url);
}
