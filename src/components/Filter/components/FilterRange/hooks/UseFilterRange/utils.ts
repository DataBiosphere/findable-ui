import { FieldValues, RANGE_OPERATOR } from "./types";

/**
 * Formats the value from a form.
 * @param value - The value to format.
 * @returns The formatted value, or undefined if the value is not a number.
 */
export function formatFormDataValue(
  value: FormDataEntryValue
): number | string | undefined {
  if (!value || typeof value !== "string") return undefined; // The form only supports string values.
  const numericValue = Number(value);
  if (isNaN(numericValue)) return value;
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
  formData.forEach((value: FormDataEntryValue, key: string) => {
    Object.assign(fieldValues, { [key]: formatFormDataValue(value) });
  });
  fieldValues.rangeOperator = rangeOperator;
  return fieldValues;
}
