import { FieldValues, RANGE_OPERATOR } from "./types";

/**
 * Formats the range form min and max values.
 * @param value - The value to format.
 * @returns Formatted min or max value, or null if the value is not a number.
 */
export function formatMinMaxValue(
  value: FormDataEntryValue | null
): number | null {
  const numericValue = Number(value);
  if (value === null || isNaN(numericValue)) return null;
  return numericValue;
}

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
  fieldValues.max = formatMinMaxValue(formData.get("max")) || null;
  fieldValues.min = formatMinMaxValue(formData.get("min")) || null;
  fieldValues.rangeOperator = rangeOperator;
  return fieldValues;
}
