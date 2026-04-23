import { SelectedFilter } from "../../../../common/entities";
import { isSelectedFilter } from "../../../../common/filters/typeGuards";

/**
 * Returns the selected filters from the filter parameter value.
 * @param paramValue - The filter parameter value.
 * @returns The selected filters or an empty array.
 */
export function decodeFilterParamValue(
  paramValue: string | string[] | undefined,
): SelectedFilter[] {
  if (typeof paramValue === "string") {
    try {
      const parsed: unknown = JSON.parse(decodeURIComponent(paramValue));
      if (!Array.isArray(parsed) || !parsed.every(isSelectedFilter)) {
        return [];
      }
      return parsed;
    } catch {
      return [];
    }
  }

  // Default to an empty array.
  return [];
}
