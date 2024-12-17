import { ParamValue } from "./filterTransformer";

/**
 * Return the value to be used when building up query string filter value.
 * @param value - Filter value.
 * @returns filter parameter value.
 */
export function getFilterParameterValue(value: unknown): ParamValue {
  if (value === "Unspecified") {
    return null;
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (typeof value === "string" || typeof value === "boolean") return value;
  return value ? String(value) : null;
}
