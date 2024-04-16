import { ParamValue } from "./filterTransformer";

/**
 * Return the value to be used when building up query string filter value.
 * @param value - Filter value.
 * @returns filter parameter value.
 */
export function getFilterParameterValue(value: string): ParamValue {
  if (value === "Unspecified") {
    return null;
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return value;
}
