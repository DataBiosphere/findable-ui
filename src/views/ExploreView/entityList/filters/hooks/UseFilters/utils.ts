import { OnFilterWithTracking, ParsedFilterArgs } from "./types";

/**
 * Parses the arguments of an OnFilterWithTracking callback.
 * @param args - The arguments of the callback.
 * @returns An object containing the parsed arguments.
 */
export function parseFilterArgs(
  args: Parameters<OnFilterWithTracking>,
): ParsedFilterArgs {
  const [
    fromSearchAll,
    categoryKey,
    value,
    selected,
    categorySection = "",
    viewKind,
    searchTerm = "",
  ] = args;
  return {
    categoryKey,
    categorySection,
    fromSearchAll,
    searchTerm,
    selected,
    value,
    viewKind,
  };
}
