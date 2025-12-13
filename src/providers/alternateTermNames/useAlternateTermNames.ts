import { useContext } from "react";
import {
  AlternateTermNamesContext,
  AlternateTermNamesContextProps,
} from "./alternateTermNames";

/**
 * Hook to access alternate term names from context.
 * @returns Context props containing the alternate term names map.
 */
export function useAlternateTermNames(): AlternateTermNamesContextProps {
  return useContext(AlternateTermNamesContext);
}
