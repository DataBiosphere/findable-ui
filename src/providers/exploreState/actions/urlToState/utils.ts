import { SelectedFilter } from "../../../../common/entities";
import { parseFilterParam } from "../../../../common/filters/typeGuards";

/**
 * Returns the selected filters from the filter parameter value.
 * @param paramValue - The filter parameter value.
 * @returns The selected filters or an empty array.
 * @see parseFilterParam for validation details and ErrorBoundary constraints.
 */
export function decodeFilterParamValue(
  paramValue: string | string[] | undefined,
): SelectedFilter[] {
  if (typeof paramValue === "string") {
    try {
      return parseFilterParam(decodeURIComponent(paramValue));
    } catch {
      return [];
    }
  }
  return [];
}
