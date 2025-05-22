import { SelectedFilter } from "../../../../common/entities";
import { SyncStateFromUrlPayload } from "../../../exploreState/actions/syncStateFromUrl/types";
import { EXPLORE_URL_PARAMS } from "../../../exploreState/constants";

/**
 * Returns the filters from the resolved URL.
 * @param paramValue - The filter parameter value.
 * @returns The filters or an empty array.
 */
export function decodeFiltersParamValue(
  paramValue: string | undefined
): SelectedFilter[] {
  return JSON.parse(decodeURIComponent(paramValue || "[]"));
}

/**
 * Returns the dynamic segment from the resolved URL.
 * @param pattern - The pattern URL.
 * @param resolved - The resolved URL.
 * @param dynamicSegment - The dynamic segment to extract.
 * @returns The dynamic segment or an empty string.
 */
function getDynamicSegment(
  pattern: string,
  resolved: string,
  dynamicSegment = "[entityListType]"
): string {
  // Remove query strings.
  const patternPath = pattern.split("?")[0];
  const resolvedPath = resolved.split("?")[0];

  // Check if the pattern ends with the dynamic segment e.g. /data/[entityListType].
  // We are not interested in a pattern the suggests we are on an entity page e.g. /data/[entityListType]/[entityId].
  if (!patternPath.endsWith(`/${dynamicSegment}`)) return "";

  // Split into segments.
  const patternSegments = patternPath.split("/");
  const resolvedSegments = resolvedPath.split("/");

  // Find the dynamic segment.
  const idx = patternSegments.findIndex((seg) => seg === dynamicSegment);

  if (idx === -1) return "";

  return resolvedSegments[idx] || "";
}

/**
 * Returns a parameter from the resolved URL.
 * @param resolved - The resolved URL.
 * @param param - The parameter to extract.
 * @returns The parameter value or undefined.
 */
export function getParamValue(
  resolved: string,
  param: string
): string | undefined {
  // Grab the params from the resolved URL.
  const params = new URLSearchParams(resolved.split("?")[1]);
  const paramValue = params.get(param);

  // Return the parameter value or undefined.
  if (!paramValue) return;

  return paramValue;
}

/**
 * Returns the entity list type, filters, and feature flag state from the URL.
 * A dynamic segment that is not exactly `[entityListType]` is not supported will return entityListType as an empty string.
 * @param url - The URL to extract from.
 * @param as - The resolved URL.
 * @returns An object containing the entity list type, filters, and feature flag state.
 */
export function getSyncStateFromUrl(
  url: string,
  as: string
): SyncStateFromUrlPayload {
  // Get the entity list type from the url.
  const entityListType = getDynamicSegment(url, as);

  // Get the param values for each param.
  const [catalogState, featureFlagState, filter] = [
    EXPLORE_URL_PARAMS.CATALOG,
    EXPLORE_URL_PARAMS.FEATURE_FLAG,
    EXPLORE_URL_PARAMS.FILTER,
  ].map((param) => getParamValue(as, param));

  // Decode the filter param value to selected filters.
  const filterState = decodeFiltersParamValue(filter);

  return { catalogState, entityListType, featureFlagState, filterState };
}
