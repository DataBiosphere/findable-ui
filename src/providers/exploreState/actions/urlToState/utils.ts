import { SelectedFilter } from "../../../../common/entities";

/**
 * Returns the selected filters from the filter parameter value.
 * @param paramValue - The filter parameter value.
 * @returns The selected filters or an empty array.
 */
export function decodeFilterParamValue(
  paramValue: string | string[] | undefined
): SelectedFilter[] {
  if (typeof paramValue === "string") {
    // Return decoded filter param value if it is a string.
    return JSON.parse(decodeURIComponent(paramValue));
  }

  // Default to an empty array.
  return [];
}
