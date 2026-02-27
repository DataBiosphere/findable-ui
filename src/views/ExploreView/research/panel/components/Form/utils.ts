import { FormEvent } from "react";
import { FIELD_NAME } from "./constants";
import { OnSubmitPayload } from "../../../query/types";

/**
 * Extracts and trims form values from a form element.
 * @param form - Form element.
 * @returns An object mapping form field names to their trimmed string values.
 */
export const getFormValues = (
  form: HTMLFormElement,
): Record<string, string> => {
  const formData = new FormData(form);

  const values: Record<string, string> = {};
  formData.forEach((value, key) => {
    values[key] = value.toString().trim();
  });

  return values;
};

/**
 * Returns the payload for the query form submission.
 * If the submitter has a data-query attribute (e.g. a suggestion chip), uses that as the query.
 * Otherwise, falls back to the form input value.
 * @param e - Form event.
 * @returns The payload object containing the query value.
 */
export const getPayload = (e: FormEvent<HTMLFormElement>): OnSubmitPayload => {
  // Check for a query from the submitter's data-query attribute first
  const query = getSubmitterQuery(e);

  // The onSubmit handler will ignore empty queries which acts as a safeguard against empty data-query values.
  if (query !== undefined) return { query };

  // If no submitter query, fall back to form values
  const formValues = getFormValues(e.currentTarget);
  return { query: formValues[FIELD_NAME.AI_PROMPT] || "" };
};

/**
 * Returns the query from the form submitter's data-query attribute, if present.
 * @param e - Form event.
 * @returns The query string, or undefined if the submitter has no data-query.
 */
function getSubmitterQuery(e: FormEvent<HTMLFormElement>): string | undefined {
  const submitter = (e.nativeEvent as SubmitEvent).submitter;
  // We should expect a defined value here if the submitter is a data-query element, but we trim it just in case.
  return submitter?.dataset.query?.trim();
}
