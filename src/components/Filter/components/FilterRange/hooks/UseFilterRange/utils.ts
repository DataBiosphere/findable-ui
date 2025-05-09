import { FieldValues, RANGE_OPERATOR } from "./types";

/**
 * Retrieves the min and max field values from a form.
 * @param e - The form element to retrieve values from.
 * @param rangeOperator - The range operator value in use.
 * @returns The values from the form.
 */
export function getFormValues(
  e: HTMLFormElement,
  rangeOperator: RANGE_OPERATOR
): FieldValues {
  const formData = new FormData(e);
  const fieldValues = {} as FieldValues;
  fieldValues.max = parseMinMaxValue(formData.get("max"));
  fieldValues.min = parseMinMaxValue(formData.get("min"));
  fieldValues.rangeOperator = rangeOperator;
  return fieldValues;
}

/**
 * Parses a form data value null or empty string to null.
 * Schema validation will handle the rest.
 * @param value - The value to parse.
 * @returns The parsed value, or null if the value is null or empty string.
 */
export function parseMinMaxValue(
  value: FormDataEntryValue | null
): FormDataEntryValue | null {
  if (value === null || value === "") return null;
  return value;
}
