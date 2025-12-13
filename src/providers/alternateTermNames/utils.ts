import { AlternateTermNamesMap } from "./alternateTermNames";

/**
 * Look up the alternate name for a given facet and term.
 * @param alternateTermNames - The alternate term names map.
 * @param facetName - The facet name.
 * @param termName - The term name.
 * @returns The alternate name if found, otherwise undefined.
 */
export function getAlternateName(
  alternateTermNames: AlternateTermNamesMap | null,
  facetName: string,
  termName: string
): string | undefined {
  if (!alternateTermNames) {
    return undefined;
  }
  return alternateTermNames[facetName]?.[termName];
}
